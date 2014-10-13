class CreateBeats < ActiveRecord::Migration
  def change
    create_table :beats do |t|
      t.string :title
      t.integer :position

      t.timestamps
    end
  end
end
