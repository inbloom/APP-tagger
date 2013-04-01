unless Rails.env.production?
  ENV['aws_access_key_id'] = 'goes_here'
  ENV['aws_secret_access_key'] = 'goes_here'
  ENV['aws_bucket'] = 'goes_here'
  ENV['aws_region'] = 'us-east-1'
end