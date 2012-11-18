class TaggerController < ApplicationController
  def index
  end
  
  # Saves a string to a file named filename on a users machine
  def save_local
    send_data("#{params[:contents]}", :filename => "#{params[:filename]}", :type => "text/plain")
  end
  
end