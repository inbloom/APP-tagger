SLC_CONFIG = YAML.load(File.read(File.expand_path('../../slc.yml', __FILE__)))
SLC_CONFIG.merge! SLC_CONFIG.fetch(Rails.env, {})
SLC_CONFIG.symbolize_keys!