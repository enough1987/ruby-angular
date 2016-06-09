class RoutangController < ApplicationController
  
	def any
        	render :file => "/public/index.html"
  	end

 	def test
    	   	render :file => "public/views/test.html"
 	end
end

