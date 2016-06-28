require 'test_helper'

class Spree::Api::FavoriteControllerTest < ActionController::TestCase
  test "should get switch" do
    get :switch
    assert_response :success
  end

end
