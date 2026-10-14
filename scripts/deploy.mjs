// Publishes dist/ to the gh-pages branch — run with `npm run deploy` (which builds first).
//
// Plain `gh-pages -d dist` fails on Windows with spawn ENAMETOOLONG: before copying the new build
// it runs `git rm` with every file already on the branch as its own argument, and 700+ hashed
// assets overflow the command line. Removing everything is the same as removing `.`, so its rm is
// swapped for that single path. Everything else (clone cache, copy, commit, push) is gh-pages'.

import ghpages from 'gh-pages'
import Git from 'gh-pages/lib/git.js'

Git.prototype.rm = function () {
  return this.exec('rm', '--ignore-unmatch', '-r', '-f', '-q', '--', '.')
}

ghpages.publish('dist', { message: 'Updates' }, err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Published')
})
