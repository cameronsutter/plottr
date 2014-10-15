class Board < ActiveRecord::Base
  has_many :beats
  has_many :lines
  # belongs_to :user

  # must have used .includes(:beats, :lines) for this to work
  def whole_board
    cards = lines.map {|l| l.cards }
    {
      board: self,
      beats: beats,
      lines: lines,
      cards: cards.flatten
    }
  end
end
