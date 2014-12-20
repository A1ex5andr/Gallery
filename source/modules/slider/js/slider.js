angular.module('Slides', [])
    .controller('SliderCtrl', ['$scope', '$localstorage', function ($scope, $localstorage) {
        $scope.images = [
            {"url": "img/slides/001.jpg", "rate": 5, "id": "01", "count": 111},
            {"url": "img/slides/002.jpg", "rate": 4, "id": "02", "count": 211},
            {"url": "img/slides/003.jpg", "rate": 5, "id": "03", "count": 1311},
            {"url": "img/slides/004.jpg", "rate": 1, "id": "04", "count": 1531},
            {"url": "img/slides/005.jpg", "rate": 2, "id": "05", "count": 3241},
            {"url": "img/slides/006.jpg", "rate": 4, "id": "06", "count": 11},
            {"url": "img/slides/007.jpg", "rate": 5, "id": "07", "count": 5331}
        ];
        $localstorage.setObject('images', {
            images: $scope.images
        });

        $scope.predicate = "id";
        $scope.rateFunction = function(rating) {
            console.log("Rating selected - " + rating);
        };

    }])
    .directive('popup', function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $("#popup").click(function(){
                    $("#slideshow2").cycle("pause");
                    $("#slideshow2pop").cycle("resume");
                    // init modal window w/o backdrop
                    $('#SlidePop').modal({
                        backdrop: 'static'
                    });
                })
            }
        }
    })
    .directive('closepopup', function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $("#closepop, .modal-backdrop").click(function () {
                    $("#slideshow2").cycle("resume");
                    $("#slideshow2pop").cycle("pause");
                });

            }
        }
    })
    .directive('slideshow', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var config = angular.extend({
                    slides: '.slideBl'
                }, scope.$eval(attrs.slideshow));
                setTimeout(function () {
                    element.cycle(config);

                        if($( ".slideBl:visible")){
                            console.log('slideshow');
                        }
                }, 0);
            }
        };
    })
    .directive('slideshowpop', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var config = angular.extend({
                    slides: '.slideBl',
                    random: true,
                    paused: true
                }, scope.$eval(attrs.slideshowpop));
                setTimeout(function () {
                    element.cycle(config);
                    jQuery( window ).ready(function (){
                        if($( ".slideBl:visible")){
                            console.log('slideshowpop');
                        }
                    });
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
    })
    .directive('slider', function () {
        return {
            restrict: "C",
            link: function (scope, element, attrs) {

                setTimeout(function () {
                    var slide = angular.element('.cycle-slide-active');
                    var target = $('.slider');
                    (function(){
                        console.log(target.find(slide).length);
                    }());
                }, 0);
            }
        }
    });