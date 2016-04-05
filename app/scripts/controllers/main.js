'use strict';

/**
 * @ngdoc function
 * @name barcelandoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the barcelandoApp
 */
angular.module('barcelandoApp')
	.controller('MainCtrl', function($scope, facebookService, $window) {
		$scope.openLink = function(link) {
			$window.open(link, "_blank");
		};
		$scope.events = [];
		var e = $scope.events;
		var limit = 5;
		var maxcalls = 0;
		var morelink = null;
		function getUrlVars(url) {
		    var hash;
		    var myJson = {};
		    var hashes = url.slice(url.indexOf('?') + 1).split('&');
		    for (var i = 0; i < hashes.length; i++) {
		        hash = hashes[i].split('=');
		        myJson[hash[0]] = hash[1];
		    }
		    return myJson;
		}
		function loadMore(params) {
			params = params || { limit: limit, fields: 'full_picture,object_id,type,caption,message,name,link'} ;
			$scope.loading = true;
			morelink = null;
			facebookService.callApi("/Barcelonapor4euros/feed/", params).then(function(response) {
				if ( response.paging && response.paging.next){
					morelink = response.paging.next;
				}

				for (var i = 0; i < response.data.length; i++) {
					e.push(response.data[i]);
				}
				$scope.loading = false;


			}, function(error){ window.alert(error); });
		}
		$scope.loadMoreInfinite = function(){
			if($scope.loading || !morelink || maxcalls > 50){
				return;
			}
			maxcalls ++;
			loadMore(getUrlVars(morelink));
			//console.log(morelink.split('?')[1]);
		};

		loadMore();

	})
.controller('PhotoCtrl', function($scope, facebookService) {
	var id = $scope.$parent.$parent.e.object_id;
	facebookService.callApi("/"+id+"/", {fields: 'images'}).then(
		function(response){
			console.log(response);
		}
	);

})
.controller('EventCtrl', function($scope, facebookService) {
	var id = $scope.$parent.$parent.e.object_id;
	var m = window.moment;
	//moment('2015-07-10T20:00:00+0200').format('dddd MMMM Do YYYY, h:mm:ss a')
	facebookService.callApi("/"+id+"/", {fields: 'cover,start_time, place,timezone'}).then(
     function(response){
     		response.start_time =  m(response.start_time).format('dddd MMMM Do YYYY, h:mm a');
			$scope.edetails = response;
		}
	);
})


;
