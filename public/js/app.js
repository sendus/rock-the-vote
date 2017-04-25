var app = angular.module("projectApp", ["ngRoute", "projectApp.admin" ,"projectApp.user", "projectApp.comen", "anyname"]);
app.config(function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.when("/", {
        redirectTo: "/user"
    }).otherwise({
        redirectTo: "/user"

    });