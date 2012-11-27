class AddStateBooleanToTags < ActiveRecord::Migration
  def change
    add_column :tags, :published, :boolean, :default => false
  end
end
