#module Spree

class AuthController < ApplicationController
	skip_before_action :verify_authenticity_token
	


	def sign_up 
	 	@user = Spree::User.find_by_email(params[:user][:email])
					#!!! точка входа капчи
					
					#пользователь существует        	
					if @user.present?
        	  render :json => {:status => "user exist"}.to_json		  			
						return
        	end
	
        	@user = Spree::User.new(user_params)
        	
					#Исключение ошибки сохранения
					if !@user.save
						render :json => {:status => "not save"}.to_json
						#Возможно дыра  в безопастности         	  
						#unauthorized		
		  			return
       	 	end
					
					

					#генератор токена
        	@user.generate_spree_api_key!
					render :json => {:status => "Token created",:token => 										    					@user.spree_api_key}.to_json
        	return
	end
	
	def sign_in
		      	
		@user = Spree::User.find_by_email(params[:user][:email])
		
		
		#Если несовпадение
		if !@user.present? || !@user.valid_password?(params[:user][:password])
     	#unauthorized
			render :json => {:status => "user is not exist"}.to_json		  
 			return
    end
    
		@user.generate_spree_api_key! if @user.spree_api_key.blank?
		render :json => {:status => "Token created",
    :token => @user.spree_api_key}.to_json

  end

  private def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
  end



end

