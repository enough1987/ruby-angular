module Spree
  Product.class_eval do
		def self.with_posts
  		#joins(:posts).group('posts.id').select('users.*, count(posts.id) as posts_count')
		end
  end 
end
