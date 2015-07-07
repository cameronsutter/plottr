class Board < ActiveRecord::Base
  has_many :beats, dependent: :destroy
  has_many :lines, dependent: :destroy
  has_many :notes, dependent: :destroy
  belongs_to :user

  # must have used .includes(:beats, :lines) for this to work
  def whole_board
    cards = lines.map {|l| l.cards }
    beat_ids = beats.map(&:id)
    # make sure we don't get any cards that are not associated with beats
    # should only be a problem with boards created before this commit
    cards = cards.flatten.select do |card|
      beat_ids.include? card.beat_id
    end
    {
      board: self,
      beats: beats,
      lines: lines,
      cards: cards,
      notes: notes
    }
  end
end
