#!/usr/bin/env node
const ghpages = require('gh-pages');

const OUTPUT_DIR = 'storybook-static';
const SITE_BRANCH = 'deploy';

const publishCallback = (err) => {
    err && console.error(`An error occurred deploying to Github Pages: ${err}`);
};

const options = {
    branch: SITE_BRANCH,
    push: true,
};

ghpages.publish(OUTPUT_DIR, options, publishCallback);
