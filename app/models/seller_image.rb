class SellerImage < ActiveRecord::Base
 #attr_accessible :attachment

validates :attachment,
    attachment_content_type: { content_type: /\Aimage\/.*\Z/ },
    attachment_size: { less_than: 5.megabytes }


 has_attached_file :attachment, :styles => { :medium => "1000x1000>", :thumb => "200x200>" } 
#, default_url: "/images/:style/missing.png"

end
