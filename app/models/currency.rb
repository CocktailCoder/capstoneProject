class Currency < ApplicationRecord
    belongs_to :user
    # def calculate_value(amount)
    #     (current_price.to_f * amount.to_f).round(4)
    #   end

    # def current_price
    #     api_key = "43409481-bb3d-4fbc-844b-32e280794404"
    #     url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"
    #     symbol = self.currency_symbol
    #     query = {
    #         "symbol" => symbol
    #     }
    #     headers = {
    #         "X-CMC_PRO_API_KEY" => api_key,
    #         "Accepts" => "application/json"
    #     }
    #     request = HTTParty.get(url, :headers => headers, :query => query)
    #     puts request
    #     response = JSON.parse(request.body)["data"][symbol]["quote"]["USD"]["price"]
    # end
end
