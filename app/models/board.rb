class Board < ActiveRecord::Base
  has_many :beats
  has_many :lines
  # belongs_to :user
end
