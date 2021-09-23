class User < ApplicationRecord
  has_many :chatters
  has_many :currencies
  
  has_secure_password

  validates :username, presence: true, uniqueness: true
end
