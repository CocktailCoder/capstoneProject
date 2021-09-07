class AddLikesToChatter < ActiveRecord::Migration[6.1]
  def change
    add_column :chatters, :likes, :integer
  end
end
