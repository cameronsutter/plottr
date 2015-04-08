class Note < ActiveRecord::Base
  belongs_to :board
  belongs_to :parent, class_name: "Note"
  has_many :child_notes, class_name: "Note", foreign_key: "parent_id"


  before_destroy :move_children

  def move_children
    child_notes.each do |note|
      note.parent_id == self.parent_id
      note.save!
    end
  end
end
