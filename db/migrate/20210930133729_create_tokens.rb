class CreateTokens < ActiveRecord::Migration[6.1]
  def change
    create_table :tokens do |t|
      t.string :name
      t.string :image
      t.bigint :max_supply
      t.string :currency_symbol
      t.string :slug

      t.timestamps
    end
  end
end
