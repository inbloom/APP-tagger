class UpdateTagsChangeSessionToUser < ActiveRecord::Migration
  def change
    remove_column :tags, :session_id
    add_column :tags, :user_id, :integer
  end
end
