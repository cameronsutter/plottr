class Line < ActiveRecord::Base
  belongs_to :board
  has_many :cards

  after_initialize :defaults

  def defaults
    self.color ||= '#000000'
  end
end
