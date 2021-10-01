class LikesController < ApplicationController
    def like
        @chatter = Chatter.find(params[:id])
        Like.create!(user_id: @current_user.id, chatter_id: @chatter.id)
        # redirect_to chatter_path(@chatter)
        head :ok
    end

    def unlike
        @chatter = Chatter.find(params[:id])
        like = Like.find_by!(user_id: @current_user.id, chatter_id: @chatter.id)
        like.destroy!
        # redirect_to chatter_path(@chatter)
        head :ok
    end
end