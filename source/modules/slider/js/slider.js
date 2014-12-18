angular.module('Slides', [])
    .controller('SliderCtrl', function ($scope, resService) {

        var slides = this;
        slides.data = [];
        slides.data  = resService.query();

        //$scope.save = function() {
        //    /*$http.post('path/to/server/file/to/save/json', $scope.languages).then(function(data) {
        //     $scope.msg = 'Data saved';
        //     });*/
        //    $scope.msg = 'Data sent: '+ JSON.stringify($scope.languages);
        //};

        $scope.rating = 5;
        $scope.rateFunction = function(rating) {
            console.log("Rating selected - " + rating);
        };

        //$scope.images = slides;
        //console.log(slides);
        $scope.images = [
                "img/slides/001.jpg",
                "img/slides/002.jpg",
                "img/slides/003.jpg",
                "img/slides/004.jpg",
                "img/slides/005.jpg",
                "img/slides/006.jpg",
                "img/slides/007.jpg"
        ];
    })
    .directive('slideshow', function () {
        return {
            restrict: 'AC',
            link: function (scope, element, attrs) {
                var config = angular.extend({
                    slides: '.slideBl'
                }, scope.$eval(attrs.slideshow));
                setTimeout(function () {
                    element.cycle(config);
                }, 0);
            }
        };
    })
    .directive("starRating", function() {
        return {
            restrict : "A",
            template : "<ul class='rating'>" +
            "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
            "    <i class='fa fa-star'></i>" + //&#9733
            "  </li>" +
            "</ul>",
            scope : {
                ratingValue : "=",
                max : "=",
                onRatingSelected : "&"
            },
            link : function(scope, elem, attrs) {
                var updateStars = function() {
                    scope.stars = [];
                    for ( var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled : i < scope.ratingValue
                        });
                    }
                };
                scope.toggle = function(index) {
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating : index + 1
                    });
                };
                scope.$watch("ratingValue", function(oldVal, newVal) {
                    if (newVal) { updateStars(); }
                });
            }
        };
    });