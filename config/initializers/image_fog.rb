CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',                                  # required
    :aws_access_key_id      => AMAZON_CONFIG[:aws_access_key_id],      # required
    :aws_secret_access_key  => AMAZON_CONFIG[:aws_secret_access_key],  # required
    :region                 => AMAZON_CONFIG[:region]                  # optional, defaults to 'us-east-1'
  }
  config.fog_directory  = AMAZON_CONFIG[:bucket]                    # required
  config.fog_public     = true                                      # optional, defaults to true
  # config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}  # optional, defaults to {}
  # config.asset_host     = 'https://assets.example.com'            # optional, defaults to nil
end