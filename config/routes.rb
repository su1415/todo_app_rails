Rails.application.routes.draw do
  root "home#index"
  get "home/index"
  resources :tasks, only: [:index, :create, :update, :destroy]
end
