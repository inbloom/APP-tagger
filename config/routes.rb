LRMI::Application.routes.draw do
  get "tagger/index"
  post "tagger/save_local"
  
  match '/tagger' => 'tagger#index'

end
