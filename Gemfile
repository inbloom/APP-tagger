source 'https://rubygems.org'

gem 'rails', '3.2.8'

group :development, :staging do  
  # Mysql
  gem 'mysql2'
end

group :production do
  gem 'pg'
end

gem 'less-rails'

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  gem 'therubyracer', :platforms => :ruby
  #gem "therubyracer", '~> 0.10.2'

  gem 'uglifier', '>= 1.0.3'
end

# SLC OAuth Gem
gem 'omniauth'
gem 'omniauth-slc', '0.0.2'
# HTTP Party Rockin
gem 'httparty'
# Twitter bootstrap baby
gem 'twitter-bootstrap-rails', :git => 'git://github.com/seyhunak/twitter-bootstrap-rails.git'
# JSON
gem 'json'
# Lib V8 Javascript Engine
gem 'libv8'
# Jquery Goodness
gem 'jquery-rails'
gem 'jquery-ui-rails'
# Google Analytics
gem 'google-analytics-rails'

group :development, :test do
# Use thin as webserver
  gem 'thin'
end
