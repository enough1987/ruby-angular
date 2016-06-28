# This migration comes from spree_favorite_products (originally 20130705080641)
class CreateTableFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.integer :user_id
      t.integer :product_id
      t.timestamps
    end
  end
end
