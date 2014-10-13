class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.string :title
      t.integer :user_id

      t.timestamps
    end

    add_column :lines, :board_id, :integer
    add_column :beats, :board_id, :integer
  end
end
