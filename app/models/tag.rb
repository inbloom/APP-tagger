class Tag < ActiveRecord::Base
  attr_accessible :user_id, :data, :published, :uuid
  
  belongs_to :user
  
end
