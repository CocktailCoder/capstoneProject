class ChatterSerializer < ActiveModel::Serializer
  attributes :id, :headline, :chat
  has_one :user
  has_many :likes, serializer: LikeSerializer
end
