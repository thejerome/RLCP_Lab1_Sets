function init_lab() {
    const byDefault = {
        A: [7, 8, 9, 5],
        B: [9, 5, 2],
        C: [5, 2],
        D: [4, 9, 6],
        expr1: "((A ? B) ? (C ? D))",
        expr2: "((C ? B) \\ (A ? D))",
        expr3: "((A ? D) \\ (C ? B))"
    };

    let answers = {
        answer1: [],
        answer2: [],
        answer3: []
    };

    function parseVariant(str, defaultObj) {
        let parsedStr;
        if (typeof str === 'string' && str !== "") {
            try {
                parsedStr = JSON.parse(str);
            }
            catch (e) {
                if (defaultObj){
                    parsedStr = defaultObj;
                } else {
                    parsedStr = false;
                }
            }
        }
        else {
            if (defaultObj){
                parsedStr = defaultObj;
            }
            else {
                parsedStr = false;
            }
        }
        return parsedStr;
    }

    function getSetFormatted(set) {
        let formattedStr = "";
        try {
            for (let i = 0; i < set.length; i++) {
                formattedStr += set[i] + "; ";
            }
            return "{" + formattedStr.substring(0, formattedStr.length - 2) + "}";
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
        universe.prop("checked", false);
        for (let i = 0; i < currAnswer.length; i++) {
            universe[currAnswer[i] - 1].checked = true;
        }
        $('#putAnswer1').attr("disabled", true);
        $('#putAnswer2').attr("disabled", true);
        $('#putAnswer3').attr("disabled", true);
        $('#modal').css("display", "inline-flex");
    }

    return {
        setVariant : function(str){
            let variant;
            if (str !== undefined) {
                variant = parseVariant(str, byDefault);
            }
            else {
                variant = byDefault;
            }
            return variant;
        },
        setPreviousSolution: function(str){
            let previousSolution;
            if (str !== undefined) {
                try {
                    previousSolution = JSON.parse(str);
                }
                catch (e) {}
            }
            return previousSolution;
        },
        setMode: function(str){},

        init: function () {
            let variant = this.setVariant($("#preGeneratedCode").val());
            let previousSolution = this.setPreviousSolution($("#previousSolution").val());
            if (previousSolution !== undefined) {
                answers.answer1 = previousSolution.answer1;
                answers.answer2 = previousSolution.answer2;
                answers.answer3 = previousSolution.answer3;
            }
            else {
                answers.answer1 = [];
                answers.answer2 = [];
                answers.answer3 = [];
            }
            let content = '' +
                '<div class = "header">' +
                    '<h1>Операции над множествами</h1>' +
                    '<input type="button" class="btn btn-info" id = "infoModalOpener" value = "Справка">' +
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
                '<div class = "lab-answers">' +
                        '<h2>Ответ</h2>' +
                        '<ul class="list-group">' +
                            '<li>' +
                                '<label for="putAnswer1">Ответ 1: <input type = "text" id = "answer1" value = "{}" style="width: 150px;" readonly disabled></label><input class="btn btn-outline-dark" type="button" value = "···" id = "putAnswer1"">' +
                            '</li>' +
                            '<li>' +
                                '<label for="putAnswer2">Ответ 2: <input type = "text" id = "answer2" value = "{}" style="width: 150px;" readonly disabled></label><input class="btn btn-outline-dark" type="button" value = "···" id = "putAnswer2">' +
                            '</li>' +
                            '<li>' +
                                '<label for="putAnswer3">Ответ 3: <input type = "text" id = "answer3" value = "{}" style="width: 150px;" readonly disabled></label><input class="btn btn-outline-dark" type="button" value = "···" id = "putAnswer3">' +
                            '</li>' +
                        '</ul>' +
                '</div>' +
                '<div id = "modal">' +
                    '<table>' +
                        '<tr>' +
                            '<td><label>1 <input type="checkbox" id="1"></label></td>' +
                            '<td><label>2 <input type="checkbox" id="2"></label></td>' +
                            '<td><label>3 <input type="checkbox" id="3"></label></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td><label>4 <input type="checkbox" id="4"></label></td>' +
                            '<td><label>5 <input type="checkbox" id="5"></label></td>' +
                            '<td><label>6 <input type="checkbox" id="6"></label></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td><label>7 <input type="checkbox" id="7"></label></td>' +
                            '<td><label>8 <input type="checkbox" id="8"></label></td>' +
                            '<td><label>9 <input type="checkbox" id="9"></label></td>' +
                        '</tr>' +
                    '</table>' +
                    '<input class="btn btn-success" type="button" value="Применить" id = "modalShutter">' +
                '</div>' +
                '<div class = "info">' +
                    '<h2>Виртуальная лаборатория "Операции над множествами"</h2>' +
                    '<p>Для выполнения задания виртуальной лаборатории необходимо найти значения множеств из блока «Найти» и ввести их в поля для ответа в соответствующем блоке с помощью специальных редакторов множеств. &nbsp; Для редактирования множества, пресдтавляющего ответ, нужно нажать на кнопку "..." и выбрать нужные элементы множества в появивщемся диалоге. Элементы исходных множеств приведены в блоке "Исходные данные". </p>' +
                '</div>';
            $("#jsLab").html(content);
            $("#modal").css("display", "none");
            $(".info").css("display", "none");
            $("#answer1").val(getSetFormatted(answers.answer1));
            $("#answer2").val(getSetFormatted(answers.answer2));
            $("#answer3").val(getSetFormatted(answers.answer3));

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
                            $("#answer1").val(getSetFormatted(set));
                        break;
                        case 2:
                            answers.answer2 = set;
                            $("#answer2").val(getSetFormatted(set));
                        break;
                        case 3:                    
                            answers.answer3 = set;
                            $("#answer3").val(getSetFormatted(set));
                        break;
                        default:
                        return false;
                    }
                }
                catch (e) {
                    return false;
                }
                $('#modal').css("display", "none");
                $('#putAnswer1').attr("disabled", false);
                $('#putAnswer2').attr("disabled", false);
                $('#putAnswer3').attr("disabled", false);
            });

            $("#infoModalOpener").on("click", function () {
                if ($(".info").css("display").toLowerCase() == "none") {
                    $(".info").css("display", "block");
                    this.value = "Закрыть";
                    $(".lab-initial").css("display", "none");
                    $(".lab-task").css("display", "none");
                    $(".lab-answers").css("display", "none");
                    $("#modal").css("display", "none");
                }
                else {
                    $(".info").css("display", "none");
                    this.value = "Справка";
                    $(".lab-initial").css("display", "block");
                    $(".lab-task").css("display", "block");
                    $(".lab-answers").css("display", "block");
                    $('#putAnswer1').attr("disabled", false);
                    $('#putAnswer2').attr("disabled", false);
                    $('#putAnswer3').attr("disabled", false);
                }
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