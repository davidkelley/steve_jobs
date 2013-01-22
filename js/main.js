/**
 * Configure RequireJS
 */
requirejs.config({
	
    baseUrl: 'js/modules',
    
    /**
     * Application wide variables
     */
    config: {
		
		windows: {
			disksize: 131072
		}
	},
    
    shim: 
    {
		'components/jquery': {
			exports: '$',
			init: function($)
			{
				return this.$.noConflict();
			}
		},
		
		'components/modernizr': {
			exports: 'Modernizr'
		}
	},

    paths: {
        components: '../components',
        helpers: '../helpers',
    }
});

require(['init', 'components/modernizr'], function(init) {
	if (init) return true;
	return false;
});

/**
 * Perform post-initialisation DOM manipulations
 */
if (typeof(_a) != "undefined") for (var i in _a) (function() {
	var ev = _a[i];
	
	var t = require([ev[0]],function(b) {
		b.run(ev[1]);
	});
}());
