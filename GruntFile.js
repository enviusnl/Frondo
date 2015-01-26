module.exports = function (grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		options: {
			devRoot: 'dev',
			webRoot: 'www'
		},

		browserSync: {
			bsFiles: {
				src: [
					'<%= options.webRoot %>/css/*.css',
					'<%= options.webRoot %>/*.html'
				]
			},
			options: {
				watchTask: true,
				server: {
					baseDir: "<%= options.webRoot %>"
				}
			}
		},

		watch: {
			jade: {
				files: ['<%= options.devRoot %>/jade/**/*.jade'],
				tasks: ['jade']
			},
			js: {
				files: ['<%= options.devRoot %>/js/**/*.js'],
				tasks: ['jshint', 'concat']
			},
			sass: {
				files: ['<%= options.devRoot %>/sass/**/*.sass'],
				tasks: ['sass', 'autoprefixer']
			}
			// css: {
			// 	files: ['<%= options.webRoot %>/css/**/*.css'],
			// 	tasks: ['autoprefixer']
			// }
		},

		jade: {
			compile: {
				options: {
					data: {
						debug: false
					}
				},
				files: [{
					cwd: '<%= options.devRoot %>/jade',
					src: '*.jade',
					dest: '<%= options.webRoot %>',
					ext: '.html',
					expand: true
				}]
			}
		},

		sass: {
			dist: {
				options: {
					style: 'expanded',
					sourcemap: 'none',
					require: [
						'susy',
						'breakpoint'
					]
				},
				files: {
					'<%= options.webRoot %>/css/main.min.css': '<%= options.devRoot %>/sass/main.scss'
				}
			}
		},

		autoprefixer: {
			options: {
				expand: true,
				flatten: true,
				browsers: ['last 20 versions', 'ie 8', 'ie 9'],
			},
			all: {
				src: '<%= options.webRoot %>/css/main.min.css',
				dest: '<%= options.webRoot %>/css/main.min.css'
			}
		},

		jshint: {
			options: {
				browser: true, //Web Browser (window, document, etc)
				strict: true, //Requires all functions run in ES5 Strict Mode
				unused: true, //Require all defined variables be used
				undef: true, //Require all non-global variables to be declared (prevents global leaks)
				quotmark: 'single', //Quotation mark consistency
				camelcase: true, //Identifiers must be in camelCase
				eqeqeq: true, //Require triple equals (===) for comparison
				forin: true, //Require filtering for..in loops with obj.hasOwnProperty()
				immed: true, //Require immediate invocations to be wrapped in parens e.g. `(function () { } ());`
				indent: 4, //Number of spaces to use for indentation
				latedef: true, //Require variables/functions to be defined before being used
				newcap: true, //Require capitalization of all constructor functions e.g. `new F()`
				noarg: true, //Prohibit use of `arguments.caller` and `arguments.callee`
				noempty: true, //Prohibit use of empty blocks
				maxparams: 3, //Max number of formal params allowed per function
				maxdepth: 4, //Max depth of nested blocks (within functions)
				predef: ['console', 'B', 'Browserkit']
			},
			all: ['<%= options.devRoot %>/js/src/**/*.js']
		},

		concat: {
			js: {
				src: ['<%= options.devRoot %>/js/libs/**/*.js', '<%= options.devRoot %>/js/src/**/*.js'],
				dest: '<%= options.webRoot %>/js/app.js'
			}
		},

		uglify: {
			js: {
				files: {
					'<%= options.webRoot %>/js/app.min.js': ['<%= options.devRoot %>/js/libs/**/*.js', '<%= options.devRoot %>/js/src/**/*.js']
				}
			}
		},

		clean: {
			html: {
				src: ['<%= options.webRoot %>/*.html']
			},
			css: {
				src: ['<%= options.webRoot %>/css/**/*.css']
			},
			js: {
				src: ['<%= options.webRoot %>/js/**/*.js']
			}
		}

	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('build', ['clean', 'jade', 'sass', 'autoprefixer', 'jshint', 'uglify']);
	grunt.registerTask('default', ['build', 'browserSync', 'watch']);
};