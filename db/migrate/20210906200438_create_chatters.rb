class CreateChatters < ActiveRecord::Migration[6.1]
  def change
    create_table :chatters do |t|
      t.string :headline
      t.text :chat

      t.timestamps
    end
  end
end
