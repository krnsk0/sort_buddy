#!/bin/bash

# quit if any commands fail
set -e

# return to master
function cleanup_at_exit {
  git checkout master
}
trap cleanup_at_exit EXIT

# checkout the pages branch
git checkout -b gh-pages

# run webpack in production mode
webpack --mode=production

# force add the bundle
git add -f public/bundle.js public/bundle.js.map

# create a commit even if no changes
git commit --allow-empty -m 'Deploying'

# push to github
git subtree push --prefix public origin gh-pages
