app.service('initialData', function ($resource) {
    return $resource('slides.json');
});