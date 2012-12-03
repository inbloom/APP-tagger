class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :external_id
      t.string :full_name
      t.string :realm
      t.string :tenant_id
      t.string :provider
      t.string :user_id

      t.timestamps
    end
  end
end
