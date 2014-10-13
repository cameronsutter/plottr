class CreateLines < ActiveRecord::Migration
  def change
    create_table :lines do |t|
      t.string :title
      t.integer :position
      t.string :color

      t.timestamps
    end
  end
end
