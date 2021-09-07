class Chatter < ApplicationRecord
    belongs_to :user

    validates :headline, presence: true
    validates :chat, length: { minimum: 25 }
end
