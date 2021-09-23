class WatchlistsController < ApplicationController
    def index
        watchlists = Watchlist.all
        render json: watchlists
    end

    def create
        watchlist = Watchlist.create(watchlist_params)
        render json: watchlist
    end

    # def destroy
    #     watchlist = Watchlist.find(params[:id])
    #     watchlist.destroy
    # end

    private

    def watchlist_params
        params.permit(:user_id, :chatter_id)
    end
end
