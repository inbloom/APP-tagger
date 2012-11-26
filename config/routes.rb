LRMI::Application.routes.draw do

  # use a real resource
  resources :tagger, :only => [ :index, :save_draft, :save_export, :save_remote ] do
    collection do
      post :save_draft, :path => "/save_draft"
      post :save_export, :path => "/save_export"
      post :save_remote, :path => "/save_remote"
    end
  end

  # Until we get the products united, just forward to tagger code
  root :to => 'tagger#index'

end
