var app = angular.module("projectApp.admin", ["ngRoute", "anyname"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/admin", {
        templateUrl: "./js/views/admin/admin.html",
        controller: "adminController"
    });
});
app.controller("adminController", function ($scope, menuService) {
    $scope.data = [];
    var newData = []
    $scope.loadData = function () {
        menuService.getData().then(function (response) {
            newData = response.data.data;
            $scope.data = response.data.data;
            console.log($scope.data);
        }, function (response) {
            console.log("error" + response.statusText)
        });
    };
//    $scope.edit = function (index) {
//        $scope.data[index].show = true;
//    }
    $scope.edit = function (id) {
        for(var i = 0; i < newData.length; i++) {
            if(newData[i]._id == id) {
                $scope.data[i].show = true;
            }
        }
    }
    $scope.add = function () {
        var data = {
            name: $scope.name,
            price: $scope.price,
            ingredients: $scope.ingredients,
            comments: $scope.comments,
            vote: $scope.vote,
            imageurl: $scope.imageurl
        }

        menuService.addData(data).then($scope.loadData, function (error) {
            console.log(error.status);
        });
        $scope.name = "";
        $scope.price = "";
        $scope.lala = "";
        $scope.imageurl = "";
        $scope.comments = "";
        $scope.ingredients = "";
    };
    $scope.save = function (id, data) {

        var newData = {
            name: data.name,
            price: data.price,
            ingredients: data.ingredients,
            comments: data.comments,
            vote: data.vote,
            imageurl: data.imageurl
        }
        console.log(newData);
        menuService.updateData(data._id, newData).then($scope.loadData);
        // hide and show the input text
        for(var i = 0; i < newData.length; i++) {
            if(newData[i]._id == id) {
                $scope.data[i].show = true;
            }
        }
    };
    $scope.delete = function (id) {
        menuService.deleteData(id).then($scope.loadData);
    };
});