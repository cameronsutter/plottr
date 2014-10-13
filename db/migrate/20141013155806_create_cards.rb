class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.references :line, index: true
      t.references :beat, index: true
      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
