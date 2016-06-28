#module Spree

class AuthController < ApplicationController
	skip_before_action :verify_authenticity_token


	def sign_up

	 	@user = Spree::User.find_by( email: params[:user][:email] )
					#!!! точка входа капчи

					
					#пользователь существует        	
			if @user.present?
        	  		render :json => {:status => 1, :text => "user exist"}.to_json		  			
					return
        	end
	
        	@user = Spree::User.new(user_params)
        	

					#Исключение ошибки сохранения
					if !@user.save
						render :json => {:status => 2, :error => @user.errors.messages}.to_json
						#Возможно дыра  в безопастности         	  
						#unauthorized		
		  			return
       	 	end					

					#генератор токена
        	@user.generate_spree_api_key!
			render :json => {:status => 4, :text => "Token created", 
			:user => @user}.to_json 
        	return
	end
	
	def sign_in     	
		@user = Spree::User.find_by( email: params[:user][:email] )
		

		#Если несовпадение
		if !@user.present? || !@user.valid_password?(params[:user][:password])
     	#unauthorized
			render :json => {:status => 3, :text => "user is not exist"}.to_json		  
 			return
    	end
    
		@user.generate_spree_api_key! if @user.spree_api_key.blank?
		render :json => {:status => 4, :text => "Token created", 
		:user => @user }.to_json

  end

def forgot_password     	
		@user = Spree::User.find_by( email: params[:user][:email] )
		

		#Если несовпадение
		if !@user.present?
     	#unauthorized
			render :json => {:status => 3, :text => "user is not exist"}.to_json		  
 			return
    	end
    	


		render :json => {:status => 5, :text => "send email" }.to_json

  end

  private def user_params
        params.require(:user).permit(:email, :password, :password_confirmation, :adress, :name, :last_name)
  end



end

