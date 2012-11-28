class User < ActiveRecord::Base
  attr_accessible :email, :name, :provider, :uid
  
  def self.create_with_omniauth(request, auth)
    
    path = 'https://api.sandbox.slcedu.org/api/rest/system/session/check'
    headers = { "Accept" => 'application/vnd.slc+json',
                  "Content-Type" => 'application/vnd.slc+json',
                  "Authorization" => "bearer #{auth[:credentials][:token]}" }

    slc_request = HTTParty.send(request.method.underscore.to_sym, path, :headers => headers)
    slc_response = JSON.parse(slc_request)

    create! do |user|
      user.provider = auth["provider"]
      user.full_name = slc_response["full_name"]
      user.realm = slc_response["realm"]
      user.tenant_id = slc_response["tenantId"]
      user.user_id = slc_response["user_id"]
      user.external_id = slc_response["external_id"]
      user.email = slc_response["email"]
    end

  end
  
end