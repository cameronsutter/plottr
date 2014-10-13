Rails.application.routes.draw do

  namespace :api do
    resources :beats, :cards, :lines
  end

  get '*a' => 'client#index'

  get 'client/index'
  root 'client#index'

end
