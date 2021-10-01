class RemoveCurrencyFromCryptodashes < ActiveRecord::Migration[6.1]
  def change
    remove_column :cryptodashes, :currency_id, :bigint
  end
end
