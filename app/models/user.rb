###############################################################################
# Copyright 2012-2013 inBloom, Inc. and its affiliates.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
###############################################################################

class User < ActiveRecord::Base
  attr_accessible :email, :name, :provider, :uid
  
  has_many :tags
  
  def self.create_with_omniauth(request, auth)
    session_info = self.check_session(request, auth)
    create! do |user|
      user.provider = auth["provider"]
      user.full_name = session_info["full_name"]
      user.realm = session_info["realm"]
      user.tenant_id = session_info["tenantId"]
      user.user_id = session_info["user_id"]
      user.external_id = session_info["external_id"]
      user.email = session_info["email"]
    end

  end
  
  def self.get_authed_user(request, auth)
    session_info = self.check_session(request, auth)
    User.find_by_provider_and_user_id(auth["provider"], session_info["user_id"]) || User.create_with_omniauth(request, auth)
  end
  
  private 
  
  def self.check_session(request, auth)
    path = 'https://api.sandbox.inbloom.org/api/rest/system/session/check'
    headers = { "Accept" => 'application/vnd.slc+json',
                  "Content-Type" => 'application/vnd.slc+json',
                  "Authorization" => "bearer #{auth[:credentials][:token]}" }

    slc_response = HTTParty.send(request.method.underscore.to_sym, path, :headers => headers)
    return JSON.parse(slc_response)
  end
  
end