

module Spree
  module Api
    class FavoriteController < Spree::Api::BaseController


  before_filter :authenticate_spree_user!
  before_filter :find_favorite_product, only: :destroy

def create

    favorite = current_api_user.favorites.new product_id: params[:id]
      if @success = favorite.save
        @message = "Product has been successfully marked as favorite"
      else
        @message = favorite.errors.full_messages.to_sentence
      end
      #respond_to do |format|
     #   format.js
      #end 
		render :json => {:status => 1, :text => "create"}.to_json	
		return
  end

  def destroy
      if @favorite
        @success = @favorite.destroy
      end
		render :json => {:status => 2, :text => "destroy"}.to_json	
  end
    
  def list
@favorite_products = current_api_user.favorite_products.page(params[:page]).per(Spree::Config.favorite_products_per_page)
		render :json => {:status => 3, :text => "list"}.to_json	
  end 

  def load
    
  end

    private
      def find_favorite_product
        @favorite = current_api_user.favorites.joins(:product).readonly(false).find_by(spree_products: { id: params[:id] })
      end
  end


end
end
