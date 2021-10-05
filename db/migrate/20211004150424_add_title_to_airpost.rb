class AddTitleToAirpost < ActiveRecord::Migration[6.1]
  def change
    add_column :airposts, :title, :string
  end
end
