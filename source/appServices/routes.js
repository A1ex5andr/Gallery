app.config(function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");
    // States
    $stateProvider
        .state('index', {
            url: "/",
            views: {
                '': { templateUrl: 'layout/home.html' },
                'header@index': { templateUrl: 'layout/header.html' },
                'slider@index': { templateUrl: 'layout/slider.html'},
                'footer@index': { templateUrl: 'layout/footer.html' }
            }
        })
        .state('test', {
            url: "/test",
            views: {
                '': { templateUrl: 'layout/test.html'},
                'header@test': { templateUrl: 'layout/header.html' },
                'footer@test': { templateUrl: 'layout/footer.html' }
            }
        });
});