# Set up gems listed in the Gemfile.
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../../Gemfile', __FILE__)

require 'bundler/setup' if File.exist?(ENV['BUNDLE_GEMFILE'])

ENV["GOOGLE_CLIENT_ID"] = "946614978048-btjgkiqbmuh5292s5dakpfsgb9oh7j8j.apps.googleusercontent.com"
ENV["GOOGLE_CLIENT_SECRET"] = "ZlwN3mOYsDhwE3aX9t8d4tgm"
