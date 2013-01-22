define(['components/jquery', 'module'],

function($, module) {	
	return {
		
		init: function() {
			
			//count items in each window
			$('.window').each(function() {
				//get number of files
				var files = $('.files li', this).length;
				
				//set number of files
				$('.folder-items', this).text(files + ' items');
			});
			
			//get disk size in bytes
			var size = module.config().disksize;
			
			//convert to kb and set
			$('.disk-space').text(Math.floor(size/1024) + 'k in disk');
			
			//get length of all text
			var length = 0;
			
			$('.notepad').each(function() {
				length += 12; //+ file header info
				length += $(this).text().length;
			});
			
			var available = Math.floor((size-length)/1024);
			
			$('.disk-available').text(available + 'k available');
		},
		
		down: function(el, obj, e) {
			$(el).data({position: {x: e.pageX, y: e.pageY}});
			$(el).addClass('moving');
			$('html').addClass('notepad-moving');
		},
		
		move: function(el, obj, e) {
			
			var pos = $(el).data('position') || false;
			
			if (pos) {
				
				var x = e.pageX;
				var y = e.pageY;
				
				var top = parseInt($(el).css('top'));
				top = isNaN(top) ? 0 : top;
				
				var left = parseInt($(el).css('left'));
				left = isNaN(left) ? 0 : left;
				
				var width = $(el).width();

				$(el).css({top: top+(y-pos.y), left: left+(x-pos.x)});
				$(el).data({position: {x: x, y: y}});
			}
		},
		
		up: function(el, obj, e) {
			$(el).removeData('position');
			$(el).removeClass('moving');
			$('html').removeClass('notepad-moving');
		}
		
	};
});
