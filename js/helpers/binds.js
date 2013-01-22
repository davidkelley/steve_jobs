define(function()
{
	return {
		
		window: {
			scroll: [
				function()
				{
					var that = this;
					require(['components/jquery'], function($) { 
						$('.files li').each(function() {
							if ($(that).scrollTop() == $(document).height()-$(window).height()) {
								$('footer').addClass('f-open');
							} else {
								$('footer').removeClass('f-open');
							}
						});
					});
				}
			],
			
			mousemove: [
				function(e) {
					require(['components/jquery', 'windows'], function($, windows) { 
						var moving = $('.moving');
						if (moving.length > 0) {
							windows.move($('.moving')[0], $($('.moving')[0]).data(), e); 
						}
						
					});
				}
			],
		},
		
		'.windows': {
			click: [
				function(e) {
					if (!e.ctrlKey) {
						require(['components/jquery'], function($) { 
							$('.files li').each(function() {
								$(this).removeClass('selected');
							});
						});
					}
				}
			]
		},
		
		'a.scroll-to': {
			click: [
				function(e) {
					e.preventDefault();
					
					var that = this;
					
					require(['components/jquery'], function($) { 
						//get hash of href value
						var hash = $(that).attr('href').substring(1);
						
						//get anchor element
						var anchor = $('a[name="'+hash+'"]');
						
						//exists?
						if (anchor.length > 0) {
							//get top offset of anchor
							var top = $(anchor[0]).offset().top;
							
							//adjust to center in window
							top -= $(window).height() / 4;
							
							//animate the window to it
							$('html,body').animate({scrollTop: top}, 1000);
						}
					});
					
				}
			]
		},
		
		'footer p': {
			click: [
				function(e) {
					require(['components/jquery'], function($) { 
						$('footer').toggleClass('open');
					});
				}
			]
		},
		
		'.notepad h3': {
			mousedown: [
				function(e) {
					var el = this;
					require(['components/jquery', 'windows', 'file'], function($, windows, file) { 
						file.focus($(el).closest('.notepad'));
						windows.down($(el).closest('.container'), $(el).data(), e); 
					});
				}
			],
			
			click: [
				function() {
					var that = this;
					require(['file', 'components/jquery'], function(file, $) { 
						var notepad = $(that).closest('.notepad');
						file.focus(notepad);
					});
				}
			]
		},
		
		'.alert button': {
			click: [
				function(e) {
					e.preventDefault();
					
					require(['components/jquery'], function($) { 
						$('.alert').removeClass('visible');
					});
				}
			]
		},
		
		'.window-close': {
			click: [
				function(e) {
					console.log("here");
					require(['components/jquery'], function($) { 
						$('.alert').addClass('visible');
					});
				}
			]
		},
		
				
		'[data-event="click"]': {
			click: [
				function(e) {
					var el = this;
					require(['helpers/handler'], function(handler) { 
						handler(e, el); 
					});
				}
			],
		},
		
		'.notepad': {
			mouseup: [
				function(e) {
					var el = this;
					require(['components/jquery', 'windows'], function($, windows) { 
						if ($(el).parent().hasClass('moving')) {
							windows.up($(el).parent(), $(el).data(), e); 
						}
					});
				}
			]
		},
		
		'.files li': {
			dblclick: [
				function() {
					var that = this;
					require(['components/jquery', 'file'], function($, file) { 
						file.open(that, $(that).data());
					});
				}
			]
		}
	}
});
