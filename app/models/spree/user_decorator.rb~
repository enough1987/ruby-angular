Spree::User.class_eval do
  
validates :name, format: { with: /\A[a-zA-Z]+\z/,
    message: "only allows letters and minium 3"}, length: { minimum: 3 } 

validates :last_name, format: { with: /\A[a-zA-Z]+\z/,
    message: "only allows letters and minium 3" }, length: { minimum: 3 } 
validates :adress, length: { minimum: 25 } 
end
