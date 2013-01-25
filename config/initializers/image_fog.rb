CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',                                  # required
    :aws_access_key_id      => ENV['aws_access_key_id'],      # required
    :aws_secret_access_key  => ENV['aws_secret_access_key'],  # required
    :region                 => ENV['aws_region']                  # optional, defaults to 'us-east-1'
  }
  config.fog_directory  = ENV['aws_bucket']                    # required
  config.fog_public     = true                                      # optional, defaults to true
  # config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}  # optional, defaults to {}
  # config.asset_host     = 'https://assets.example.com'            # optional, defaults to nil
end