class AddBarandToSpreeProducts < ActiveRecord::Migration
  def change
    add_column :spree_products, :brand, :string
  end
end
