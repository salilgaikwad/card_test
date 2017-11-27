class PrioritiesController < ApplicationController

  skip_authorization_check
  respond_to :html, :json  

  def index
    @priorities = Priority.all
    respond_with(@priorities) do |format|
      format.json { render :json => @priorities.as_json }
      format.html
    end
  end
end
