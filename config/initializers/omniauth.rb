Rails.application.config.middleware.use OmniAuth::Builder do

  provider :slc, SLC_CONFIG[:client_id], SLC_CONFIG[:shared_secret], :setup => lambda{|env|
     env['omniauth.strategy'].options[:client_options].site = 'https://api.sandbox.slcedu.org'
  }

end