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

LRMI::Application.routes.draw do

  # use a real resource
  resources :tagger, :only => [ :index, :save_draft, :save_export, :save_remote ] do
    collection do
      post :load_history,   :path => "/load_history",   :constraints => { :format => /json/ }
      post :load_drafts,    :path => "/load_drafts",    :constraints => { :format => /json/ }
      post :save_draft,     :path => "/save_draft",     :constraints => { :format => /json/ }
      post :save_export,    :path => "/save_export",    :constraints => { :format => /json/ }
      post :save_remote,    :path => "/save_remote",    :constraints => { :format => /json/ }
      post :reset_resource, :path => "/reset_resource", :constraints => { :format => /json/ }
      get :test_image_upload, :path => "/test_upload"
      post :add_image,      :path => "/add_image"
    end
  end
  
  match "/auth/:provider/callback" => "sessions#create"
  match "/signout" => "sessions#destroy", :as => :signout

  # Until we get the products united, just forward to tagger code
  root :to => 'tagger#index'

end
