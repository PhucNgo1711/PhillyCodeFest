angular.module('app.services', [])

.factory('UserFactory', [function(){}])
.service('UserService', [function(){
    var userInfo = "";

return {
      setUser: function (name) {
          console.log('setting name: ' + name);
      userInfo = name;
    },
    get: function() {
      return userInfo;
    }
  };
}])
.factory('Camera', ['$q', function($q) {
 
  return {
    getPicture: function(options) {
      var q = $q.defer();
      
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      
      return q.promise;
    }
  }
}])

.factory('ApiFactory', [function(){}])
.service('ApiService', [function($http){
    
        var client = new WindowsAzure.MobileServiceClient("https://goodapp.azure-mobile.net/","hjPOhBdLJQKTtZuSlIDedWORUbDGdu53");
    
    return {
        getRecommendations: function ()
        {
            $http({
            method: 'POST',
            url: 'https://ussouthcentral.services.azureml.net/workspaces/c94ce30197f24f85a3a456f50009feb9/services/4c92a567ca03463b9a4fa27824e3d403/execute?api-version=2.0&details=true',
            headers:
            {
                "Authorization":"Bearer OBu+S8NnYi7mFq13cMrabeYcx+l9TQq4O+ArNBE+lbhO7MoBHXmkxMFOiZJ4WkzxK/ZXMqyuLCZm2xvXcxe8oA==",
                "Content-Length": 100,
                "Content-Type":"application/json",
                "Accept": "application/json"
            },
            data:
            {
            "Inputs": {
                "input1": {
                "ColumnNames": [
                    "userID",
                    "placeID",
                    "rating"
                ],
                "Values": [
                    [
                    "U1077",
                    "134983",
                    "9"
                    ]
                ]
                }
            },
            "GlobalParameters": {}
            }
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        },
        getTableData: function (table)
        {
            var data = [];
            var dataTable = client.getTable(table);
            var query = dataTable.read().done(function (results) {
                console.log(JSON.stringify(results));
                data = results;
            }, function (err) {
                console.log("Error: " + err);
            });
            return data;
        },
        addUser: function (username)
        {
            console.log('adding user: ' + username);

            client.getTable("users").insert({ username: username, drink_level: "social" })
            .done(function (result) {
            console.log('add result: ' + JSON.stringify(result));
                return result;
            }, function (err) {
            console.log("Error: " + err);
            });
            
            console.log('add complete');
        },
        getUser: function (username)
        {
            var users = [];
            console.log('getting user: ' + username);
            var usersTable = client.getTable('users');
            var query = usersTable.where({
                username: username
            }).read().done(function (results) {
                console.log(JSON.stringify(results));
                users = results;
                if (users.length <= 0)
                {
                    console.log('no user, adding');
                    console.log('adding user: ' + username);

                    client.getTable("users").insert({ username: username, drink_level: "social" })
                    .done(function (result) {
                    console.log('add result: ' + JSON.stringify(result));
                        users = result;
                    }, function (err) {
                    console.log("Error: " + err);
                    });
                    
                    console.log('add complete');
                    console.log('user added: ' + users);
                }
            }, function (err) {
                console.log("Error: " + err);
            });
            return users;
        }
    };
    
}]);