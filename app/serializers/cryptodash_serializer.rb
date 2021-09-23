class CryptodashSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :currency_id
  has_one :user
  has_one :currency
end
