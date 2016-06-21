object false
child(@products => :product) do
  extends "spree/api/products/show_buy"
end
@similar = Spree::Taxon.find_by_name("Front view").active_products
child(@similar => :similar) do
  extends "spree/api/products/show_buy"
end
