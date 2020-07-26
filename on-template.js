#!/usr/bin/env node

const { writeFileSync, readFileSync, unlinkSync } = require('fs');

const package = require('./package.json');

const TEMPLATE_AUTHOR = 'ryanspoone';
const TEMPLATE_GITHUB_REPOSITORY = 'ryanspoone/javascript-template';
const { GITHUB_REPOSITORY, GITHUB_ACTOR } = process.env;

if (GITHUB_REPOSITORY === TEMPLATE_GITHUB_REPOSITORY) {
    // eslint-disable-next-line no-console
    console.info(`Not running inside ${TEMPLATE_GITHUB_REPOSITORY} repo.`);
    process.exit();
}

if (!GITHUB_REPOSITORY) {
    throw new Error('Unknown GITHUB_REPOSITORY.');
}

// eslint-disable-next-line no-console
console.log(`${GITHUB_ACTOR}'s ${GITHUB_REPOSITORY}`);

const TEMPLATE_PACKAGE_NAME = package.name;
const PACKAGE_NAME = `@${GITHUB_REPOSITORY.toLowerCase()}`;

/**
 * package.json
 */

package.name = PACKAGE_NAME;
package.homepage = package.homepage.replace(TEMPLATE_GITHUB_REPOSITORY, GITHUB_REPOSITORY);
package.author = package.author.replace(TEMPLATE_AUTHOR, GITHUB_ACTOR);
writeFileSync('./package.json', JSON.stringify(package, null, 4), { encoding: 'utf8' });

/**
 * README.md
 */

const readme = readFileSync('./README.md', { encoding: 'utf8' });
const newReadme = readme.split(TEMPLATE_PACKAGE_NAME).join(PACKAGE_NAME);

writeFileSync('./README.md', newReadme, { encoding: 'utf8' });

/**
 * index.js
 */

const index = readFileSync('./index.js', { encoding: 'utf8' });
const newIndex = index.split(TEMPLATE_AUTHOR).join(GITHUB_ACTOR);

writeFileSync('./index.js', newIndex, { encoding: 'utf8' });

/**
 * test/sampleTest.js
 */

const sampleTest = readFileSync('./test/sampleTest.js', { encoding: 'utf8' });
const newSampleTest = sampleTest.split(TEMPLATE_AUTHOR).join(GITHUB_ACTOR);

writeFileSync('./test/sampleTest.js', newSampleTest, { encoding: 'utf8' });

/**
 * LICENSE
 */

const license = readFileSync('./LICENSE', { encoding: 'utf8' });
const newLicense = license.split(TEMPLATE_AUTHOR).join(GITHUB_ACTOR);

writeFileSync('./LICENSE', newLicense, { encoding: 'utf8' });

/**
 * CLEAN UP
 */
unlinkSync('./on-template.js');
unlinkSync('./.github/workflows/on-template.yml');
