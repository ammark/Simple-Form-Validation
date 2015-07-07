

$().ready(function() {
    //Takes the list of countries from countries.json file and populates them as option tag in the country class
    $.ajax({
        url : 'assets/js/countries.json',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(data){
            for(var i in data) {
                var name = data[i].name;
                $(".country").append("<option>" + name + "</option>");
            }

            $(".country").change(function () {
                if($(this).val() === "Canada")
                    $(".postalcode").show();
                else
                    $(".postalcode").hide();
            }).change();
        }
    });

    // This validates Canadian Postal Code
    jQuery.validator.addMethod("postalCodeValidate", function(postal, element) {
        return this.optional(element) ||
            postal.match(/[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]/);
    }, "Please specify a valid postal code. Example: N6K 2Y7");

    // Validates the form fields, and gives out the error messages if validation is false
    $("#registerForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            email : {
                required: true,
                email: true
            },
            postalCode : {
                postalCodeValidate: true,
                required: true
            },
            phone: {
                phoneUS: true,
            }

        },
        messages: {
            name: {
                required: "Please enter your name",
                minlength: "Please enter your full name"
            },
            email: {
                required: "Please enter your email",
                email: "Please enter a valid email address"
            },
            postalCode: {
                required: "Please enter your postal code"
            }
        }
    });
});



