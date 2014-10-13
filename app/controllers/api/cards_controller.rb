class Api::CardsController < ApplicationController
  before_action :set_card, only: [:show, :update, :destroy]

  def index
  end

  def show
  end

  def new
  end

  def create
  end

  def update
  end

  def destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_card
      @card = Card.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def card_params
      params.require(:card).permit(:line_id, :beat_id, :title, :description)
    end
end
