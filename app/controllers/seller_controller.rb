class SellerController < ApplicationController
	skip_before_filter :verify_authenticity_token 
	def upload

		puts '-------------------- start '
		puts params
		puts '-------------------- end '

      @sellerimage = SellerImage.create( post_sellerimage )
		render :json => { :status => 2, 
								:original => @sellerimage.attachment.url,
                        :medium => @sellerimage.attachment.url(:medium),
                        :thumb => @sellerimage.attachment.url(:thumb)
								}.to_json
								
	end

	def seller_add
		@sellerimage = Seller.create( post_seller_add )
		render :json => { :status => 2}.to_json
	end


private
	def mail_send 
  
	end

	def post_sellerimage
		#params.require(:post).permit(:attachment)
		params.require(:sellerimage).permit(:attachment)
	end

	def post_seller_add
		#params.require(:post).permit(:attachment)
		params.require(:seller_add).permit(:first_name, :last_name, :phone, :adres, :brand, :model, :condition, :referenc, :year, :content, :images, :comment, :period)

	end

end


