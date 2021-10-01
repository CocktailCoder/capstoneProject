class LikesController < ApplicationController
    def like
        @chatter = Chatter.all.find(params[:id])
        Like.create(user_id: current_user.id, chatter_id: @chatter.id)
        redirect_to chatter_path(@chatter)
    end
end