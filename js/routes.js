angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

  
      
        
    .state('login', {
      url: '/pageLogin',
      templateUrl: 'templates/login.html'
    })
        
      
    
      
        
    .state('signup', {
      url: '/pageSignup',
      templateUrl: 'templates/signup.html'
    })
        
      
    
      
        
    .state('tabsController.upload', {
      url: '/pageUpload',
      views: {
        'tab7': {
          templateUrl: 'templates/upload.html'
        }
      }
    })
        
      
    
      
        
    .state('tabsController.dashboardUser', {
      url: '/pageUser',
      views: {
        'tab8': {
          templateUrl: 'templates/dashboardUser.html'
        }
      }
    })
        
      
    
      
        
    .state('tabsController.dashboardSponsor', {
      url: '/pageSponsor',
      views: {
        'tab8': {
          templateUrl: 'templates/dashboardSponsor.html'
        }
      }
    })
        
      
    
      
        
    .state('tabsController.profile', {
      url: '/pageProfile',
      views: {
        'tab9': {
          templateUrl: 'templates/profile.html'
        }
      }
    })
        
      
    
      
    .state('tabsController', {
      url: '/pageTab',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })
      
    
      
        
    .state('tabsController.notification', {
      url: '/pageNoti',
      views: {
        'tab11': {
          templateUrl: 'templates/notification.html'
        }
      }
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/pageLogin');
  

  

});