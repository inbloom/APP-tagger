LRMI::Application.routes.draw do

  # use a real resource
  resources :tagger, :only => [ :index, :save_draft, :save_export, :save_remote ] do
    collection do
      post :load_history, :path => "/load_history", :constraints => { :format => /json/ }
      post :load_drafts, :path => "/load_drafts", :constraints => { :format => /json/ }
      post :save_draft, :path => "/save_draft", :constraints => { :format => /json/ }
      post :save_export, :path => "/save_export", :constraints => { :format => /json/ }
      post :save_remote, :path => "/save_remote", :constraints => { :format => /json/ }
    end
  end
  
  match "/auth/:provider/callback" => "sessions#create"
  match "/signout" => "sessions#destroy", :as => :signout

  # Until we get the products united, just forward to tagger code
  root :to => 'tagger#index'

end
