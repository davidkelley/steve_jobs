define(['components/jquery'],

function($) {	
	return {
		
		select: function(el, obj, e, open) {
			//prevent bubbling
			e.preventDefault();
			e.stopPropagation();
			
			if (!e.ctrlKey) {
				//remove all other selected elements
				$('.files li').each(function() {
					$(this).removeClass('selected');
				});
			}
			
			//add selected class to this element
			$(el).toggleClass('selected'); 
			
			return false;
		},
		
		key: function(e) {
			//keycode
			var key = e.keyCode;
			
			switch (key) {
				case 13:
					var that = this;
					var n = 0;
					$('.files li.selected').each(function() {
						if (!that.is_open($(this))) {
							var el = this;
							setTimeout(function()
							{
								that.open($(el),$(el).data());
							},(30*9)*n++);
						}
					});
					break;
				case 37:
				case 39:
					this.move(key, e);
					break;
			}
		},
		
		move: function(key, e) {
			//update direction
			var direction = key == 37 ? -1 : 1;
		
			//file selected?
			var file = $('.files li.selected');
			
			if (file.length > 0) {
				//get all files
				var files = $('.files li');
				
				var that = this;
				
				files.each(function(i) {
					if (this === file[file.length-1]) {
						if (i+direction >= 0 && i+direction <= files.length-1) {
							that.select.call(that, files[i+direction], $(files[i+direction]).data(), e, false);
						}
						return false;
					}
				});
			}
		},
		
		focus: function(el) {
			$('.notepad').each(function() {
				$(this).removeClass('selected');
				$(this).parent().removeClass('selected');
			});
			
			$(el).addClass('selected');
			$(el).parent().addClass('selected');
		},
		
		is_open: function(el) {
			var obj = $(el).data();
			
			if ($('#'+obj.notepad).parent().hasClass('container')) {
				return true;
			}
			
			return false;
		},
		
		open: function(el, obj) {
			
			//get notepad container for the icon
			var container = $('.notepad-container', $(el).closest('.window'));
			
			//is this notepad already open?
			if (!this.is_open(el)) {
				
				//get notepad for corresponding id
				var data = $('#'+obj.notepad);
				
				//create new container with offset
				var notepad = $('<div>',{class:'container'});
				
				//offsetting notepad because others displayed?
				var children = container.children();
				
				//append the container
				container.append(notepad);
				
				//append notepad to peek at width and height
				notepad.append(data);
				
				//get width and height of intended notepad
				var width = data.width();
				var height = data.height();
				
				//now remove it whilst animating
				data.remove();
				
				//adjust this notepad containers offset
				if (children.length > 0) {
					var last = children.last();
					
					notepad.css({
						top: 20*children.length,
						left: 20*children.length
					});
				}
				
				//animate scaling of window
				var i = 0;
				var that = this;
				var interval = setInterval(function() {
					
					notepad.addClass('sizing');
					
					var w = width/8;
					var h = height/8;

					i++;
					
					notepad.css({width:w*i, height:h*i});
					
					if (children.length == 0)
					{
						container.css({marginLeft:-(w*i)/2, marginTop:-(h*i)/2});
					}
					
					if (width==w*i && height==h*i) {
						//stop animating
						clearInterval(interval);
						
						//set sized to remove outer border
						notepad.toggleClass('sizing sized');
						
						//add data
						notepad.append(data);
						
						//focus this notepad file
						that.focus(data);
					}
					
				},30);
			} else {
				this.focus($('#'+obj.notepad));
			}
		},
		
		close: function(el) {
			var notepad = $(el).closest('.notepad');
			
			//check if parent is container?
			if (notepad.parent().hasClass('container')) {
				notepad.parent().remove();
			}
			
			$('.notepads').append(notepad);
			
		}
		
	};
});
