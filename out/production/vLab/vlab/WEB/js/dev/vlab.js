function init_lab() {
    const byDefault = {
        A: [7, 8, 9, 5],
        B: [9, 5, 2],
        C: [5, 2],
        D: [4, 9, 6],
        expr1: "((A union B) union (C intersect D))",
        expr2: "((C intersect B) minus (A intersect D))",
        expr3: "((A intersect D) minus (C union B))"
    };

    function get_variant() {
        let variant; // Переменная для возврата значения
        if ($("#preGeneratedCode")[0] !== null) { // Проверяем, а есть ли у нас вообще preGeneratedCode
            variant = $("#preGeneratedCode")[0].value;
            variant = parse_variant($("#preGeneratedCode")[0].value, byDefault); // Если есть, то отдаём его содержимое на парсинг с деволтным вариантом
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