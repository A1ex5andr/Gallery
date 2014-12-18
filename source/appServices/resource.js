app.service('resService', function ($resource) {
    return $resource('slides.json');
});