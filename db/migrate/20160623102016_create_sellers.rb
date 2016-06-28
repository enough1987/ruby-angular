class CreateSellers < ActiveRecord::Migration
  def change
    create_table :sellers do |t|
      t.string :phone
      t.string :brand 
      t.string :model
      t.string :reference
		t.string  :condition
      t.integer :year
      t.string :content
      t.string :images
      t.text :comment
      t.string :period
		t.string :user_id
      t.timestamps null: false
    end
  end
end
