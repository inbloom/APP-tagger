class TaggerController < ApplicationController
  def index
  end
  
  # Saves a string to a file named filename on a user's machine
  def save_local
    send_data("#{params[:data]}", :filename => "#{params[:filename]}", :type => "text/plain")
  end
  
  # Saves a json formatted string to the db, then formats and sends to LRI
  def save_lri
    
    # TODO - Refactor this when we have sso
    session[:guid] ||= SecureRandom.uuid
    
    # Save tag to db
    Tag.new(:session_id => session[:guid], :data => params[:data]).save
    
    # TODO - send data to LRI
    
  end
  
end