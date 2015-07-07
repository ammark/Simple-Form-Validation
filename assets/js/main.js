

$().ready(function() {

    $.ajax({
        url : '/assets/js/countries.json',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(data){
            for(var i in data) {
                var name = data[i].name;
                var code = data[i].code;
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

    jQuery.validator.addMethod("postalCodeValidate", function(postal, element) {
        return this.optional(element) ||
            postal.match(/[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]/);
    }, "Please specify a valid postal code. Example: N6K 2Y7");

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



