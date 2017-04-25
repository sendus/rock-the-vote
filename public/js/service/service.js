var app = angular.module("anyname", []);
app.service("menuService", function ($http) {
    this.getData = function () {
        return $http.get("http://localhost:8000/menu");
    }
    this.addData = function (data) {
        return $http.post("http://localhost:8000/menu", data);
    }
    this.updateData = function (id, newData) {
        console.log(newData);
        var query = "?";
        for (key in newData) {
            query += key + "=" + newData[key] + "&";
        }
        return $http.put("http://localhost:8000/menu/" + id + query);
    }
    this.deleteData = function (id) {
        return $http.delete("http://localhost:8000/menu/" + id)
    }
    this.postcomment = function (id, comment) {
        var data = {
            comment: comment
        };
        return $http.post("http://localhost:8000/menu/" + id, data);
    }
    this.getbyId = function (id) {
        console.log("http://localhost:8000/menu/" + id)
        return $http.get("http://localhost:8000/menu/" + id)
    }
});