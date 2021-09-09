class ChatterSerializer < ActiveModel::Serializer
  attributes :id, :headline, :chat
  has_one :user
end
