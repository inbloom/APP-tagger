class Tag < ActiveRecord::Base
  attr_accessible :session_id, :data, :published
end
