class AddStateBooleanToTags < ActiveRecord::Migration
  def change
    add_column :tags, :published, :boolean, :default => 0
  end
end
