Rails.application.routes.draw do

  namespace :api do
    resources :beats, :cards, :lines, :notes
    resources :boards do
      get 'whole_board'
      get 'export'
    end
  end

  get '*a' => 'client#index'

  get 'client/index'
  root 'client#index'

end
