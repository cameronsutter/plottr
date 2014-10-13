class Card < ActiveRecord::Base
  belongs_to :line
  belongs_to :beat
end
