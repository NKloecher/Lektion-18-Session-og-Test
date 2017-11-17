var controller = require("../controllers/controller");

module.exports = function(express) {
    var router = express.Router();
    router.route('/employee')
        .get(function (req, res) {
            controller.getEmployees()
                .then(function(val) {
                    res.json(val);
                })
                .catch(function(err) {
                    console.log(err);
                    res.status(500).send(err);
                });
        })
        .post(function (req, res) {
            var employee = undefined;
            controller.createEmployee(req.body.title, req.body.name,
                req.body.employmentDate, req.body.wage)
                .then(function(emp) {
                    employee = emp;
                    return controller.getCompany(req.body.companyId);
                })
                .then(function(company) {
                    return controller.connectEmployeeToCompany(company, employee);
                })
                .then(function() {
                    res.json({message: 'Employee saved!'});
                })
                .catch(function(err) {
                    console.error("Error: " + err);
                    if (err.stack) console.error(err.stack);
                    res.status(500).send(err);
                });
        });
    return router;
};