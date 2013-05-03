define([
  'models/type'
], function(Type) {
	"use strict";
	var Period = {
		periodsByType: [[8, 10, 12, 15, 18, 21],
		          [8, 10, 12, 15, 18, 21],
		          [0, 2, 3, 5, 8, 9, 11, 12, 14, 15, 17, 18, 20, 21, 23]],
		periods: [12, 14, 15, 17, 18, 20, 21, 23, 0, 2, 3, 5, 8, 9, 10, 11]
	};
	
	return Period;
});