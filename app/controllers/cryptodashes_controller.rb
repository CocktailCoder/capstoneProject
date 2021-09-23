class CryptodashesController < ApplicationController
    def index
        cryptos = Cryptodash.all
        render json: cryptos
    end

    def create
        # byebug
        crypto = Cryptodash.create!(crypto_params)
        render json: crypto
    end

    def destroy
        crypto = Cryptodash.find(params[:id])
        crypto.destroy
    end

    private

    def crypto_params
        params.require(:cryptodash).permit(:user_id, :currency_id)
    end
end
