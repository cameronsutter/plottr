class Api::LinesController < ApplicationController
  before_action :set_line, only: [:show, :update, :destroy]

  def index
    @lines = Lines.all
    render json: @lines
  end

  def show
    render json: @line
  end

  def create
    @line = Line.new(line_params)
    if @line.save
      render status: :created, json: @line
    else
      render status: :unprocessable_entity, json: @line.errors
    end
  end

  def update
    if @line.update(line_params)
      render status: :ok, json: @line
    else
      render status: :unprocessable_entity, json: @line.errors
    end
  end

  def destroy
    @line.destroy
    render head :no_content
  end

  private
    def set_line
      @line = Line.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def line_params
      params.require(:line).permit(:title, :position, :color)
    end
end
