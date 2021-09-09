Rails.application.routes.draw do
  resources :watchlists, only: [:index, :show, :create, :update, :destroy]
  resources :crypto_favs
  resources :chatters, only: [:index, :create, :show]
  
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "/currency", to: 'currencies#index'
  post 'search', to: 'currencies#search'
  post 'calculate', to: 'currencies#calculate'

  patch "/chatters/:id/like", to: "chatters#increment_likes"
  patch "/chatters/:id/unlike", to: "chatters#decrement_likes"

  get "/watchlists", to: "watchlists#index"
  post "/watchlists", to: "watchlists#create"
  # destroy "/watchlists/:id/destroy", to: "watchlists#destroy"
  # post '/updatecrypto' to: 'cryptos#update'

  # all other routes will be load our React application
  # this route definition matches:
  # - *path: all paths not matched by one of the routes defined above
  # - constraints:
  #   - !req.xhr?: it's not a XHR (fetch) request
  #   - req.format.html?: it's a request for a HTML document
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end

