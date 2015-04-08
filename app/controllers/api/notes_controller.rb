class Api::NotesController < ApplicationController
  before_action :set_note, only: [:show, :update, :destroy]

  def index
    @notes = Note.all
    render json: @notes
  end

  def show
    render json: @note
  end

  def create
    @note = Note.new(note_params)
    if @note.save
      render status: :created, json: @note
    else
      render status: :unprocessable_entity, json: @note.errors
    end
  end

  def update
    if @note.update(note_params)
      render status: :ok, json: @note
    else
      render status: :unprocessable_entity, json: @note.errors
    end
  end

  def destroy
    json = @note.to_json
    @note.destroy
    render json: json
  end

  private
    def set_note
      @note = Note.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def note_params
      params.require(:note).permit(:title, :description, :board_id, :parent_id)
    end
end
