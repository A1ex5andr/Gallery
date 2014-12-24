function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
angular.module('Slides', [])
    .controller('SliderCtrl', ['$scope', '$localstorage', 'initialData',
        function ($scope, $localstorage, initialData) {

            function resourseOk(data) {
                if ( typeof ($localstorage.get('data')) === "undefined" ){
                    $localstorage.setObject('data', data );
                }
                $scope.images = $localstorage.getObject('data');

                $scope.$watch('currentIndexMain',function(){
                    $scope.images.forEach(function(image){
                        image.visible = false;
                    });
                    $scope.images[$scope.currentIndexMain].visible = true;
                });

                $scope.$watch('currentIndexPop',function(){
                    $scope.images.forEach(function(image){
                        image.visiblePop = false;
                    });
                    $scope.images[$scope.currentIndexPop].visiblePop = true;
                });

            };

            function resourceErr(err){alert('request failed');};

            $scope.rateFunction = function(rating, index) {
                var storedData = $localstorage.getObject('data');
                storedData[index].rate = rating;
                $localstorage.setObject('data', storedData);
            };

            $scope.images = [];
            var data = initialData.query( resourseOk, resourceErr);
            $scope.predicate = "id"; // default filtering
        }
    ])
    .directive('slider', function ($timeout, $localstorage) {
        return {
            restrict: 'AE',
            link: function ($scope, elem, attrs) {

                $scope.currentIndexMain = 0;
                var timerMain;

                $scope.nextMain=function(){
                    $scope.counter($scope.currentIndexMain);
                    $scope.currentIndexMain<$scope.images.length-1?$scope.currentIndexMain++:$scope.currentIndexMain=0;
                };
                $scope.prevMain=function(){
                    $scope.counter($scope.currentIndexMain);
                    $scope.currentIndexMain>0?$scope.currentIndexMain--:$scope.currentIndexMain=$scope.images.length-1;
                };

                $scope.counter = function (index) {
                    var storedData = $localstorage.getObject('data');
                    storedData[index].count++;

                    $localstorage.setObject('data', storedData);
                    $scope.images[index].count = storedData[index].count;
                };

                var sliderFuncMain = function(){
                    timerMain=$timeout(function(){
                        $scope.nextMain();
                        timerMain=$timeout(sliderFuncMain,2000);
                    },3000);
                };
                sliderFuncMain();

                $scope.$on('$destroy',function(){
                    $timeout.cancel(timerMain);
                });
                angular.element(document.querySelectorAll('.arrow')).one('click',function(){
                    $timeout.cancel(timerMain);
                });
            }
        }
    })
    .directive('popup', function($timeout, $localstorage) {
        return {
            restrict: 'AE',
            link: function ($scope, element, attrs) {

                $scope.currentIndexPop = 1;
                var timerPop;

                $scope.next=function(){
                    $scope.counter($scope.currentIndexPop);
                    $scope.currentIndexPop = getRandomArbitrary(0, $scope.images.length - 1);
                };
                $scope.counter = function (index) {
                    var storedData = $localstorage.getObject('data');
                    storedData[index].count++;

                    $localstorage.setObject('data', storedData);
                    $scope.images[index].count = storedData[index].count;
                };

                var sliderFuncPop = function(){
                    timerPop=$timeout(function(){
                        $scope.next();
                        timerPop=$timeout(sliderFuncPop,1500);
                    },1500);
                };
                $scope.$on('$destroy',function(){
                    $timeout.cancel(timerPop);
                });

               $scope.openPop = function(){
                    angular.element('#SlidePop').modal({
                        backdrop: 'static'
                    });
                    sliderFuncPop();
                };
               $scope.closePop = function(){
                    $timeout.cancel(timerPop);
                };
            }
        }
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