class Like < ApplicationRecord
  belongs_to :user
  belongs_to :chatter
  validates :user_id, uniqueness: {scope: :chatter_id}
end
