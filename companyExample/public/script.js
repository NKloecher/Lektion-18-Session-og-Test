$(function () {
    function update() {
        $('#companies').empty();
        $('#employees').empty();
        $('.selectpicker').empty();
        $('input').val("");
        $.get("company.hbs", function (template) {
            var compiled = Handlebars.compile(template);
            $.getJSON('/company', function (data) {
                data.forEach(function (element) {
                    var html = compiled({
                        name: element.name,
                        hours: element.hours,
                        employees: element.employees
                    });
                    $("#companies").append(html);

                    $('.selectpicker').append(
                        "<option data='" + element._id + "'>" + element.name + "</option>");
                    $('.selectpicker').selectpicker('refresh');
                });
            })
        });

        $.get("employee.hbs", function (template) {
            var compiled = Handlebars.compile(template);
            $.getJSON('/employee', function (data) {
                data.forEach(function (element) {
                    var compName = element.company ? element.company.name : "";
                    var html = compiled({
                        name: element.name,
                        title: element.title,
                        wage: element.wage,
                        company: compName,
                        id: element._id
                    });
                    var li = $(html);
                    li.click(function () {
                        $('#empNameUpdate').val(element.name);
                        $('#empNameUpdate').attr('data', element._id);
                    });
                    $("#employees").append(li);
                });
            })
        });
    }

    update();

    $('#submitCompany').click(function () {
        var msg = {
            name: $('#compName').val(),
            hours: $('#compHours').val(),
        };
        $.post("/company", msg, function (data) {
            update();
        });
    });

    $('#submitEmployee').click(function () {
        var msg = {
            name: $('#empName').val(),
            title: $('#empTitle').val(),
            employmentDate: Date.now(),
            wage: $('#empWage').val(),
            companyId: $(".selectpicker option:selected").attr('data')
        };
        $.post("/employee", msg, function (data) {
            update();
        });
    });

});