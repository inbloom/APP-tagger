AMAZON_CONFIG = YAML.load(File.read(File.expand_path('../../amazon.yml', __FILE__)))
AMAZON_CONFIG.merge! AMAZON_CONFIG.fetch(Rails.env, {})
AMAZON_CONFIG.symbolize_keys!