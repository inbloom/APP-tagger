Rails.application.config.middleware.use OmniAuth::Builder do
  
  provider :slc, 'gyipqMp4UW', 'NeF8WljTBIf9fBJ32njqt9c0Vr7fT2Z8Z1zl3X7ls4so3ocW', :setup => lambda{|env| 
     env['omniauth.strategy'].options[:client_options].site = 'https://api.sandbox.slcedu.org'
  }

end