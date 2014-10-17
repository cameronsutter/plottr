class Api::CardsController < ApplicationController
  before_action :set_card, only: [:show, :update, :destroy]

  def index
    @cards = Card.all
  end

  def show
    render json: @card
  end

  def create
    @card = Card.new(card_params)
    if @card.save
      render status: :created, json: @card
    else
      render status: :unprocessable_entity, json: @card.errors
    end
  end

  def update
    if @card.update(card_params)
      render status: :ok, json: @card
    else
      render status: :unprocessable_entity, json: @card.errors
    end
  end

  def destroy
    json = @card.to_json
    @card.destroy
    render json: json
  end

  private
    def set_card
      @card = Card.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def card_params
      params.require(:card).permit(:line_id, :beat_id, :title, :description)
    end
end
