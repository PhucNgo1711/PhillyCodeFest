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
.service('ApiService', ['$q','$http',function($q, $http){
    
        var client = new WindowsAzure.MobileServiceClient("https://goodapp.azure-mobile.net/","hjPOhBdLJQKTtZuSlIDedWORUbDGdu53");
    
    return {
        getTableData: function (table)
        {
            var q = $q.defer();
            var dataTable = client.getTable(table);
            var query = dataTable.read().done(function (results) {
                console.log('table data returned');
                q.resolve(results);
            }, function (err) {
                console.log("Error: " + err);
            });
            return q.promise;
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