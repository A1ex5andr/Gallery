app.service('resService', function ($resource) {
    return $resource('slides.json');
    //return $resource('http://ayarilchenko.in.ua/upload.php');
});