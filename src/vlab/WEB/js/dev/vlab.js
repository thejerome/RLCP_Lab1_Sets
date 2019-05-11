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
            variant = parse_variant($("#preGeneratedCode").val(), default_var);
        } else {
            variant = byDefault;
            console.log(variant.A);
        }
        return variant;
    }

    function parse_variant(str, def_obj) {
        var parse_str;
        if (typeof str === 'string' && str !== "") {
            try {
                parse_str = str.replace(/<br\/>/g, "\r\n").replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&lt;br\/&gt;/g, "\r\n")
                    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&minus;/g, "-").replace(/&apos;/g, "\'").replace(/&#0045;/g, "-");
                parse_str = JSON.parse(parse_str);
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
            lab_var = get_variant();
        },
        calculateHandler: function (text, code) {},
        getResults: function () { return "results"},
        getCondition: function () {}
    }
}

var Vlab = init_lab();