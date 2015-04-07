namespace :deploy do
  task :prepare do
    sh 'rm public/javascripts/plottr.js && cp app/assets/javascripts/plottr.js public/javascripts/plottr.js'
  end

  task :push do
    sh "git push heroku master"
  end
end