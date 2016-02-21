angular.module('app.controllers', [])

.controller('loginCtrl', function($scope, ApiService) {
	$scope.username = "USERNAME";
	$scope.password = "PASSWORD";

})

.controller('signupCtrl', function($scope) {
	$scope.username = "";
	$scope.password = "";
	$scope.location = "Philadelphia, PA";
	$scope.tel = "";
})

.controller('exploreCtrl', function($scope, $http) {
    
    console.log('adding categories');
    $scope.categories = [];
    $scope.categories.push({category:'Select a Category'});
    $scope.categories.push({category:'Candidates'});
    $scope.categories.push({category:'Youth Activities'});
    
    $scope.optionCategoryChanged = function() 
    {
        console.log('category changed' + $scope.categories);
        $scope.getActivities();
    }
    
    $scope.setActivities = function() {
        $scope.candidates = [];
        $scope.getActivities();
    };
    
    $scope.setCandidates = function() {
        $scope.activities = [];
        $scope.getCandidates();
    };
    
    $scope.getActivities = function() {
    $http({
            method: 'GET',
            url: 'https://data.phila.gov/resource/66tr-i72h.json',
            headers:
            {
                "Content-Type":"application/json",
                "Accept": "application/json"
            }
            }).then(function successCallback(response) {
                $scope.activities = response.data;
                }
            , function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };
    
    
        $scope.getCandidates = function() {
    $http({
            method: 'GET',
            url: 'https://data.phila.gov/resource/kbkg-6jxf.json',
            headers:
            {
                "Content-Type":"application/json",
                "Accept": "application/json"
            }
            }).then(function successCallback(response) {
                $scope.candidates = response.data;
                }
            , function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };
    
    
})
.controller('uploadCtrl', function($scope, UserService) { 
   $scope.username = UserService.get();
   $scope.name = UserService.get();

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

	$scope.rating = 50;

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
   $scope.name = UserService.get();  

    var user = ApiService.getUser($stateParams.username);
    console.log('user: ' + user);
    
    if (user.length <= 0)
    {
        console.log('no user!');
    }
    
	$scope.searchTextChanged = function () {

	};

	$scope.posts = [
		{ "postID" : 1111, "userID" : 1234, "userName": "Phuc", "postTitle": "Jury Duty", "postContent": "Participated in Jury Duty for 7 days and it went well, I'm glad I didn't get out of it.", "status": "Solved", "submissionTime": "02/20/2016 16:00:00", "attachment": "http://image005.flaticon.com/8/svg/8/8684.svg" },
		{ "postID" : 1111, "userID" : 1234, "userName": "Shaw", "postTitle": "Hosp Volunteer", "postContent": "Volunteered at the hospital working with Dr. Cox. I will definitely do this again in the future, it was a very rewarding experience.", "status": "Pending", "submissionTime": "02/19/2016 10:00:00", "attachment": "http://image005.flaticon.com/1/svg/109/109976.svg" },
		{ "postID" : 1111, "userID" : 1234, "userName": "Tessmichi", "postTitle": "Mentor Youths", "postContent": "Aided youths by mentoring in computer science at Great Valley High School.", "status": "Solved", "submissionTime": "01/19/2016 10:00:00", "attachment": "http://image005.flaticon.com/8/svg/10/10009.svg" },
		{ "postID" : 1111, "userID" : 1234, "userName": "Vamsi", "postTitle": "Pothole", "postContent": "Found a pothole and it even had a puddle in it! Hope this gets fixed soon.", "status": "Pending", "submissionTime": "12/07/2015 10:00:00", "attachment": "http://image005.flaticon.com/1/svg/32/32270.svg" },
		{ "postID" : 1111, "userID" : 1234, "userName": "Tessmichi", "postTitle": "Adopt a pet", "postContent": "Adopted the most adorable kitten ever, and I had a great time working with the people at PAWS.", "status": "Solved", "submissionTime": "01/10/2015 10:00:00", "attachment": "http://image005.flaticon.com/1/svg/66/66364.svg" }
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
		{ "postID" : 1111, "userID" : 1234, "userName": "Phuc", "postTitle": "Jury Duty", "postContent": "Participated in Jury Duty for 7 days and it went well, I'm glad I didn't get out of it.", "status": "Solved", "submissionTime": "02/20/2016 16:00:00", "attachment": "http://image005.flaticon.com/8/svg/8/8684.svg" },
		{ "postID" : 1111, "userID" : 1234, "userName": "Shaw", "postTitle": "Hosp Volunteer", "postContent": "Volunteered at the hospital working with Dr. Cox. I will definitely do this again in the future, it was a very rewarding experience.", "status": "Pending", "submissionTime": "02/19/2016 10:00:00", "attachment": "http://image005.flaticon.com/1/svg/109/109976.svg" },
		{ "postID" : 1111, "userID" : 1234, "userName": "Tessmichi", "postTitle": "Mentor Youths", "postContent": "Aided youths by mentoring in computer science at Great Valley High School.", "status": "Solved", "submissionTime": "01/19/2016 10:00:00", "attachment": "http://image005.flaticon.com/8/svg/10/10009.svg" },
		{ "postID" : 1111, "userID" : 1234, "userName": "Vamsi", "postTitle": "Pothole", "postContent": "Found a pothole and it even had a puddle in it! Hope this gets fixed soon.", "status": "Pending", "submissionTime": "12/07/2015 10:00:00", "attachment": "http://image005.flaticon.com/1/svg/32/32270.svg" },
		{ "postID" : 1111, "userID" : 1234, "userName": "Tessmichi", "postTitle": "Adopt a pet", "postContent": "Adopted the most adorable kitten ever, and I had a great time working with the people at PAWS.", "status": "Solved", "submissionTime": "01/10/2015 10:00:00", "attachment": "http://image005.flaticon.com/1/svg/66/66364.svg" }
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
		{ "postID" : 1111, "userID" : 1234, "userName": "Amy", "postTitle": "Rubic Title", "notiContent": "Amy solved your report", "postContent": "Rubik's Cube is a 3-D combination puzzle invented in 1974[1][2] by Hungarian sculptor and professor of architecture Ernő Rubik. Originally called the Magic Cube,[3] the puzzle was licensed by Rubik to be sold by Ideal Toy Corp.","rating": 80, "status": "Pending", "submissionTime": "02/20/2016 10:00:00", "attachment": "http://zoarchurch.co.uk/content/pages/uploaded_images/91.png" },
		{ "postID" : 1111, "userID" : 1234, "userName": "Mark", "postTitle": "Rubic Title", "notiContent": "Mark commented on your post", "postContent": "Rubik's Cube is a 3-D combination puzzle invented in 1974[1][2] by Hungarian sculptor and professor of architecture Ernő Rubik. Originally called the Magic Cube,[3] the puzzle was licensed by Rubik to be sold by Ideal Toy Corp.","rating": 30, "status": "Pending", "submissionTime": "01/07/2016 10:00:00", "attachment": "http://zoarchurch.co.uk/content/pages/uploaded_images/91.png" },
		{ "postID" : 1111, "userID" : 1234, "userName": "Joey", "postTitle": "Rubic Title", "notiContent": "Joey marked your post as duplicate", "postContent": "Rubik's Cube is a 3-D combination puzzle invented in 1974[1][2] by Hungarian sculptor and professor of architecture Ernő Rubik. Originally called the Magic Cube,[3] the puzzle was licensed by Rubik to be sold by Ideal Toy Corp.","rating": 49, "status": "Pending", "submissionTime": "01/10/2015 10:00:00", "attachment": "http://zoarchurch.co.uk/content/pages/uploaded_images/91.png" }
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

.controller('postCtrl', function($scope, $stateParams) {
   $scope.username = $stateParams.username;

	$scope.postID = $stateParams.postID;
	$scope.userName = $stateParams.userName;
	$scope.postTitle = $stateParams.postTitle;
	$scope.postContent = $stateParams.postContent;
	$scope.status = $stateParams.status;
	$scope.rating = $stateParams.rating;

	$scope.changeStatus = function() {
		$scope.status = "Solved";
	}

	$scope.markDuplicate = function() {
		$scope.postTitle = $scope.postTitle + " [Duplicate]";
	}

	$scope.numberOfPost = 10;
	$scope.points = $scope.numberOfPost * 10;
	$scope.rewards = Math.floor(($scope.numberOfPost + $scope.points) / 5);

	$scope.comment = "abc";
	$scope.comments = [ 
		{ "username": "Ann", content: "I dont' think Shaw wants to help.", "submissionTime": "02/20/2016 10:00:00" }, 
		{ "username": "Tess", content: "Shaw would be willing to help.", "submissionTime": "02/20/2016 08:00:00" }, 
		{ "username": "Phuc", content: "Oh I live right by the corner.", "submissionTime": "02/20/2016 05:00:00" },
		{ "username": "Vamsi", content: "Okay I can take a look at this.", "submissionTime": "02/20/2016 01:00:00" }
	] ;

	$scope.addComment = function() {
		$scope.comments.push($scope.comment);
	}

	$scope.timeAgo = [];

	var summarizePosts = function() {
		angular.forEach($scope.comments, function (cm) {
			t = timeSince(cm.submissionTime);
			
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
