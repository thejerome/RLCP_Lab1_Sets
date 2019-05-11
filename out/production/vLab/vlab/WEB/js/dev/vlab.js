function init_lab() {
    const byDefault = {
        A: [7, 8, 9, 5],
        B: [9, 5, 2],
        C: [5, 2],
        D: [4, 9, 6]
    };

    function get_variant() {
        var variant;
        if ($("#preGeneratedCode") !== null) {
            console.log('NOT OK');
            //variant = parse_variant($("#preGeneratedCode").val(), default_var);
        } else {
            variant = byDefault;
            console.log(variant.A);
        }
        return variant;
    }

    return {
        init: function () {

        },
        calculateHandler: function (text, code) {},
        getResults: function () { return "results"},
        getCondition: function () {}
    }
}

var Vlab = init_lab();