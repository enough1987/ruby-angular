Rails.application.routes.draw do
  




  

mount Spree::Core::Engine, at: '/'

  #get 'routang/any'

  #get 'routang/any'

 # This line mounts Spree's routes at the root of your application.
  # This means, any requests to URLs such as /products, will go to Spree::ProductsController.
  # If you would like to change where this engine is mounted, simply change the :at option to something different.
  #
  # We ask that you don't use the :as option here, as Spree relies on it being the default of "spree"



          # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
Spree::Core::Engine.add_routes do
namespace :api, defaults: { format: 'json' } do

	resources :buy do
      resources :images
      resources :variants
      resources :product_properties
    end
	
	resources :search_page do
      resources :images
      resources :variants
      resources :product_properties
    end

	resources :search do
      resources :images
      resources :variants
      resources :product_properties
    end


	resources :single_page do
      resources :images
      resources :variants
      resources :product_properties
    end

	resources :global do

    end

 match 'favorite/create', to: 'favorite#create', via: [:get, :post]
    match 'favorite/destroy', to: 'favorite#destroy', via: [:get, :post]
    match 'favorite/list', to: 'favorite#list', via: [:get, :post]
    match 'favorite/load', to: 'favorite#load', via: [:get, :post]
end
end




match '/api/sign_in', to: 'auth#sign_in', via: 'post'
match '/api/sign_up', to: 'auth#sign_up', via: 'post'
match '/api/seller/upload', to: 'seller#upload', via: [:get, :post]
match '/api/seller/add', to: 'seller#seller_add', via: [:get, :post]

#get '/go2json/buy', to: 'expath#buy' 
#get '/go2json/sell', to: 'expath#sell'
#get '/go2json/search', to: 'expath#search'
#get '/go2json/page', to: 'expath#page'
#get '/go2json/global', to: 'expath#global'
#get '/go2json/cart', to: 'expath#cart'
#get '/go2json/shipping', to: 'expath#shipping'
#get '/go2json/checkout', to: 'expath#checkout'

get '*path', to: 'routang#any'
post '*path', to: 'routang#any'
end
