class Api::BeatsController < ApplicationController
  before_action :set_beat, only: [:show, :update, :destroy]

  def index
    @beats = Beat.all
    render json: @beats
  end

  def show
    render json: @beat
  end

  def create
    @beat = Beat.new(beat_params)
    if @beat.save
      render status: :created, json: @beat
    else
      render status: :unprocessable_entity, json: @beat.errors
    end
  end

  def update
    if @beat.update(beat_params)
      render status: :ok, json: @beat
    else
      render status: :unprocessable_entity, json: @beat.errors
    end
  end

  def destroy
    json = @beat.to_json
    @beat.destroy
    render json: json
  end

  private
    def set_beat
      @beat = Beat.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def beat_params
      params.require(:beat).permit(:title, :position, :board_id)
    end
end
