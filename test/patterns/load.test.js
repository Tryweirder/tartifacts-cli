'use strict';

const test = require('ava');
const mockFs = require('mock-fs');

const loadPatterns = require('../../lib/patterns').load;

test.afterEach(() => mockFs.restore());

test('should load text patterns', async t => {
    mockFs({
        'patterns': [
            '# include lib',
            'lib/**',
            '',
            '# exclude test files',
            '!lib/**/*.test.js'
        ].join('\n')
    });

    const patterns = await loadPatterns('./patterns');

    t.deepEqual(patterns, ['lib/**', '!lib/**/*.test.js']);
});

test('should load pattern module', async t => {
    mockFs({
        'patterns.js': [
            'module.exports = ["lib/**", "!lib/**/*.test.js"];',
        ].join('\n')
    });

    const patterns = await loadPatterns('./patterns.js');

    t.deepEqual(patterns, ['lib/**', '!lib/**/*.test.js']);
});

test('should load function', async t => {
    mockFs({
        'patterns.js': [
            'module.exports = () => ["lib/**", "!lib/**/*.test.js"];',
        ].join('\n')
    });

    const patterns = await loadPatterns('./patterns.js');

    t.deepEqual(patterns, ['lib/**', '!lib/**/*.test.js']);
});
