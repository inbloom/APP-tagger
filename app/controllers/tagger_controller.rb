class TaggerController < ApplicationController

  def index
  end

  # Load the items list into the UI
  def load_drafts
    # The object we return to the UI, if any
    response = {}
    # Get our tags
    tags = Tag.where :user_id => session[:user_id], :published => false
    tags.each_with_index do |tag,index|
      key = "itemTag"+index.to_s
      response[key] = ActiveSupport::JSON.decode(tag[:data])
    end

    respond_to do |format|
      format.json { render json: response }
    end
  end

  # Load the historical items into the UI
  def load_history
    # The object we return to the UI, if any
    response = {}
    # Get historical tags
    tags = Tag.where :user_id => session[:user_id], :published => true
    tags.each_with_index do |tag,index|
      key = "historicalTag"+index.to_s
      response[key] = ActiveSupport::JSON.decode(tag[:data])
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
    # Parse through incoming tags array and create a tag for each
    tags = ActiveSupport::JSON.decode(params[:content])
    # Save those tags baby
    response = save_tags_state tags
    # Remove any tags that were deleted from the UI
    remove_deleted_tags tags if tags.present?

    respond_to do |format|
      format.json { render json: response }
    end
  end

  # Save the data to a remote thingy out in the world. Yes I said thingy!
  def save_remote
    # Parse through incoming tags array and create a tag for each
    json_tags = ActiveSupport::JSON.decode(params[:content])
    # Working array of tags
    tags = []
    # Break out the tags from the sent parsed json hash
    json_tags.each {|h| tags << h[1] }

    # Choose which adaptor to use and publish those suckers
    case params[:remote]
      when 'LRI' then
        errors = LriHelper::publish tags, current_user
    end

    # TODO Eventually I need to only error those tags that didn't save, and set published the ones that did actually publish
    # If we have no errors, then go ahead and mark tags as published..etc..
    if errors.empty?
      # Save those tags baby
      save_tags_state json_tags, true

      # The object we return to the UI, if any
      response = {}
      # Get all the draft tags and send those to the ui
      tags = Tag.where :user_id => current_user.id, :published => false
      tags.each_with_index do |tag,index|
        key = "itemTag"+index.to_s
        response[key] = ActiveSupport::JSON.decode(tag[:data])
      end
    end

    respond_to do |format|
      if errors.empty?
        format.json { render json: response }
      else
        format.json { render status: 500, json: errors }
      end
    end
  end

  private

  # Its possible to need to save the tags from multiple places so lets extract this
  # out into a function of it's own for others to use.. share and share-a-like!
  def save_tags_state tags, publish = false
    # The object we return to the UI, if any
    response = {}
    tags.each do |keyValue|
      # This is the tag, 0 is the id in the UI which is meaningless
      tag = keyValue[1]
      # Remove the ID as it doesn't mean anything and is only used by the UI for internal stuff (if at all)
      tag.delete('id')
      # if we have a UUID then we must save to that!
      if tag['uuid'].present?
        # This tag has a UUID so we need to load it first
        found_tag = Tag.find_by_uuid tag['uuid']
        if found_tag.present?
          found_tag.user_id = session[:user_id]
          found_tag.data = tag.to_json
          found_tag.published = publish
          found_tag.save()
        end
      else
        # Generate a UUID for this item that will be used when sent to the LRI or any server out in the world.
        # This is unique to this tag and its history and could come from the client
        tag['uuid'] ||= SecureRandom.uuid
        # Create each tag in the database
        Tag.create(
            :user_id => current_user.id,
            :uuid => tag['uuid'],
            :data => tag.to_json,
            :published => publish
        )
      end
      # Rebuild tags object for the UI
      response[keyValue[0]]= tag
    end if tags.present?

    response
  end

  # Go through the list of tags the UI expects to be loaded on refresh and leave those.. remove the others.
  # without this if you delete a tag from the ui, save and reload the page it doesn't know to remove the deleted tag
  # as the save state function only saves to the tags already there or adds new ones.. doesn't know to remove.
  def remove_deleted_tags tags
    excluding = tags.map{|t| t[1]['uuid'] }
    user_tags = Tag.where(:user_id => session[:user_id], :published => false).find(:all, :conditions => ['uuid not in (?)', excluding])
    # ^^ That shit right there is why I love ruby..
    user_tags.each do |tag|
      tag.destroy
    end
  end
  

end