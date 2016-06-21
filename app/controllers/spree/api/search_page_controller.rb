module Spree
  module Api
      class SearchPageController < Spree::Api::BaseController

				def index
				#@propeties = Spree::ProductProperty.where(property_id: 2)
				#render :json => {:brands => @propeties}.to_json

				#@brands = @taxonomy.taxons.find(2)
				@brands = Spree::Taxon.where(parent_id: 2)
				@gender = Spree::Taxon.where(parent_id: 13)
				
				##price minimum - maximum
				prices = Spree::Price.includes(variant: :product)
									.where(currency: Spree::Config[:currency])
				@minimum = (prices.minimum(:amount) || 0).floor.to_i
				@maximum = (prices.maximum(:amount) || 0).ceil.to_i


				render :json => { :price_min => @minimum,
													:price_max => @maximum,
													:brands => @brands,
													:gender => @gender,
													}.to_json
				end



        
			end  
	end 
end
