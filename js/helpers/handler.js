define(['components/jquery'],

function($) {	
	return function (e, el) {

		var data = $(el).data();
		var c = data.action.split(',');
		
		for (var i in c) {
			(function() {
				var x = c[i].split('/');
				
				require([x[0]],function(a) {
					a[x[1]](el, data, e);
				});
				
			}());
		}
	};
});
