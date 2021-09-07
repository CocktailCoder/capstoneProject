class CryptosController < ApplicationController

    def create
        crypto = Crypto.create!(user_params)
        # session[:user_id] = user.id
        render json: crypto, status: :created
      end
      private
    
      def chatter_params
        params.permit(:name, :symbol, :price)
      end

end
