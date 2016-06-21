module Spree
  AppConfiguration.class_eval do
		
		#	front   
		preference :front_head_line,   			:string,  default: '21st century watch buying and selling'
		preference :front_sub_head_line, 		:string, 	default: 'Hand-inspected, certified, pre-owned watches'   
		
		#	seller  
		preference :seller_head_line,   			:string,  default: 'The best way to sell your watch'
		preference :seller_sub_head_line, 		:string, 	default: 'We will inspect your watch and offer more than a dealer, guaranteed.'   
		
		
		#global
		preference :global_contact_email,   :string,  default: 'contact@watches.com'
    preference :global_phone,   				:string,  default: '000-000-000-000'
    preference :global_copyright,   		:string,  default: '© All rights reserved'

	end
end
