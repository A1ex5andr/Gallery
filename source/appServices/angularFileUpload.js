app.controller('CtrlUpload', ['$scope', 'fileUpload', function($scope, fileUpload){

    $scope.uploadFile = function() {
        var file = $scope.myFile;
        var uploadUrl = "/upload.php";
        fileUpload.uploadFileToUrl(file, uploadUrl, $scope);
    };

}]);

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.service('fileUpload', ['$http',
    function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl, $scope){
            var fd = new FormData();
            fd.append('file', file);


            $http.post(uploadUrl, fd,
                {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }
            )
            .success(function(response){
                var data = JSON.parse(window.localStorage['data']);
                response.id = data.length;
                data[data.length] = response;
                window.localStorage['data'] = JSON.stringify(data);
                $scope.images[$scope.images.length] = response;
            })
            .error(function(){
                console.log('bad request');
            });
        }
    }
]);