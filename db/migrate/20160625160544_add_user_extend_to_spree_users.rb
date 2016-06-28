class AddUserExtendToSpreeUsers < ActiveRecord::Migration
  def change
    add_column :spree_users, :name, :string
    add_column :spree_users, :last_name, :string
    add_column :spree_users, :adress, :string
  end
end
