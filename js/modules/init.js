define(['helpers/binder', 'helpers/binds', 'windows', 'components/jquery'],

function(Binder, binds, windows, $) {

	$(document).keydown(function(e)
	{
		require(['file'], function(file) { 
			file.key(e);
		});
	});
	
	//setup windows
	windows.init();
		
	return new Binder(binds);
});
