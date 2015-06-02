'use strict';

/**
 * @ngdoc function
 * @name igSearchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the igSearchApp
 */
angular.module('thinkfulSearchApp')
  .controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
    var self = this;
    self.clicked = false;
    self.validated = false;
    self.error = false;
    self.pics = [];
    self.links = [];

    self.submit = function() {
    	self.pics = [];
    	self.links = [];
    	self.clicked = true;
    	self.error = false;
    	self.success = false;
    	self.searchHold = self.search;

    	if ($scope.$$childHead.myForm.$valid) {
    		self.validated = true;
    	}

    	if (self.validated) {
    		var url = "https://api.instagram.com/v1/tags/" + self.search + 
    		"/media/recent";
    		// var url = "https://api.instagram.com/v1/users/20824486";
    		var request = {
    			callback: 'JSON_CALLBACK',
    			client_id: 'f27640a884fa4259a20d605f14a33594'
    		};

    		$http({
    			method: 'JSONP',
    			url: url,
    			params: request
    		})
    		.success(function(result) {
    			console.log(result);
    			self.success = true;
    			for (var i=0; i<result.data.length; i++) {
    				self.pics.push(result.data[i].images.thumbnail.url);
    				self.links.push(result.data[i].link);
    			}
    			self.clicked = false;
    			self.validated = false;
    		})
    		.error(function() {
    			self.error = true;
    			self.validated = false;
    		})
    		self.search = '';
    		
    	}
    }
  }]);

// ng-pattern="/^\S/" <-- why this doesn't work?