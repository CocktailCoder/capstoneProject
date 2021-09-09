class AddUserIdToChatters < ActiveRecord::Migration[6.1]
  def change
    # add_reference :chatters, :user_id, null: false, foreign_key: true
    add_column :chatters, :user_id, :bigint
    add_index :chatters, :user_id
  end
end
