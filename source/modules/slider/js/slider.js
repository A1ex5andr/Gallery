angular.module('Slides', [])
    .controller('SliderCtrl', ['$scope', '$localstorage', 'resService', function ($scope, $localstorage, resService) {
        $scope.images = [ ];
        $scope.images = resService.query();


        //$localstorage.setObject('images', {
        //    images: $scope.images
        //});

        $scope.predicate = "id"; // default filtering
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
                    slides: '.slideBl',
                    timeout: 1000
                }, scope.$eval(attrs.slideshow));
                setTimeout(function () {
                    element.cycle(config);
                }, 250);
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
                    paused: true,
                    timeout: 500
                }, scope.$eval(attrs.slideshowpop));
                setTimeout(function () {
                    element.cycle(config);
                    //jQuery( window ).ready(function (){
                    //    if($( ".slideBl:visible")){
                    //        console.log('slideshowpop');
                    //    }
                    //});
                }, 250);
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
    .directive('slider', function ($compile, $localstorage) {
        return {
            restrict: "C",
            link: function ($scope, element, attrs) {
                setTimeout(function () {

                    $('#slideshow2').on('cycle-after', function () {
                        var target = $('#slideshow2 .cycle-slide-active').attr('id');
                        var imageId = target.split('_');
                            console.log(imageId[1]);
                        //console.log(scope.images.count);
                        var storedItem = $localstorage.get(1, 0);
                        //console.log(storedItem);
                    });

                    $('#slideshow2pop').on('cycle-after', function () {
                        var target = $('#slideshow2pop .cycle-slide-active').attr('id');
                        var imageId = target.split('_');
                            console.log(imageId[1]);
                        //console.log(scope.images.count);
                        var storedItem = $localstorage.get(1, 0);
                        //console.log(storedItem);
                    })

                }, 250);
            }
        };
    });