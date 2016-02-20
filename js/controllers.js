angular.module('app.controllers', [])

.controller('loginCtrl', function($scope) {
	$scope.username = "USERNAME";
	$scope.password = "PASSWORD";
})

.controller('signupCtrl', function($scope) {
	$scope.username = "";
	$scope.password = "";
	$scope.location = "Philadelphia, PA";
	$scope.tel = "";
})

.controller('uploadCtrl', function($scope) {

})

.controller('dashboardUserCtrl', function($scope) {
	$scope.searchText = "";

	$scope.searchTextChanged = function () {

	};

	$scope.posts = [];
})

.controller('dashboardSponsorCtrl', function($scope) {

})

.controller('profileCtrl', function($scope) {
	$scope.name = "Phuc Ngo";

	$scope.posts = [
	{ "postID" : 1111, "userID" : 1234, "postName": "Rubic", "postContent": "Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube", "submissionTime": "02/20/2016 10:00:00", "attachment": "http://zoarchurch.co.uk/content/pages/uploaded_images/91.png" },
	{ "postID" : 1111, "userID" : 1234, "postName": "Orange", "postContent": "Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube", "submissionTime": "01/07/2016 10:00:00", "attachment": "http://www.clipartist.net/random/clipart-1046.png" },
	{ "postID" : 1111, "userID" : 1234, "postName": "Duck", "postContent": "Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube Rubic Cube", "submissionTime": "01/10/2015 10:00:00", "attachment": "http://www.colouringbook.org/random/colouringbook-860.png" }
	];

	$scope.numberOfPost = $scope.posts.length;
	$scope.points = $scope.numberOfPost * 10;
	$scope.rewards = Math.floor(($scope.numberOfPost + $scope.points) / 5);

	$scope.summary = [];
	$scope.timeAgo = [];

	var summarizePosts = function() {
		angular.forEach($scope.posts, function (post) {
			s = post.postContent.substr(0, 20) + "...";
			t = timeSince(post.submissionTime);
			
			$scope.summary.push(s);
			$scope.timeAgo.push(t);
		})
	}	

	function timeSince(submissionTime) {
		var date = Date.parse(submissionTime);

		var seconds = Math.floor((new Date() - date) / 1000);

		var interval = Math.floor(seconds / 31536000);

		if (interval > 1) {
			return interval + " years";
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return interval + " months";
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + " days";
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + " hours";
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + " minutes";
		}
		return Math.floor(seconds) + " seconds";
	}

	summarizePosts();

})

.controller('notificationCtrl', function($scope) {

})
