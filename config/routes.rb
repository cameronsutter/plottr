Rails.application.routes.draw do

  namespace :api do
    resources :beats, :cards, :lines, :notes
    resources :boards do
      get 'whole_board'
      get 'export'
    end
  end

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  get '*a' => 'client#index'

  get 'client/index'
  root 'client#index'

end
