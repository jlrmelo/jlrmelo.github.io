# frozen_string_literal: true

source "https://rubygems.org"

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]
  
gemspec

gem 'github-pages', "~> 223", group: :jekyll_plugins
gem "jekyll-include-cache", group: :jekyll_plugins
gem 'jekyll-scholar', group: :jekyll_plugins
gem "webrick", "~> 1.7", group: :jekyll_plugins