class WatchlistSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_one :chatter
end
