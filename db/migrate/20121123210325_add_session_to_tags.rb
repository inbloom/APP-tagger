class AddSessionToTags < ActiveRecord::Migration
  def change
    add_column :tags, :session_id, :integer
    add_column :tags, :data, :text
  end
end
