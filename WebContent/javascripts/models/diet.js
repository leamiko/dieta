define([
  'backbone',
  
  'collections/meals'
], function(Backbone, Meals) {
	"use strict";
	return Backbone.Model.extend({
		urlRoot: "diets",
		meals: function() {
			return new Meals(this.get('meals'));
		},
		patient: function() {
			var Patient = require('models/patient');
			return new Patient(this.get('patient'));
		},
		levelOfAssistance: function(){
			return this.get('levelOfAssistance');
		},
		weight:function() {
			return parseFloat(this.get('weight'));
		},
		height: function() {
			return parseFloat(this.get('height'));
		},
		companion: function(){
			return Boolean(this.get('companion'));
		},
		observation: function() {
			return this.get('observation');
		}
	});
});
