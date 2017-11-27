class CardsController < ApplicationController

  before_action :get_card, except: [:index, :create]
  respond_to :html, :json

  def index
    @card = Card.all
    respond_with(@cards) do |format|
      format.json { render :json => @card.as_json }
      format.html
    end
  end

  def create
    @card = Card.new(card_params)
    if @card.save
      render json: @card.as_json, status: :ok
    else
      render json: {card: @card.errors, status: :no_content}
    end
  end      

  def show
    respond_with(@card.as_json)
  end

  def update
    if @card.update_attributes(card_params)
      render json: @card.as_json, status: :ok 
    else
      render json: {card: @card.errors, status: :unprocessable_entity}
    end
  end

  def destroy
    @card.destroy
    render json: {status: :ok}
  end

  private

  def card_params
    params.fetch(:card, {}).permit(:first_name, :last_name, :email, :phone])
  end

  def get_card
    @card = Card.find(params[:id])
    render json: {status: :not_found} unless @card
  end

end
