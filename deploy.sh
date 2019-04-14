#!/bin/bash

# quit if any commands fail
set -e

# return to master
function cleanup_at_exit {
#  git checkout master
  rm -rf deploy
}
trap cleanup_at_exit EXIT

# create deploy folder and copy things in
cp -rf public deploy
rm deploy/bundle.js
rm deploy/bundle.js.map

# run webpack in production mode
webpack --mode=production -o deploy/bundle.js

# checkout the pages branch
# git checkout gh-pages

# force add the bundle
git add -f public/bundle.js public/bundle.js.map

# create a commit even if no changes
git commit --allow-empty -m 'Deploying'

# push to github
git subtree push --prefix deploy origin gh-pages
