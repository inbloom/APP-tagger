require 'net/http'

module LriHelper

  def self.publish tags

    tags = map_tags_to_requests tags

  end

  private

  def self.map_tags_to_requests tags
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
      alignments_array << tag['educationalAlignments']
      # Change alignments hash to array of id's in the LRI to make association
      tag['educationalAlignments'] = tag['educationalAlignments'].map{|k,v| "urn:lrmi:alignment_object:" + k }

      # TODO TEMPORARY -- The property "mediaType" is reference by the LRMI spec as existing in schema.org, but schema.org has no such property.
      tag.delete('mediaType')

      # TODO Change Author into an LRI object?
      # TODO Change Publisher into LRI object?

      # Remap the keys using the key mappings above
      lri_request_hashes << Hash[tag.map{|k,v| [self.remap_key(k),v] }]
    end

    # For each of the request objects, do stuff
    lri_request_hashes.each do |request|
      # Now request from the LRI to see if this object has been inserted before
      rawResponse = Net::HTTP.get(
          URI.parse(
              URI::encode('http://lriserver.com:8200/entity/search?q={"'+remap_key('uuid')+'":"'+request[remap_key('uuid')]+'"}')
          )
      )
      jsonResponse = ActiveSupport::JSON.decode(rawResponse)

      # TODO Capture the error when we tried to search for something and it failed.

      # Okay now that we have a response, is it there?
      if jsonResponse["response"].present?
        # Update
        puts "HERE"
      else
        # Create
        puts "NOT HERE"
      end
#      puts req

    end


    # Now check to see if this tag is in the lri already
    # If the tag is in the lri, then update it
    # if the tag isn't in the lri then add it

  end

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
        'timeRequired'          => 'urn:schema-org:property_type:timeRequired',
        'createdBy'             => 'urn:schema-org:property_type:author',
        'educationalAlignments' => 'urn:schema-org:property_type:educational_alignment',
#        'mediaType'             => 'urn:schema-org:property_type:media_type', # Not in Schema.org?
    }

    return lri_key_mappings[key] if lri_key_mappings[key].present?

    key
  end


end