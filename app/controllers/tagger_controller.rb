class TaggerController < ApplicationController

  def index
    # TODO - Refactor this when we have sso
    session[:guid] ||= SecureRandom.uuid
  end

  # Load the items list into the UI
  def load_drafts
    # TODO - Refactor this when we have sso
    session[:guid] ||= SecureRandom.uuid
    # The object we return to the UI, if any
    response = {}
    # Get our tags
    tags = Tag.where :session_id => session[:guid]
    tags.each_with_index do |tag,index|
      item = ActiveSupport::JSON.decode(tag[:data])
      response[index] = item
    end

    respond_to do |format|
      format.json { render json: response }
    end
  end

  # Saves a string to a file named filename on a user's machine
  def save_export
    send_data("#{params[:data]}", :filename => "#{params[:filename]}", :type => "text/plain")
  end
  
  # Saves a json formatted string to the db, then formats and sends to LRI
  def save_draft
    
    # TODO - Refactor this when we have sso
    session[:guid] ||= SecureRandom.uuid
    # The object we return to the UI, if any
    response = {}
    # Parse through incoming items array and create a tag for each
    items = ActiveSupport::JSON.decode(params[:content])
    items.each do |keyValue|
      # This is the tag, 0 is the id in the UI which is meaningless
      tag = keyValue[1]
      # Remove the ID as it doesn't mean anything and is only used by the UI for internal stuff (if at all)
      tag.delete('id')
      # if we have a UUID then we must save to that!
      if tag['uuid'].present?
        # This tag has a UUID so we need to load it first
        found_tag = Tag.find_by_uuid tag['uuid']
        if found_tag.present?
          found_tag.session_id = session[:guid]
          found_tag.data = tag.to_json
          found_tag.save()
        end
      else
        # Generate a UUID for this item that will be used when sent to the LRI or any server out in the world.
        # This is unique to this tag and its history and could come from the client
        tag['uuid'] ||= SecureRandom.uuid
        # Create each tag in the database
        Tag.create(
            :session_id => session[:guid],
            :uuid => tag['uuid'],
            :data => tag.to_json,
            :published => false
        )
      end
      # Rebuild items object for the UI
      response[keyValue[0]]= tag
    end if items.present?

    respond_to do |format|
      format.json { render json: response }
    end

  end
  
end