require 'net/http'

module LriHelper
  @@failures = []

  def self.publish tags

    @@failures = []

    # The following is a list of deleted keys we are removing for the time being
    deleted_keys = [
        'mediaType', # The property "mediaType" is reference by the LRMI spec as existing in schema.org, but schema.org has no such property.
        'groupType', # The property "groupType" does not appear to exist in the LRMI or schema.org specs.
        'timeRequired', # Find the time required LRMI or Schema.org spec

#        'about',
#        'author',
#        'createdOn',
#        'topic',
        'usageRightsURL',
        'publisher',
        'endUser',
        'ageRange',
        'educationalUse',
        'interactivityType',
        'learningResourceType',
        'createdBy',
        'educationalAlignments',
        'isBasedOnURL'

    ]


    # Alignments array for storing the alignments that are removed from the tag
    alignments_array = []
    # This is a storage for all the tag to request conversions
    lri_request_hashes = []

    # For each tag sent, do the following
    tags.each do |tag|
      # Adjust or insert stuff prior to remapping
      tag['uuid'] = "urn:slc:tag:" + tag['uuid']
      tag['types'] = "urn:schema-org:entity_type:creative_work"

      # Store the alignments in the alignments array to be added later.
#      alignments_array << tag['educationalAlignments']
      # Change alignments hash to array of id's in the LRI to make association
#      tag['educationalAlignments'] = tag['educationalAlignments'].map{|k,v| "urn:lrmi:alignment_object:" + k }

      # TODO If the key is in the deleted keys list above, delete it..
      # NOTE: this is temporary until I figure out how to get all those keys working.
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
          self.update request, search['response'].first
        else
          self.create request
        end
      end


    end


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
        'mediaType'             => 'urn:schema-org:property_type:media_type', # Not in Schema.org?
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
    properties_to_create = request
    properties_to_create.delete_if{|k,v| entity['props'][k].present? || v.empty? }
    properties_to_create.each do |key,value|
      self.create_property guid, {key=>value}
    end

    # Now we need to figure out which request properties to upate
    # to do that just push all items into an array that are in both the
    # request and the found entity.. only do so though if the values are different
    properties_to_update = []
    entity['props'].each do |key,value|
      properties_to_update << prop if request[key].present? if request[key] != value
    end
    properties_to_update.each do |key,value|
      self.update_property guid, {key=>value}
    end

  end

  # Okay so now we need to create a new property and stuff it into the lri
  # while associating it to the guid provided
  def self.create_property guid, property
    request = {"from"=>guid}.merge property
    self.request :createProperty, request
  end

  # Now we need to update the property as it is already in the system..
  def self.update_property guid, property
    #request = {"from"=>guid}.merge property
puts "UPDATE THE PROPERTY HERE"
  end

  # A helper method for defining our various request types -- trying to keep it dry
  def self.request type, request
    # Current list of request types
    requestTypes = {
        :createProperty => '/property/create?q=',
        :updateProperty => '/property/update?q=',
        :createEntity   => '/entity/create?q=',
        :search         => '/entity/search?ops={"details":true}&q='
    }
    # If not one of our request types, dump out
    return false unless requestTypes[type].present?
    # build and make the raw request
    rawResponse = Net::HTTP.get(
        URI.parse(
            URI::encode('http://lriserver.com:8200' + requestTypes[type] + request.to_json )
        )
    )
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