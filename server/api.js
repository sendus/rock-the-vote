var express = require("express");
var apiRouter = express.Router();
var uuid = require("uuid");
var Menu = require("./rest.js");


apiRouter.get("/", function (req, res) {
    Menu.find({}, function (err, data) {
        if (err) {
            res.status(500).send("error no data");
        } else {
            res.status(200).send({
                message: "data loaded",
                data: data
            })
        }
    });

});

apiRouter.get("/:id", function (req, res) {
    Menu.findById(req.params.id, function (err, data) {
        if (err) {
            res.status(500).send("error no data");
        } else {
            res.status(200).send({
                message: "data loaded",
                data: data
            });
        }
    });
});
apiRouter.post("/", function (req, res) {
    var newItem = new Menu(req.body);
    newItem.save(function (err, data) {
            if (err) {
                res.status(500).send("error no data");
            } else {
                res.status(200).send({
                    message: "data loaded",
                    data: data
                });
            }
        }

    );
});
apiRouter.post("/:id", function (req, res) {
    Menu.findOne({
        _id: req.params.id
    }, function (err, newItem) {
        if (err) {
            res.status(500).send("there is no data");
        } else if (req.params.id == undefined) {
            res.status(404).send("the item is not found");
        } else {
            newItem.comments.push(req.body.comment);
            newItem.save(function (err, data) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.status(200).send(data);
                }
            })
        }
    });
});

apiRouter.delete("/:id", function (req, res) {
    Menu.findOne({
        _id: req.params.id
    }, function (err, newItem) {
        if (err) {
            res.status(500).send("there is no data");
        } else if (req.params.id == undefined) {
            res.status(404).send("the item is not found");
        } else {
            newItem.remove();
            res.status(200).send("succeeded");
        }
    });
});

apiRouter.put("/:id", function (req, res) {
    var id=req.params.id;
    Menu.findOne({
        _id: id
    }, function (err, newItem) {
        if (err) {
            res.status(500).send("there is no data");
        } else if (req.params.id == undefined) {
            res.status(404).send("the item is not found");
        } else {
            for(key in req.query) {
                newItem[key]=req.query[key];
            };
            newItem.save();
            res.status(200).send({
                message: "update data",
                data: newItem
            });
        }
    });
});

module.exports = apiRouter;