require 'test_helper'

class SellerControllerTest < ActionController::TestCase
  test "should get upload" do
    get :upload
    assert_response :success
  end

  test "should get seller_save" do
    get :seller_save
    assert_response :success
  end

  test "should get mail_send" do
    get :mail_send
    assert_response :success
  end

end
