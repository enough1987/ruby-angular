=begin
Deface::Override.new(
    :virtual_path   => "spree/admin/products/_form",
    :name           => "company_logo_to_admin_product",
    :insert_bottom  => "[data-hook='admin_product_form_additional_fields']",
    :text           => "
          <p>
                <%= f.label :brand %>
                <%= f.text_field :brand %>
          </p>
"
)
=end
