class AddUuidsToTags < ActiveRecord::Migration
  def change
    add_column :tags, :uuid, :string
  end
end
