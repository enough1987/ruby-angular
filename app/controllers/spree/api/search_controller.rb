module Spree
  module Api
      class SearchController < Spree::Api::BaseController

def index    
			@products = product_scope.ransack(params[:q]).result 
			if params[:tax]
				if params[:tax] == "null" 
					@tax = "null"
				else 
					@tax = params[:tax].split(',').flatten
					@tax = @tax.map(&:to_i)
				end		
				@products = Spree::Product.in_taxons(@tax) 
			end

			if params[:sort] 
							if params[:sort] == "price_asc"			 
								@products = @products.active.ascend_by_master_price
							end
							if params[:sort] == "price_desc"			 
								@products = @products.active.descend_by_master_price
							end
			end	


			if params[:price_max] 						 
				@price_min = params[:price_min].to_i ? params[:price_min].to_i : 0
				@price_max = params[:price_max].to_i ? params[:price_max].to_i : 0
		    	@products = @products.active.price_between(@price_min, @price_max)	
			end		
						
##Это когда поиск по пропитсам товаров 				
#if params[:brand]  
#		@products = @products.with_property_value('Brand', params[:brand])
#end
						
#taxon = Spree::Taxon.find(params[:tax].to_s.split(',').map(&:strip))
#@price.map(&:to_i)
		



					
		@products = @products.ransack(params[:q]).result
		if params[:sort] 	
			if params[:sort] == "name_asc"			 
				@products = @products.order("name ASC")
			end	
			if params[:sort] == "name_desc"			 
				@products = @products.order("name DESC")
			end
		end	

		@products = @products.distinct.page(params[:page]).per(params[:per_page])
		expires_in 15.minutes, public: true
		headers['Surrogate-Control'] = "max-age=#{15.minutes}"
		respond_with(@products)
end

        

   
       
       
      end
    end
  end
