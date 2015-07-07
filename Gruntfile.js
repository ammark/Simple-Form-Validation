module.exports = function(grunt) {

    // TODO
    // 1. less => done
    // 2. PostCSS => done
    // 3. JS Uglify
    // 4. htmlmin
    // 5. imagemin
    // 6. autoprefixer => done
    // 7. watch => done
    // 8. JS Hint => Done => but dont need now. Jshint in sublime.
    // 9. Live Reload

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Takes the main less file called main.less from assets/imagess/less and
        // throws the output to style.css
        less: {
            build: {
                files: {
                    'assets/stylesheet/main.css': 'assets/stylesheet/main.less'
                }
            }
        },

        // Takes the main.css and autoprefixes and minifies it
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({
                        browser: 'last 1 version'
                    }),
                    require('cssnano')
                ]
            },
            dist: {
                src: 'assets/stylesheet/main.css'
            }
        },

        // Linting grunt file and main js file
        jshint: {
            files: ['Gruntfile.js', 'assets/js/main.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        watch: {            
            css: {
                files: ['assets/stylesheet/*.less'],
                tasks: ["less", "postcss"],
                options: {
                    spawn: false,
                }
            },
            javascript: {
                files: ['assets/js/main.js'],
                tasks: ['jshint']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // grunt.registerTask('test', ['jshint', 'qunit']);

    grunt.registerTask('default', ['less', 'postcss', 'jshint', 'watch']);

};
