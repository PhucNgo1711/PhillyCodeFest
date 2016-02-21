angular.module('app.controllers', [])

.controller('loginCtrl', function($scope, ApiService) {
	$scope.username = "USERNAME";
	$scope.password = "PASSWORD";
   
   //console.log('login controller');
   //load(); //do not run
   //function load()
   /*
{
    var client = new WindowsAzure.MobileServiceClient("https://goodapp.azure-mobile.net/","hjPOhBdLJQKTtZuSlIDedWORUbDGdu53");
    
    getUserData().forEach(function(data) {
        
        
            client.getTable("users").insert( data )
            .done(function (result) {
            console.log('add result: ' + JSON.stringify(result));
                return result;
            }, function (err) {
            console.log("Error: " + err);
            });
            
            console.log('add complete');
    })    
    
}*/

})

.controller('signupCtrl', function($scope) {
	$scope.username = "";
	$scope.password = "";
	$scope.location = "Philadelphia, PA";
	$scope.tel = "";
})

.controller('uploadCtrl', function($scope, UserService) {
    
    $scope.username = UserService.get();
	$scope.postTitle = "";

	$scope.ops = [ 
		{ option: "Report" }, 
		{ option: "Support" }, 
		{ option: "Learn" } 
	] ;

	$scope.details = [ 
		{ info: "Pothole" }, 
		{ info: "Streetlight" }, 
		{ info: "Law and Order" },
		{ info: "Emergency 911"}
	] ;

	$scope.optionType = $scope.ops[0];
	$scope.detail = $scope.details[0];

	$scope.postContent = "Some Text Here";

	$scope.optionChanged = function() {
    	$scope.details = [ 
		{ info: "Pet Adopting" }, 
		{ info: "Hosp Volunteer" }, 
		{ info: "Youth Mentoring" }
		] ;

		$scope.detail = $scope.details[0];
   };

	$scope.getPhoto = function() {
    	console.log('Getting camera');
    	Camera.getPicture({
	      quality: 75,
	      targetWidth: 320,
	      targetHeight: 320,
	      saveToPhotoAlbum: false
    	}).then(function(imageURI) {
      	console.log(imageURI);
      	$scope.lastPhoto = imageURI;
    	}, function(err) {
      console.err(err);
    	});
  	}

  	$scope.submit = function() {

  	}
})

.controller('dashboardUserCtrl', function($scope, $stateParams, UserService, ApiService) {
	// $scope.username

	$scope.searchText = "";
    console.log('dashboard: ' + $stateParams.username);
    
    UserService.setUser($stateParams.username);
    $scope.username = UserService.get();
    
    var user = ApiService.getUser($stateParams.username);
    console.log('user: ' + user);
    
    if (user.length <= 0)
    {
        console.log('no user!');
    }
    
	$scope.searchTextChanged = function () {

	};

	$scope.posts = [
		{ "postID" : 1111, "userID" : 1234, "userName": "Phuc", "postTitle": "Foot", "postContent": "FootFoot Long String", "status": "Pending", "submissionTime": "02/20/2016 16:00:00", "attachment": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR-aYo5n3v2kW4MR3YD9E7sn77ljMJdr5fRVc-RSyU9nbF1tK9s" },
		{ "postID" : 1111, "userID" : 1234, "userName": "Shaw", "postTitle": "Mouse", "postContent": "Mouse Long String", "status": "Solved", "submissionTime": "02/19/2016 10:00:00", "attachment": "http://www.colouringbook.org/random/colouringbook-1483.png" },
		{ "postID" : 1111, "userID" : 1234, "userName": "Tess", "postTitle": "Rubic", "postContent": "Rubic Cube Long String", "status": "Pending", "submissionTime": "01/19/2016 10:00:00", "attachment": "http://zoarchurch.co.uk/content/pages/uploaded_images/91.png" },
		{ "postID" : 1111, "userID" : 1234, "userName": "Vamsi", "postTitle": "Orange", "postContent": "Orange Long String", "status": "Solved", "submissionTime": "12/07/2015 10:00:00", "attachment": "http://www.clipartist.net/random/clipart-1046.png" },
		{ "postID" : 1111, "userID" : 1234, "userName": "Tess", "postTitle": "Duck", "postContent": "Duck Long String", "status": "Pending", "submissionTime": "01/10/2015 10:00:00", "attachment": "http://www.colouringbook.org/random/colouringbook-860.png" }
	];

	$scope.summary = [];
	$scope.timeAgo = [];

	var summarizePosts = function() {
		angular.forEach($scope.posts, function (post) {
			s = post.postContent.substr(0, 20);

			if (s.length >= 20) {
				s += "...";
			}

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
	};

	summarizePosts();
})

.controller('dashboardSponsorCtrl', function($scope) {
	
})

.controller('profileCtrl', function($scope, UserService) {
	$scope.username = UserService.get();
    $scope.name = UserService.get();

	$scope.posts = [
		{ "postID" : 1111, "userID" : 1234, "userName": "Phuc", "postTitle": "Rubic", "postContent": "Rubic Cube Long String", "status": "Pending", "submissionTime": "02/20/2016 10:00:00", "attachment": "http://zoarchurch.co.uk/content/pages/uploaded_images/91.png" },
		{ "postID" : 1111, "userID" : 1234, "userName": "Phuc", "postTitle": "Orange", "postContent": "Orange Long String", "status": "Solved", "submissionTime": "01/07/2016 10:00:00", "attachment": "http://www.clipartist.net/random/clipart-1046.png" },
		{ "postID" : 1111, "userID" : 1234, "userName": "Phuc", "postTitle": "Duck", "postContent": "DuckDuck Looong String", "status": "Solved", "submissionTime": "01/10/2015 10:00:00", "attachment": "http://www.colouringbook.org/random/colouringbook-860.png" }
	];

	$scope.numberOfPost = $scope.posts.length;
	$scope.points = $scope.numberOfPost * 10;
	$scope.rewards = Math.floor(($scope.numberOfPost + $scope.points) / 5);

	$scope.summary = [];
	$scope.timeAgo = [];

	var summarizePosts = function() {
		angular.forEach($scope.posts, function (post) {
			s = post.postContent.substr(0, 20);

			if (s.length >= 20) {
				s += "...";
			}

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

	$scope.martial = [ 
		{ info: "Single" }, 
		{ info: "Married" } 
	] ;

	$scope.kids = [ 
		{ info: "1" }, 
		{ info: "2" }, 
		{ info: "3" },
		{ info: "4"}
	] ;

	$scope.social = [ 
		{ info: "Sport" }, 
		{ info: "Alcohol" }, 
		{ info: "Hang Out" }
	] ;

	$scope.martialStatus = $scope.martial[0];
	$scope.kid = $scope.kids[0];
	$scope.socialPref = $scope.social[0];

})

.controller('notificationCtrl', function($scope, $http, UserService, ApiService, $timeout) {
    $scope.actions = ApiService.getTableData('actions');
    console.log($scope.actions);
    $scope.username = UserService.get();
    

    console.log('actions: ' + $scope.actions);
    console.log('calling recs with ' + $scope.username);
    $http({
            method: 'GET',
            url: 'http://azuremlwrapper20160221122259.azurewebsites.net/api/machine/' + $scope.username,
            headers:
            {
                "Content-Type":"application/json",
                "Accept": "application/json"
            }
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.recs = response.data;
                console.log('got rec data');
                console.log($scope.recs);
               
                console.log('loop ' + $scope.actions + ' ' + $scope.recs.Rec1)
                $scope.info = [];
                $scope.actions.then(function(acts)
                {
                    console.log('actions done');
                    acts.forEach(function(act) { 
                    
                    console.log('looking for match for ' + act.actionID);
                    if (act.actionID == $scope.recs.Rec5)
                    {
                        console.log('match for '+ act.actionID);
                        $scope.info.push(act);
                    }
                    if (act.actionID == $scope.recs.Rec1)
                    {
                        $scope.info.push(act);
                    }
                    if (act.actionID == $scope.recs.Rec2)
                    {
                        $scope.info.push(act);
                    }
                    if (act.actionID == $scope.recs.Rec3)
                    {
                        $scope.info.push(act);
                    }
                    if (act.actionID == $scope.recs.Rec4)
                    {
                        $scope.info.push(act);
                    }
                     
                     });
                     console.log('info ' + $scope.info);
                })}
            , function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    console.log($scope.recs);
    console.log('called recs');
    
	$scope.notifications = [
		{ "postID" : 1111, "userID" : 1234, "userName": "Joseph", "notiContent": "Joseph solved your report", "submissionTime": "02/20/2016 10:00:00" },
		{ "postID" : 1111, "userID" : 1234, "userName": "Joe", "notiContent": "Joe commented on your post", "submissionTime": "01/07/2016 10:00:00" },
		{ "postID" : 1111, "userID" : 1234, "userName": "Joey", "notiContent": "Joey marked your post as duplicate", "submissionTime": "01/10/2015 10:00:00" }
	];

	$scope.summary = [];
	$scope.timeAgo = [];

	var summarizePosts = function() {
		angular.forEach($scope.notifications, function (noti) {
			s = noti.notiContent;

			t = timeSince(noti.submissionTime);
			
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
