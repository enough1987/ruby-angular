class AddAttachmentAttachmentToSellerImages < ActiveRecord::Migration
  def self.up
    change_table :seller_images do |t|
      t.attachment :attachment
    end
  end

  def self.down
    remove_attachment :seller_images, :attachment
  end
end
