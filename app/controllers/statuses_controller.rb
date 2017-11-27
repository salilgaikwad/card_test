class StatusesController < ApplicationController

  skip_authorization_check
  respond_to :html, :json

  def index
    @statuses = Status.all
    respond_with(@statuses) do |format|
      format.json { render :json => @statuses.as_json }
      format.html
    end
  end
end
