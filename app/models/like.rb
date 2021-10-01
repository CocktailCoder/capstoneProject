class Like < ApplicationRecord
  belongs_to :user_id
  belongs_to :chatter_id
  validates :user_id, uniqueness: {scope: :chatter_id}
end
