/*
 * {%= name %}
 * {%= homepage %}
 *
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Meta
		pkg: grunt.file.readJSON('package.json'),

		// Check all JS files
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp'],
			readme: ['README.md']
		},

		// Bump to the next version number.
		bump: {
			options: {
				part: 'patch',
				hardTab: true
			},
			files: ['package.json']
		},

		// Configuration to be run (and then tested).
		{%= short_name %}: {
			default_options: {
				options: {
				},
				files: {
					'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
				}
			},
			custom_options: {
				options: {
					separator: ': ',
					punctuation: ' !!!'
				},
				files: {
					'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123'],
				}
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		},

		// Generate documentation
		sildoc: {
			readme: {
				options: {
					data: {
						name: '<%= pkg.name %>',
						altName: '<%= pkg.name.match(/^(.*).$/)[1] %>',
						description: '<%= pkg.description %>',
						gruntVersion: '<%= pkg.devDependencies.grunt %>',
						gemnasium: {
							userId: 'Ragnarokkr'
						}
					},
					template: 'src-doc/readme.md.jst'
				},
				src: ['src-doc/_*.md.jst'],
				dest: 'README.md'
			}
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', '{%= short_name %}', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
