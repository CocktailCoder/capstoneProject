Rails.application.routes.draw do
  resources :cryptos
  resources :chatters, only: [:index, :create]
  resources :recipes, only: [:index, :create]
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "/currency", to: 'currencies#index'
  post 'search', to: 'currencies#search'
  post 'calculate', to: 'currencies#calculate'

  # all other routes will be load our React application
  # this route definition matches:
  # - *path: all paths not matched by one of the routes defined above
  # - constraints:
  #   - !req.xhr?: it's not a XHR (fetch) request
  #   - req.format.html?: it's a request for a HTML document
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  patch "/chatters/:id/like", to: "chatters#increment_likes"
  patch "/chatters/:id/unlike", to: "chatters#decrement_likes"
end

