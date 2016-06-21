module Spree
	module Admin
    GeneralSettingsController.class_eval do
      def render(*args)
					@preferences_currency |= [:front_head_line, :front_sub_head_line, :seller_head_line, :seller_sub_head_line, :global_contact_email, :global_phone,   :global_copyright ]
      super
      end

      private

      def update_field_options
        params.each do |name, value|
					next unless Spree::Config.has_preference? name
          Spree::Config[name] = value
        end
      end
    end
  end
end
