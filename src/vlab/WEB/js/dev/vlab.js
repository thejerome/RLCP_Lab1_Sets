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

    let answers = {
        answer1: [],
        answer2: [],
        answer3: []
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

    function getSetFormatted(set) {
        let formatted_str = "";
        try {
            for (let i = 0; i < set.length; i++) {
                formatted_str += set[i] + "; ";
            }
            return formatted_str.substring(0, formatted_str.length - 2);
        } catch (e) {
            return set;
        }
    }

    return {
        setVariant : function(str){},
        setPreviosSolution: function(str){},
        setMode: function(str){},

        init: function () {
            let variant = get_variant();
            let content = '<h1>Операции над множествами</h1>' +
                '<div class = "input_data"><p class = "descr">Исходные данные</p>' +
                    '<ul>' +
                        '<li>A: {' + getSetFormatted(variant.A) + '}</li>' +
                        '<li>B: {' + getSetFormatted(variant.B) + '}</li>' +
                        '<li>C: {' + getSetFormatted(variant.C) + '}</li>' +
                        '<li>D: {' + getSetFormatted(variant.D) + '}</li>' +
                    '</ul>' +
                '</div>' +
                '<div class = "output_info"><p class = "descr">Найти</p>' +
                    '<ol>' +
                        '<li>' + variant.expr1 + '</li>' +
                        '<li>' + variant.expr2 + '</li>' +
                        '<li>' + variant.expr3 + '</li>' +
                    '</ol>' +
                '</div>' +
                '<div class = "output_data">' +
                    '<ul>' +
                        '<li>' +
                            '<label for="putAnswer1">Ответ 1: <input type = "text" id = "answer1" value = "{}" style="width: 150px;" readonly disabled></label><input type="button" value = "..." id = "putAnswer1"">' +
                        '</li>' +
                        '<li>' +
                            '<label for="putAnswer2">Ответ 2: <input type = "text" id = "answer2" value = "{}" style="width: 150px;" readonly disabled></label><input type="button" value = "..." id = "putAnswer2">' +
                        '</li>' +
                        '<li>' +
                            '<label for="putAnswer3">Ответ 3: <input type = "text" id = "answer3" value = "{}" style="width: 150px;" readonly disabled></label><input type="button" value = "..." id = "putAnswer3">' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
                '<div id = "modal_first" style="border: 1px solid black; display: inline-block;">' +
                '<table>' +
                '<tr>' +
                '<td><label>1. <input type="checkbox" id="1" name = "element_first"></label></td>' +
                '<td><label>2. <input type="checkbox" id="2" name = "element_first"></label></td>' +
                '<td><label>3. <input type="checkbox" id="3" name = "element_first"></label></td>' +
                '</tr>' +
                '<tr>' +
                '<td><label>4. <input type="checkbox" id="4" name = "element_first"></label></td>' +
                '<td><label>5. <input type="checkbox" id="5" name = "element_first"></label></td>' +
                '<td><label>6. <input type="checkbox" id="6" name = "element_first"></label></td>' +
                '</tr>' +
                '<tr>' +
                '<td><label>7. <input type="checkbox" id="7" name = "element_first"></label></td>' +
                '<td><label>8. <input type="checkbox" id="8" name = "element_first"></label></td>' +
                '<td><label>9. <input type="checkbox" id="9" name = "element_first"></label></td>' +
                '</tr>' +
                '</table>' +
                '<input type="button" value="OK" id = "modalShutter_first">' +
                '</div>' +
                '' +
                '<div id = "modal_second" style="border: 1px solid black; display: inline-block;">' +
                '<table>' +
                '<tr>' +
                '<td><label>1. <input type="checkbox" id="1" name = "element_second"></label></td>' +
                '<td><label>2. <input type="checkbox" id="2" name = "element_second"></label></td>' +
                '<td><label>3. <input type="checkbox" id="3" name = "element_second"></label></td>' +
                '</tr>' +
                '<tr>' +
                '<td><label>4. <input type="checkbox" id="4" name = "element_second"></label></td>' +
                '<td><label>5. <input type="checkbox" id="5" name = "element_second"></label></td>' +
                '<td><label>6. <input type="checkbox" id="6" name = "element_second"></label></td>' +
                '</tr>' +
                '<tr>' +
                '<td><label>7. <input type="checkbox" id="7" name = "element_second"></label></td>' +
                '<td><label>8. <input type="checkbox" id="8" name = "element_second"></label></td>' +
                '<td><label>9. <input type="checkbox" id="9" name = "element_second"></label></td>' +
                '</tr>' +
                '</table>' +
                '<input type="button" value="OK" id = "modalShutter_second">' +
                '</div>' +
                '' +
                '<div id = "modal_third" style="border: 1px solid black; display: inline-block;">' +
                '<table>' +
                '<tr>' +
                '<td><label>1. <input type="checkbox" id="1" name = "element_third"></label></td>' +
                '<td><label>2. <input type="checkbox" id="2" name = "element_third"></label></td>' +
                '<td><label>3. <input type="checkbox" id="3" name = "element_third"></label></td>' +
                '</tr>' +
                '<tr>' +
                '<td><label>4. <input type="checkbox" id="4" name = "element_third"></label></td>' +
                '<td><label>5. <input type="checkbox" id="5" name = "element_third"></label></td>' +
                '<td><label>6. <input type="checkbox" id="6" name = "element_third"></label></td>' +
                '</tr>' +
                '<tr>' +
                '<td><label>7. <input type="checkbox" id="7" name = "element_third"></label></td>' +
                '<td><label>8. <input type="checkbox" id="8" name = "element_third"></label></td>' +
                '<td><label>9. <input type="checkbox" id="9" name = "element_third"></label></td>' +
                '</tr>' +
                '</table>' +
                '<input type="button" value="OK" id = "modalShutter_third">' +
                '</div>';
                // '<div class = "input_data"><p class = "descr">Исходные данные <input type="button" value="Rnd" onclick = "setNewVariant()"></p>' +
            let container = $("#jsLab")[0];
            container.innerHTML = content;
            $("#modal_first")[0].style.display = 'none';
            $("#modal_second")[0].style.display = 'none';
            $("#modal_third")[0].style.display = 'none';

            $("#putAnswer1").onclick = function() {
                $("#modal_first")[0].style.display = 'inline-block';
                $("#modalShutter_first")[0].addEventListener('click', function(){
                    let universe_first = document.getElementsByName("element_first");
                    answers.answer1 = [];
                    for (let i = 0; i < universe_first.length; i++) {
                        if (universe_first[i].checked) {
                            answers.answer1.push(i + 1);
                        }
                    }
                    $("#answer1")[0].value = "{" + getSetFormatted(answers.answer1) +"}";
                    $("#modal_first")[0].style.display = 'none';}, false);
            };

            $("#putAnswer2")[0].onclick = function() {
                $("#modal_second")[0].style.display = 'inline-block';
                $("#modalShutter_second")[0].addEventListener('click', function(){
                    let universe_second = document.getElementsByName("element_second");
                    answers.answer2 = [];
                    for (let i = 0; i < universe_second.length; i++) {
                        if (universe_second[i].checked) {
                            answers.answer2.push(i + 1);
                        }
                    }
                    $("#answer2")[0].value = "{" + getSetFormatted(answers.answer2) +"}";
                    $("#modal_second")[0].style.display = 'none';}, false);
            };

            $("#putAnswer3")[0].onclick = function() {
                $("#modal_third")[0].style.display = 'inline-block';
                $("#modalShutter_third")[0].addEventListener('click', function(){
                    let universe_third = document.getElementsByName("element_third");
                    answers.answer3 = [];
                    for (let i = 0; i < universe_third.length; i++) {
                        if (universe_third[i].checked) {
                            answers.answer3.push(i + 1);
                        }
                    }
                    $("#answer3")[0].value = "{" + getSetFormatted(answers.answer3) +"}";
                    $("#modal_third")[0].style.display = 'none';}, false);
            };
        },
        calculateHandler: function (text, code) {},
        getResults: function () { return "results"},
        getCondition: function () {}
    }
}

var Vlab = init_lab();