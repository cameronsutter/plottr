namespace :assets do
  desc "make the plottr.js file"
  web_modules_files = FileList[
    "app/web_modules/**/*.js",
    "app/web_modules/**/*.jsx",
  ]
  app_file = file 'app/assets/javascripts/plottr.js' => web_modules_files do
    sh 'node_modules/.bin/webpack'
  end

  task :build => app_file

end
