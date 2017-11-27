class UsersController < ApplicationController

  skip_authorization_check
  respond_to :html, :json

  def index
    @users = User.all
    respond_with(@users) do |format|
      format.json { render :json => @users.as_json }
      format.html
    end
  end


end
