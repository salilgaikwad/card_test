class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.integer :assignee_id
      t.integer :creator_id
      t.string :title
      t.text :description
      t.integer :status
      t.integer :priority

      t.timestamps null: false
    end
  end
end
