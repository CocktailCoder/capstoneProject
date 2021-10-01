class RemoveIndexFromCryptodashes < ActiveRecord::Migration[6.1]
  def change
    remove_index :cryptodashes, :currency_id
  end
end
