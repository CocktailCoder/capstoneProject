class ChattersController < ApplicationController
    def index
        render json: Chatter.all
      end
    
      def create
        # byebug
        chatter = @current_user.chatters.create!(chatter_params)
        render json: chatter, status: :created
      end

      def increment_likes
        chatter = find_chatter
          chatter.update(likes: project.likes + 1)
          render json: chatter
      end

      def decrement_likes
        chatter = find_chatter
          chatter.update(likes: project.likes - 1)
          render json: chatter
      end
    
      private
    
      def chatter_params
        params.permit(:headline, :chat, :user_id, :likes)
      end
    
      def find_chatter
        Chatter.find(params[:id])
      end
    end
