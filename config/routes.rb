LRMI::Application.routes.draw do

  # use a real resource
  resources :tagger, :only => [ :index, :save_local ]
  post :save_local, :controller => :tagger, :path => "/tagger/save_local"
  

  # Until we get the products united, just forward to tagger code
  root :to => 'tagger#index'

end
