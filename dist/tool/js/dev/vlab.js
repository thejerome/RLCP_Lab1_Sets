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
            return "{" + formatted_str.substring(0, formatted_str.length - 2) + "}";
        } catch (e) {
            return set;
        }
    }

    function openModal(numOfSet) {
        let currAnswer = [];
        try {
            switch(numOfSet) {
                case 1:
                    currAnswer = answers.answer1;
                break;
                case 2:
                    currAnswer = answers.answer2;
                break;
                case 3: 
                    currAnswer = answers.answer3;
                break;
                default:
                return false;
            }
        }
        catch (e) {
            return false;
        }
        let universe = $("#modal input[type=checkbox]");
        universe.prop('checked', false);
            for (let i = 0; i < currAnswer.length; i++) {
                universe[currAnswer[i] - 1].checked = true;
            }
        $('#putAnswer1')[0].disabled = true;
        $('#putAnswer2')[0].disabled = true;
        $('#putAnswer3')[0].disabled = true;
        $('#modal')[0].style.display = 'inline-flex';
    }

    return {
        setVariant : function(str){},
        setPreviosSolution: function(str){},
        setMode: function(str){},

        init: function () {
            let variant = get_variant();
            answers.answer1 = [];
            answers.answer2 = [];
            answers.answer3 = [];
            // console.log($("#previousSolution")[0].value);
            let content = '' +
                '<div class = "header">' +
                    '<h1>Операции над множествами</h1>' +
                    '<button type="button" class="btn btn-info" id = "infoModalOpener">Справка</button>' +
                '</div>' +
                '<div class = "lab-initial">' +
                    '<h2>Исходные данные</h2>' +
                    '<ul class="list-group">' +
                        '<li class="">A: ' + getSetFormatted(variant.A) + '</li>' +
                        '<li class="">B: ' + getSetFormatted(variant.B) + '</li>' +
                        '<li class="">C: ' + getSetFormatted(variant.C) + '</li>' +
                        '<li class="">D: ' + getSetFormatted(variant.D) + '</li>' +
                    '</ul>' +
                '</div>' +
                '<div class = "lab-task">' +
                    '<h2>Найти</h2>' +
                    '<ol class="list-group">' +
                        '<li>' + variant.expr1 + '</li>' +
                        '<li>' + variant.expr2 + '</li>' +
                        '<li>' + variant.expr3 + '</li>' +
                    '</ol>' +
                '</div>' +
                '<div class = "lab-user-answers">' +
                        '<h2>Ответ</h2>' +
                        '<ul class="list-group">' +
                            '<li>' +
                                '<label for="putAnswer1">Ответ 1: <input type = "text" id = "answer1" value = "{}" style="width: 150px;" readonly disabled></label><input class="btn btn-primary" type="button" value = "···" id = "putAnswer1"">' +
                            '</li>' +
                            '<li>' +
                                '<label for="putAnswer2">Ответ 2: <input type = "text" id = "answer2" value = "{}" style="width: 150px;" readonly disabled></label><input class="btn btn-primary" type="button" value = "···" id = "putAnswer2">' +
                            '</li>' +
                            '<li>' +
                                '<label for="putAnswer3">Ответ 3: <input type = "text" id = "answer3" value = "{}" style="width: 150px;" readonly disabled></label><input class="btn btn-primary" type="button" value = "···" id = "putAnswer3">' +
                            '</li>' +
                        '</ul>' +
                '</div>' +
                '<div id = "modal">' +
                    '<table>' +
                        '<tr>' +
                            '<td><label>1. <input type="checkbox" id="1"></label></td>' +
                            '<td><label>2. <input type="checkbox" id="2"></label></td>' +
                            '<td><label>3. <input type="checkbox" id="3"></label></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td><label>4. <input type="checkbox" id="4"></label></td>' +
                            '<td><label>5. <input type="checkbox" id="5"></label></td>' +
                            '<td><label>6. <input type="checkbox" id="6"></label></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td><label>7. <input type="checkbox" id="7"></label></td>' +
                            '<td><label>8. <input type="checkbox" id="8"></label></td>' +
                            '<td><label>9. <input type="checkbox" id="9"></label></td>' +
                        '</tr>' +
                    '</table>' +
                    '<input class="btn btn-success" type="button" value="OK" id = "modalShutter">' +
                '</div>' +
                '<div id = "modalInfo">' +
                '<p>В блоке <b>Исходные данные</b> приведены исходные множества в формате <i>{a1,a2,...}</i>.</p>' +
                '<p>В блоке <b>Найти</b> указаны выражения, значения которых необходимо найти.</p>' +
                '<p>Ответ необходимо ввести в соответствующем блоке с помощью специальных редакторов множеств. Для редактирования множества, пресдтавляющего ответ, нужно нажать на кнопку <b>"..."</b> и выбрать нужные элементы множества в появивщемся диалоге.</p>' +
                '</div>';
            let container = $("#jsLab")[0];
            container.innerHTML = content;
            $("#modal")[0].style.display = 'none';
            $("#modalInfo")[0].style.display = 'none';
            $("#answer1")[0].value = getSetFormatted(answers.answer1);
            $("#answer2")[0].value = getSetFormatted(answers.answer2);
            $("#answer3")[0].value = getSetFormatted(answers.answer3);

            let currSet;
            $("#modalShutter").on('click', function() {
                let universeChecked = $("#modal input[type=checkbox]");
                let set = [];
                for (let i = 0; i < universeChecked.length; i++) {
                    if (universeChecked[i].checked) {
                        set.push(i + 1);
                    }
                }
                try {
                    switch(currSet) {
                        case 1:
                            answers.answer1 = set;
                            $("#answer1")[0].value = getSetFormatted(set);
                        break;
                        case 2:
                            answers.answer2 = set;
                            $("#answer2")[0].value = getSetFormatted(set);
                        break;
                        case 3:                    
                            answers.answer3 = set;
                            $("#answer3")[0].value = getSetFormatted(set);
                        break;
                        default:
                        return false;
                    }
                }
                catch (e) {
                    return false;
                }
                $('#modal')[0].style.display = 'none';
                $('#putAnswer1')[0].disabled = false;
                $('#putAnswer2')[0].disabled = false;
                $('#putAnswer3')[0].disabled = false;
            });

            $("#infoModalOpener").on('click', function() {
                $("#modalInfo")[0].style.display = "block";
            });

            $("#modalInfo").on('click', function() {
                $("#modalInfo")[0].style.display = "none";
            });

            $('#putAnswer1').on('click', function() {
                currSet = 1;
                openModal(currSet);
            });
            
            $('#putAnswer2').on('click', function() {
                currSet = 2;
                openModal(currSet);
            });

            $('#putAnswer3').on('click', function() {
                currSet = 3;
                openModal(currSet);
            });

        },
        calculateHandler: function (text, code) {},
        getResults: function () {
            return answers;
        },
        getCondition: function () {}
    };
}

var Vlab = init_lab();