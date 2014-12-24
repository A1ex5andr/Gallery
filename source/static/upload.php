<?php
header('Access-Control-Allow-Origin: *');
$json = [
    ["url" => "img/slides/001.jpg", "rate" => 5, "id" => 0, "count" => 1],
    ["url" => "img/slides/002.jpg", "rate" => 4, "id" => 1, "count" => 1],
    ["url" => "img/slides/003.jpg", "rate" => 5, "id" => 2, "count" => 1],
    ["url" => "img/slides/004.jpg", "rate" => 1, "id" => 3, "count" => 1],
    ["url" => "img/slides/005.jpg", "rate" => 2, "id" => 4, "count" => 1],
    ["url" => "img/slides/006.jpg", "rate" => 4, "id" => 5, "count" => 1],
    ["url" => "img/slides/007.jpg", "rate" => 5, "id" => 6, "count" => 1],
];
if (isset($_FILES['file'])) {
    $errors        = [];
    $file_name     = $_FILES['file']['name'];
    $md5_file_name = md5(time() . $file_name);
    $file_size     = $_FILES['file']['size'];
    $file_tmp      = $_FILES['file']['tmp_name'];
    $file_type     = $_FILES['file']['type'];
    $file_ext      = strtolower(end(explode('.', $_FILES['file']['name'])));
    if (move_uploaded_file($file_tmp, "images/" . $md5_file_name . "." . $file_ext)) {
        $files_list = scandir("./images");
        unset($files_list[0], $files_list[1]);
        $id = count($files_list) + 6;
        die(json_encode([
                            'url'   => '/images/' . $md5_file_name . "." . $file_ext,
                            'rate'  => 3,
                            'id'    => $id,
                            'count' => 0
                        ]));
    } else {
        die(json_encode([]));
    }
} else {
    die(json_encode($json));
}