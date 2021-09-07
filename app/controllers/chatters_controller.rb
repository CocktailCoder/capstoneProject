class ChattersController < ApplicationController
    def index
        render json: Chatter.all
      end
    
      def create
        chatter = @current_user.chatter.create!(chatter_params)
        render json: chatter, status: :created
      end
    
      private
    
      def chatter_params
        params.permit(:headline, :chat)
      end
    
    end
