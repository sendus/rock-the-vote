var app = angular.module("projectApp.user", ["ngRoute", "anyname"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/user", {
        templateUrl: "./js/views/user/user.html",
        controller: "userCtrl"
    }).when("/comen/:id", {
        templateUrl: "./js/views/comen/comen.html",
        controller: "comenCtrl"
    });
});

app.controller("userCtrl", function ($scope,$location, menuService) {
    $scope.go = function ( path ,idCom) {
        
  $location.path( path+"/"+idCom );
};
    $scope.data = [];
    $scope.loadData = function () {
        menuService.getData().then(function (response) {
            $scope.data = response.data.data;
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
        console.log(vote);
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