
module Spree
  module Api
    class BuyController < Spree::Api::BaseController

      def index

        @products = Spree::Taxon.find_by_name("Front view").active_products
				#render :json => {:status => 2, :text => @products}.to_json
				@products = @products.distinct.page(params[:page]).per(params[:per_page])
        expires_in 15.minutes, :public => true
        headers['Surrogate-Control'] = "max-age=#{15.minutes}"
        respond_with(@products)
      end
 

    end
  end
end


