angular.module('Authentication', []).controller('LoginCtrl', ['$scope', '$localstorage', 'AuthService', '$location',
        function($scope, $localstorage, AuthService, $location) {
            $scope.username = '';
            $scope.password = '';
            var self = this;

            var userIdentity = $localstorage.getObject('userIdentity');
            if (userIdentity) {
                $scope.username = userIdentity.username;
            }

            this.logUser = function(username, password) {
                $scope.dataLoading = true;
                AuthService.login(username, password, self.onLoginSuccess, self.onError);
            };

            this.onLoginSuccess = function(response) {
                AuthService.setLoggedIn(true);
                $localstorage.setObject('userIdentity', {
                    userId: response.id,
                    username: $scope.username,
                    token: response.token
                });
                $scope.dataLoading = false;
                console.log("saved local storage: " + JSON.stringify($localstorage.getObject('userIdentity')));
                alert("Hello, " + response.name + "\nId: " + response.id + "\nToken: " + response.token);
                $location.path('/home');
            };

            this.onError = function(error) {
                $scope.dataLoading = false;
                console.error(JSON.stringify(error));
                if (error.data) { alert("Login failed: " + error.data.errorMessage); }
            };
    }]);


// initialise the currentUser global variable from a cookie to
// keep the user logged in between page reloads,
// it also contains and an event handler to check
// if the user is logged in before each route change
//app.run(['$rootScope', '$location', '$cookieStore', '$http',
//    function ($rootScope, $location, $cookieStore, $http) {
//        // keep user logged in after page refresh
//        $rootScope.globals = $cookieStore.get('globals') || {};
//        if ($rootScope.globals.currentUser) {
//            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//        }
//        $rootScope.$on('$locationChangeStart', function (event, next, current) {
//            // redirect to login page if not logged in
//            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
//                $location.path('/');
//            }
//        });
//    }]);