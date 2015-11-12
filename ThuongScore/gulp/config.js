var source = '../public';
var production = '../public';

module.exports = {
optimize: {
    css: {
		src: source + "/css/*.css",
		dest: production + "/css/",
		options:{
			keepSpecialComments: 0
		}
    },
    js:  {
		src: source + "/js/*.js",
		dest: production + "/js/",
		options: {}
    },
    images: {
    		src: source + "/images/**/*.{jpg,jpeg,png,gif}",
		dest: production + "/images/",
		options:  {
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}
    },
    html:  {
		src: "",
		dest: production,
		options: {
			collapseWhitespace: true
		}
    },
    deleteIt: {
		css :    production + '/css/*.css', 
		js: 	    production + '/js/*.js',
		images:  production + '/images/**/*'
    }
}
}