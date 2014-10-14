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
    boards = Board.where(id: params[:board_id]).includes(:beats, :lines)
    raise ActiveRecord::RecordNotFound if boards.empty?
    @board = boards.first
    @cards = @board.lines.map { |l| l.cards }
    render json: {
      board: @board,
      beats: @board.beats,
      lines: @board.lines,
      cards: @cards.flatten
    }
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
    @board.destroy
    render head :no_content
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
