class AddColumnsToCryptodashes < ActiveRecord::Migration[6.1]
  def change
    add_column :cryptodashes, :token_id, :bigint
    add_index :cryptodashes, :token_id
  end
end
