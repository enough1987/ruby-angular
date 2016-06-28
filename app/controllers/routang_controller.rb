class RoutangController < ApplicationController
 	skip_before_filter :verify_authenticity_token
	def any
        	render :file => "/public/index.html"
  	end


end

