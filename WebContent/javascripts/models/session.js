define([ 
  'jquery',
  'underscore', 
  'backbone'
], function($, _, Backbone) {
	var SessionModel = Backbone.Model.extend({
		urlRoot: 'user?_format=json',
		initialize: function() {
			var that = this;
			// Hook into jquery
			// Use withCredentials to send the server cookies
			// The server must allow this through response headers
			$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
				options.xhrFields = {
					withCredentials : true
				};
			});
		},
		login: function(creds, callback) {
			// Do a POST to /session and send the serialized form creds
			var that = this;
			$.post('j_spring_security_check', creds).success(function(data) {
				that.clear().set(that.defaults);
				that.getAuth(callback);
			});
		},
		logout: function() {
			// Do a DELETE to /session and clear the clientside data
		},
		getAuth: function(success, error) {
			// getAuth is wrapped around our router
			// before we start any routers let us see if the user is valid
			this.fetch({
				"success": success,
				"error": error
			});
		}
	});
	
	return new SessionModel();
});