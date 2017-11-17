var controller = require("../controllers/controller");

module.exports = function(express) {
    var router = express.Router();
    router.route('/company')
        .get(function (req, res) {
            controller.getCompanies()
                .then(function(val) {
                    res.json(val);
                })
                .catch(function(err) {
                    console.error("Error: " + err);
                    if (err.stack) console.error(err.stack);
                    res.status(500).send(err);
                });
        })
        .post(function (req, res) {
            controller.createCompany(req.body.name, req.body.hours)
                .then(function() {
                    res.json({message: 'Company saved!'});
                })
                .catch(function(err) {
                    console.error("Error: " + err);
                    if (err.stack) console.error(err.stack);
                    res.status(500).send(err);
                });
        });
    return router;
};