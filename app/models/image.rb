class Image < ActiveRecord::Base
  
  # Allow photos to run thru uploader
  mount_uploader :image, ImageUploader

  # Add validation
  validates_presence_of :image
  
  # Photos belong to a property
  belongs_to :tag

end
