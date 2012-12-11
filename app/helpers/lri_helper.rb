require 'net/http'

module LriHelper
  @@user = nil
  @@failures = []

  def self.publish tags, user
    @@user = user
    @@failures = []

    # The following is a list of deleted keys we are removing for the time being
    deleted_keys = [
        'id',        # Don't delete this!
        'educationalAlignments'
    ]

    # Don't Escape the values of these keys
    dont_escape_keys = [
        'educationalAlignments'
    ]

    # Alignments array for storing the alignments that are removed from the tag
    alignments_array = []
    # This is a storage for all the tag to request conversions
    lri_request_hashes = []

    # For each tag sent, do the following
    tags.each do |tag|

      # Which incoming keys do we need to url encode the values of?
      tag.each do |k,v|
        tag[k] = (dont_escape_keys.include?(k)) ? v : Rack::Utils.escape(v)
      end

      # Adjust or insert stuff prior to remapping
      tag['uuid'] = "urn:slc:tag:" + tag['uuid']
      tag['types'] = "urn:schema-org:entity_type:creative_work"

      # TODO Need the CCSS stuff injected before I can use this..
      # Store the alignments in the alignments array to be added later.
#      alignments_array << tag['educationalAlignments']
      # Change alignments hash to array of id's in the LRI to make association
#      tag['educationalAlignments'] = tag['educationalAlignments'].map{|k,v| "urn:lrmi:alignment_object:" + v['dotNotation'] }

      # TODO If the key is in the deleted keys list above, delete it..
      # TODO NOTE: this is temporary until I figure out how to get all those keys working. (ADDENDUM Kurt has to add them)
      tag.delete_if{|k,v| deleted_keys.include?(k) }

      # Remap the keys using the key mappings above
      lri_request_hashes << Hash[tag.map{|k,v| [self.remap_key(k),v] }]
    end

    # At this point the tags array of tag hashes should now be scrubbed and converted to the lri_request array of hashes.

    # For each of the request objects, do stuff
    lri_request_hashes.each do |request|
      # Now request from the LRI to see if this object has been inserted before
      # and then create or update it based on that.

      search = self.find(request[remap_key('uuid')])
      if search
        if search['response'].present?
puts '.'
          self.update request, search['response'].first
        else
puts '+'
          self.create request
        end
      end

    end

    # Now return any failures if there are any
    @@failures
  end

  private

  # Take any incoming key and map it to the correct LRI output key (Just keys.. not values)
  def self.remap_key key
    # A list of key mappings to replace
    lri_key_mappings = {
        'uuid'                  => 'urn:lri:property_type:id',
        'types'                 => 'urn:lri:property_type:types',
        'title'                 => 'urn:lri:property_type:name',
        'url'                   => 'urn:lri:property_type:url',
        'language'              => 'urn:schema-org:property_type:in_language',
        'createdOn'             => 'urn:schema-org:property_type:date_created',
        'topic'                 => 'urn:schema-org:property_type:about',
        'usageRightsURL'        => 'urn:schema-org:property_type:use_rights_url',
        'publisher'             => 'urn:schema-org:property_type:publisher',
        'isBasedOnURL'          => 'urn:schema-org:property_type:is_based_on_url',
        'endUser'               => 'urn:schema-org:property_type:intended_end_user_role',
        'ageRange'              => 'urn:schema-org:property_type:typical_age_range',
        'educationalUse'        => 'urn:schema-org:property_type:educational_use',
        'interactivityType'     => 'urn:schema-org:property_type:interactivity_type',
        'learningResourceType'  => 'urn:schema-org:property_type:learning_resource_type',
        'timeRequired'          => 'urn:schema-org:property_type:time_required',
        'createdBy'             => 'urn:schema-org:property_type:author',
        'educationalAlignments' => 'urn:schema-org:property_type:educational_alignment',
        'mediaType'             => 'urn:schema-org:property_type:physical_media_type',
        'groupType'             => 'urn:schema-org:property_type:group_type'
    }
    return lri_key_mappings[key] if lri_key_mappings[key].present?
    key
  end

  # Search the LRI and pull back the data for this object
  def self.find uuid
    request = { remap_key('uuid') => uuid }
    self.request :search, request
  end

  # Create the entity in the LRI
  # This will create the initial entity with all the currently added parameters
  def self.create entity
    # Remove all that have empty values
    entity.delete_if {|k,v| v.empty? }
    self.request :createEntity, entity
  end

  # Update the entity in the LRI
  def self.update request, entity
    # The internal temp guid used by lri to do assignments
    guid = entity['guid']

    # Now we need to figure out which request properties to create
    # to do that just reap all entity properties from the request clone
    # and any that are empty (see above, we dont check in empty strings)
    # thus leaving us with those that the lri doesn't know about yet.
    properties_to_create = request.clone
    properties_to_create.delete_if{|k,v| entity['props'][k].present? || v.empty? }
    properties_to_create.each do |key,value|
      self.create_property guid, {key=>value}
    end

    # Now we need to figure out which request properties to update
    # to do that just push all items into an array that are in both the
    # request and the found entity.. only do so though if the values are different
    # Note that in details mode the output for the item is verbose and uses the value as the KEY!
    # The way we have to get information out of it is kinda confusing and seems wrong.. but there ya go
    properties_to_update = []
    entity['props'].each do |key,values|
      if request[key].present?
        # Test the unescaped values to see if they have changed, if they have..
        # then push them into the properties to update array for updating.
        if Rack::Utils.unescape(request[key].to_s) != Rack::Utils.unescape(values.keys[0].to_s)
          properties_to_update << {:value=>request[key],:guid=>values.first[1][0]['guid']}
        end
      end
    end
    # Now iterate through all those properties and send them to the update method.
    # Note we are rebuilding the exact same hash in the update_property call, but that's cause I expect how
    # we build this properties_to_update variable will change drastically and I dont want to change the method
    properties_to_update.each do |hash|
      self.update_property hash[:guid], hash[:value]
    end

    # Now lets go through the request and delete from the known entity any properties that have been set
    # to nothing.  While there is a distict difference between "" and nil in this case the form just knows
    # that "" is nil.  So we must remove those, as opposed to setting them as "" in the lri
    properties_to_delete = []
    request.each do |key,value|
      properties_to_delete << entity['props'][key] if entity['props'][key].present? && value.empty?
    end
    properties_to_delete.each do |hash|
      self.delete_property hash.first[1][0]['guid']
    end

  end

  # Okay so now we need to create a new property and stuff it into the lri
  # while associating it to the guid provided
  def self.create_property entity_guid, property
    request = {:from=>entity_guid}.merge property
    self.request :createProperty, request
  end

  # Now we need to update the property as it is already in the system..
  def self.update_property entity_guid, property_value
    request = {:guid=>entity_guid,:value=>property_value}
    self.request :updateProperty, request
  end

  # Delete any properties sent
  def self.delete_property entity_guid
    request = {:guid=>entity_guid}
    self.request :deleteProperty, request
  end

  # A helper method for defining our various request types -- trying to keep it dry
  def self.request type, request
    # Current list of request types
    requestTypes = {
        # TODO get away from "letmein" and move towards using the users hash with the slc.. should work now not sure why it doesn't (LRI issue)
        :createProperty   => '/property/create?opts={"access_token":"letmein"}&q=',
        :updateProperty   => '/property/update?opts={"access_token":"letmein"}&q=',
        :deleteProperty   => '/property/update?opts={"access_token":"letmein","active":false}&q=',
        :createEntity     => '/entity/create?opts={"access_token":"letmein"}&q=',
        :getEnumerations  => '/entity/search?opts={"use_cached":false}&q=',
        :search           => '/entity/search?opts={"details":true,"use_cached":false}&q=',
    }
    # If not one of our request types, dump out
    return false unless requestTypes[type].present?
    # build and make the raw request
    rawResponse = Net::HTTP.get(
        URI.parse(
            URI::encode('http://lriserver.com:8200' + requestTypes[type] + request.to_json )
        )
    )

#if type == :getEnumerations
#puts :REQUEST.to_s + "::" + type.to_s
#puts 'http://lriserver.com:8200' + requestTypes[type] + request.to_json
#puts :RESPONSE
#puts rawResponse
#end

    # Parse out the response
    results = ActiveSupport::JSON.decode(rawResponse)
    # Check for and store failures
    self.any_failures? results, type, request
  end

  # TODO Okay really I'm not sure the right way to catch errors here
  # This method checks to see if anything from the response is considered a failure and adds it to the fail array
  def self.any_failures? response, type, request
    @@failures << {:type => type, :request => request, :response => response['message']} if response['status'] == 'error'
    return false if response['status'] == 'error'
    response
  end

end