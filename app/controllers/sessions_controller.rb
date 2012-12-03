class SessionsController < ApplicationController

  def create
    auth = request.env["omniauth.auth"]
    puts auth.to_yaml
    session[:token] = auth[:credentials][:token]
    # user = User.find_by_provider_and_user_id(auth["provider"], auth["uid"]) || User.create_with_omniauth(request, auth)
    user = User.get_authed_user(request, auth)
    session[:user_id] = user.id
    redirect_to root_url, :notice => "Signed in!"
  end

  def destroy
    session[:user_id] = nil
    session[:token] = nil
    redirect_to root_url, :notice => "Signed out!"
  end

end