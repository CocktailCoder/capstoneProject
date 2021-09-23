class CurrenciesController < ApplicationController
    def index
      render json: Currency.all
    end

    def create
      currency = @current_user.currencies.create!(currency_params)
      render json: currency, status: :created
    end
        
    private
    
    def currency_params
      params.permit(:name, :description, :max_supply, :currency_symbol, :user_id)
    end
  end
    # def search
    #     @currencies = Currency.where('LOWER(name) LIKE ?' , "%#{params[:search].downcase}%")
    #     render json {currencies: @currencies}
    # end

    # Takes in currency id and amount owned and returns overall total
    # def calculate
    #     amount = params[:amount]
    
    #     render json: {
    #       currency: currency,
    #       current_price: currency.current_price,
    #       amount: amount,
    #       value: currency.calculate_value(amount)
    #     }
    #   end

    #   private 
    #   def currency
    #     @currency ||=Currency.find(params[:id])
    # end

