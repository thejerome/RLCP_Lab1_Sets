function init_lab() {
    const byDefault = {
        A: [7, 8, 9, 5],
        B: [9, 5, 2],
        C: [5, 2],
        D: [4, 9, 6],
        expr1: "((A ∪ B) ∪ (C ⋂ D))",
        expr2: "((C ⋂ B) \\ (A ⋂ D))",
        expr3: "((A ⋂ D) \\ (C ∪ B))"
    };

    function get_variant() {
        let variant;
        if ($("#preGeneratedCode")[0] !== null) {
            variant = $("#preGeneratedCode")[0].value;
            variant = parse_variant($("#preGeneratedCode")[0].value, byDefault);
        } else {
            variant = byDefault;
        }

        return variant;
    }

    function parse_variant(str, def_obj) {
        let parse_str;
        if (typeof str === 'string' && str !== "") {
            try {
                parse_str = JSON.parse(str);
            } catch (e) {
                if (def_obj){
                    parse_str = def_obj;
                } else {
                    parse_str = false;
                }
            }
        } else {
            if (def_obj){
                parse_str = def_obj;
            } else {
                parse_str = false;
            }
        }
        return parse_str;
    }

    return {
        init: function () {
            let variant = get_variant();
            console.log(variant.expr1);
        },
        calculateHandler: function (text, code) {},
        getResults: function () { return "results"},
        getCondition: function () {}
    }
}

var Vlab = init_lab();