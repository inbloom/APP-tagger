class FixSessionIdType < ActiveRecord::Migration
  def change
    remove_column :tags, :session_id
    add_column :tags, :session_id, :string
  end
end
