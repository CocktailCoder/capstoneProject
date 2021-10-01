class Chatter < ApplicationRecord
    belongs_to :user
    has_many :likes

    validates :headline, presence: true
    validates :chat, length: { minimum: 25 }

    def liked?(user)
        !!self.likes.find{|like| like.user_id == user.id}
    end
 
end
