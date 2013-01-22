define(["components/jquery"],

/**
 * This module is responsible for all bindings currently present within the application.
 */
function ($) {
	/**
	 * 
	 */
	return function Binder(events) {
		for (var event in events) {
			for (var action in events[event]) {
				for (var i in events[event][action]) {
					if (event != "window") {
						try {
							$(document).on(action, eval(event), events[event][action][i]);
						} catch (e) {
							$(document).on(action, event, events[event][action][i]);
						}
					} else {
						try {
							$(window)[action](events[event][action][i]);
						} catch (e) {}
					}
				}
			}
		}
	}
});
