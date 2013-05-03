define([
  'jquery',
  'underscore', 
  'backbone', 
  'bootstrap', 
  'bWysihtml5',
  'models/diet',
  'models/meal',
  'models/patient',
  'models/period',
  'models/type',
  'collections/meals', 
  'views/diets/_foods',
  'views/diets/_meal',
  'views/diets/_natures',
  'views/diets/_nutrients',
  'text!templates/diets/new.html'
], function($, _, Backbone, Bootstrap, Wysihtml5, Diet, Meal, Patient, Period, Type, Meals, FoodsView, MealView, NaturesView, Nutrients, home) {
	var NewView = Backbone.View.extend({
		el: 'section#center',
		events: {
			"click #save":               "save",
			"click #cancel":             "cancel",
			"change #weight":            "weight",
			"change #height":            "height",
			"change #companion":         "companion",
			"change #levelOfAssistance": "levelOfAssistance",
			"change #observation":       "observation"
		},
		collection: new Meals(),
		render: function() {
			var interment = this.options.interment;
			var patient = interment.get('patient');
			var diets = patient.get('diets');
			var last = diets.first() || new Diet();
			var meals = last.get('meals');
			var that = this;
			
			this.model = new Diet(last.toJSON());
			this.model.set({"patient": patient});
			
			$(this.el).html(_.template(home, {"interment": interment, "foods": this.options.foods, "Diet": Diet, "Patient": Patient, "Period": Period, "Type": Type, "Meals": Meals}));
			_.forEach(Period.periods, function(hour, index) {
	  			var meal = meals.byHour(hour)[0];
	  			if(meal === undefined || meal.length === 0) {
	  				meal = new Meal({"dish": {"period": hour, "nature": {"description": ""}}});
	  			}

	  			var mealView = new MealView({model: meal, collection: that.collection});
	  			$(".meals-" + Math.round(index%3), this.el).append(mealView.render());
	  			that.collection.push(mealView);
  			});

			var naturesView = new NaturesView({el: "#natureTab", collection: this.options.natures, els: that.collection});
			naturesView.render();

			var foodsView = new FoodsView({collection: this.options.foods, els: that.collection});
			foodsView.render();
			
			var nutrients = new Nutrients({collection: that.collection});
			nutrients.render();
		},
		save: function() {
			this.model.save();
		},
		cancel: function() {
			Backbone.history.navigate('', true); 
		},
		weight: function(event) {
			var weight = parseFloat($("#weight").val());
			var height = parseFloat($("#height").val());
	
			this.model.set({"weight": weight});
			
			if(weight != undefined && height != undefined) {
				var v = (weight / (height * height)).toFixed(2);
				$('#value-imc').text(v);
			}
		},
		height: function(event) {
			var weight = parseFloat($("#weight").val());
			var height = parseFloat($("#height").val());
			
			this.model.set({"height": height});
			
			if(weight != undefined && height != undefined) {
				var v = (weight / (height * height)).toFixed(2);
				$('#value-imc').text(v);
			}
		},
		companion: function(event) {
			this.model.set({"companion": $(event.target).val()});
		},
		levelOfAssistance: function(event) {
			this.model.set({"levelOfAssistance": $(event.target).val()});
		},
		observation: function(event) {
			this.model.set({"observation": $(event.target).val()});
		}
	});

	var initialize = function(options) {
		var newView = new NewView(options);
		newView.render();
	};

	return {
		initialize : initialize
	};
});