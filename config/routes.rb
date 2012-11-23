LRMI::Application.routes.draw do

  # use a real resource
  resources :tagger, :only => [ :index ]

  # Until we get the products united, just forward to tagger code
  root :to => 'tagger#index'

end
