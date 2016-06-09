require 'test_helper'

class RoutangControllerTest < ActionController::TestCase
  test "should get any" do
    get :any
    assert_response :success
  end

end
