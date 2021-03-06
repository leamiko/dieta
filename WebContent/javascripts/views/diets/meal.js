define([
  'jquery',
  'underscore', 
  'backbone', 
  'models/nature',
  'collections/variations',
  'text!templates/diets/meal.html', 
], function($, _, Backbone, Nature, Variations, home) {
	return Backbone.View.extend({
		tagName: 'div',
		className: 'span2 action-nav-button',
		template: _.template(home),
		events: {
			'click span.label': 'remove',
			'click a':          'select'
		},
		initialize: function() {
			this.listenTo(this.model, 'all', function(){ this.$el.empty(); this.render(); } );
		},
		serialize: function() {
			return {"model": this.model};
		},
		render: function() {
			return this.$el.append(this.template(this.serialize()));
		},
		close: function() {
			this.$el.remove();
		},
		select: function() {
			$(this.el).toggleClass("selected");
		},
		remove: function(ev) {
			this.model.set({"nature": (new Nature()).toJSON(), "variations": []});
			
			this.model.trigger('changer');
			this.collection.trigger('remove');
		}
	});
});