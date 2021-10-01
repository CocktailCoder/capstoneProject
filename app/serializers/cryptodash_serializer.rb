class CryptodashSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :token_id
  has_one :user
  has_one :token
end
