Rails.application.routes.draw do
  resources :cryptodashes, only: [:index, :show, :create, :update, :destroy]
  resources :watchlists, only: [:index, :show, :create, :update, :destroy]
  resources :chatters, only: [:index, :create, :show]
  resources :currencies, only: [:index, :show, :create]
  resources :tokens, only: [:index, :show, :create]

  post '/likes/:id/like', to: 'likes#like', as: 'like'
  post '/likes/:id/unlike', to: 'likes#unlike', as: 'unlike'
  
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # get "/currencies", to: 'currencies#index'
  post 'search', to: 'tokens#search'
  post 'calculate', to: 'tokens#calculate'

  # patch "/likes/:id/like", to: "chatters#increment_likes"
  # patch "/chatters/:id/unlike", to: "chatters#decrement_likes"

  get "/watchlists", to: "watchlists#index"
  post "/watchlists", to: "watchlists#create"
  # destroy "/watchlists/:id/destroy", to: "watchlists#destroy"

  get "/cryptodashes", to: "cryptodashes#index"
  post "/cryptodashes", to: "cryptodashes#create"
  
  # post '/updatecrypto' to: 'cryptos#update'

  # all other routes will be load our React application
  # this route definition matches:
  # - *path: all paths not matched by one of the routes defined above
  # - constraints:
  #   - !req.xhr?: it's not a XHR (fetch) request
  #   - req.format.html?: it's a request for a HTML document
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end

