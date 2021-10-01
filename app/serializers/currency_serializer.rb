class CurrencySerializer < ActiveModel::Serializer
    attributes :id, :name, :description, :max_supply, :currency_symbol, :slug
    has_one :user
  end
  