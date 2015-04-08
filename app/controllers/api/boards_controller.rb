class Api::BoardsController < ApplicationController
  before_action :set_board, only: [:show, :update, :destroy]

  def index
    @boards = Board.all
    render json: @boards
  end

  def show
    render json: @board
  end

  def whole_board
    boards = Board.where(id: params[:board_id]).includes(:beats, :lines, :notes)
    raise ActiveRecord::RecordNotFound if boards.empty?
    render json: boards.first.whole_board
  end

  def export
    boards = Board.where(id: params[:board_id]).includes(:beats, :lines)
    raise ActiveRecord::RecordNotFound if boards.empty?
    board = boards.first
    send_data board.whole_board.to_json, type: :json, filename: "plottr_#{board.title.underscore.gsub(/\s/, "_")}_export.json"
  end

  def create
    @board = Board.new(board_params)
    if @board.save
      render status: :created, json: @board
    else
      render status: :unprocessable_entity, json: @board.errors
    end
  end

  def update
    if @board.update(board_params)
      render status: :ok, json: @board
    else
      render status: :unprocessable_entity, json: @board.errors
    end
  end

  def destroy
    json = @board.to_json
    @board.destroy
    render json: json
  end

  private
    def set_board
      @board = Board.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def board_params
      params.require(:board).permit(:title, :user_id)
    end
end
