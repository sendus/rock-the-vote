var app = angular.module("projectApp.comen", ["ngRoute", "anyname"]);
//app.config(function ($routeProvider) {
//    $routeProvider.when("/comen/:id", {
//        templateUrl: "./js/views/comen/comen.html",
//        controller: "comenCtrl"
//    });
//});
app.controller("comenCtrl", function ($scope, menuService, $routeParams) {
    var id = $routeParams.id;

    $scope.data = [];
    $scope.loadData = function () {
         console.log(id);
        menuService.getbyId(id).then(function (response) {
               
            
            $scope.data = response.data.data;
            console.log($scope.data)
        }, function (response) {
            console.log("error" + response.statusText)
        });
    };
    
    $scope.commenting = function (id, comment) {

        menuService.postcomment(id, comment).then($scope.loadData, function (error) {
            console.log(error.status);
        });
        $scope.lala = "";
    };
    $scope.upVote = function (id, vote) {
        menuService.updateData(id, {
            vote: vote + 1,
        }).then($scope.loadData);
    };
    $scope.downVote = function (id, vote) {
        menuService.updateData(id, {
            vote: vote - 1,
        }).then($scope.loadData);
    };
});