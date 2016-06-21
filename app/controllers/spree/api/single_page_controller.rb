module Spree
  module Api
      class SinglePageController < Spree::Api::BaseController

def index    

      @products = product_scope.find(params[:id])
		expires_in 15.minutes, public: true
		headers['Surrogate-Control'] = "max-age=#{15.minutes}"
		#@similar = Spree::Taxon.find_by_name("Front view").active_products
		respond_with(@products)
end

        

   
       
       
      end
    end
  end
