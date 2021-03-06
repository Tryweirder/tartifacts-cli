'use strict';

const test = require('ava');

const getOptions = require('../../lib/cli').getOptions;

test('should return root option', async t => {
    const options = await getOptions({ root: 'path/to/root/' });

    t.is(options.root, 'path/to/root/');
});

test('should return dest dir option', async t => {
    const options = await getOptions({ destDir: 'path/to/dest-dir/' });

    t.is(options.destDir, 'path/to/dest-dir/');
});

test('should return boolean options', async t => {
    const options = await getOptions({
        followSymlinks: true,
        dotFiles: true,
        emptyDirs: false,
        emptyFiles: false,
        watch: false
    });

    t.deepEqual(options, {
        followSymlinks: true,
        dotFiles: true,
        emptyDirs: false,
        emptyFiles: false,
        watch: false
    });
});

test('should not add other options', async t => {
    const options = await getOptions({ other: 'xxx' });

    t.deepEqual(options, {});
});
