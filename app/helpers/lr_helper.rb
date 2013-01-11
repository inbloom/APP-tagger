require 'net/http'

module LrHelper
  @@user = nil
  @@failures = []

  def self.publish tags, user

    # Convert tags to request format
    request = {
        "documents" => [
        ]
    }

    tags.each { |tag|

      request["documents"] << {
          "doc_type" => 'resource_data',        # Req. Literal "resource_data"
          "doc_version" => '0.23.0',            # Req. Literal current lr spec version
          "doc_ID" => '',                       # Req. Unique ID within scope of the LR
          "resource_data_type" => 'resource',   # Req. "paradata", "resource", "assertion" etc..
          "active" => true,                     # Req. boolean
          "identity" => {
              "submitter_type" => 'anonymous',  # Req. Fixed Vocabulary "anonymous", "user", "agent"
              "submitter" => 'foo',             # Req. Identity of the submitter (identified how?)
              "curator" => '',                  # Id of curator
              "owner" => '',                    # Id of owner
              "signer" => ''                    # Id of signer
          },
          "submitter_timestamp" => '',          # Submitter created timestamp
          "submitter_TTL" => '',                # Submitter statement of TTL of validity of submission
          "publishing_node" => '',              # Req. Node_ID of node where injected into network
          "node_timestamp" => '',               # Req. Timestamp when received by node
          "create_timestamp" => '',             # Req. Timestamp when first published to network

      }

    }

    self.request :publish, request

  end



  private

  def self.request type, request
    # requestTypes
    requestTypes = {
        :publish => 'publish?'
    }

puts request.inspect

#puts 'http://sandbox.learningregistry.org/' + requestTypes[type] + request

    ## Catch the type
    #return false unless requestTypes[type].present?
    ## build and make the raw request
    #rawResponse = Net::HTTP.get(
    #    URI.parse(
    #        URI::encode('http://sandbox.learningregistry.org/' + requestTypes[type] + request)
    #    )
    #)

  end

end
