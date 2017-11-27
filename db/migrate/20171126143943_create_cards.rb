class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.integer :assignee_id
      t.integer :creator_id
      t.string :title
      t.text :description
      t.integer :status_id
      t.integer :priority_id

      t.timestamps null: false
    end
  end
end
