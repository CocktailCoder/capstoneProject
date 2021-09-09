class Chatter < ApplicationRecord
    belongs_to :user

    validates :headline, presence: true
    validates :chat, length: { minimum: 25 }


    # default_scope { includes(:user, :category) }
    # scope :with_replies, -> { includes(:replies) }
end
