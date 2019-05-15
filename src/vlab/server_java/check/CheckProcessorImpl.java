package vlab.server_java.check;

import java.math.BigDecimal;
import java.util.Arrays;
import org.json.JSONObject;
import org.json.JSONArray;

import rlcp.check.ConditionForChecking;
import rlcp.generate.GeneratingResult;
import rlcp.server.processor.check.CheckProcessor;
import rlcp.server.processor.check.PreCheckProcessor;
import rlcp.server.processor.check.PreCheckProcessor.PreCheckResult;
import rlcp.server.processor.check.PreCheckResultAwareCheckProcessor;

public class CheckProcessorImpl implements PreCheckResultAwareCheckProcessor<String> {
    private static int[] getIntArrayFromJSON(JSONArray jsonArray){
        int[] intArray = new int[jsonArray.length()];
        for (int i = 0; i < intArray.length; i++) {
            intArray[i] = jsonArray.optInt(i);
        }
        return intArray;
    }

    private static int[] getUnion(int[] set_first, int[] set_second) {
        int[] result;
        int length_first = set_first.length;
        int length_second = set_second.length;
        int[] temp = new int[length_first + length_second];
        System.arraycopy(set_first, 0, temp, 0, set_first.length);
        System.arraycopy(set_second, 0, temp, length_first, length_second);
        Arrays.sort(temp);
        result = removeDuplicateElements(temp);
        return result;
    }

    private static int[] getIntersection(int[] set_first, int[] set_second) {
        int[] result;
        int length_first = set_first.length;
        int length_second = set_second.length;
        if (length_first == 0 || length_second == 0) {
            result = new int[0];
        }
        else {
            int[] temp = new int[9];
            for (int i = 0; i < length_first; i++) {
                for (int j = 0; j < length_second; j++) {
                    if (set_first[i] == set_second[j]) {
                        temp[set_first[i] - 1] = set_first[i];
                    }
                }
            }
            result = removeZeros(temp);
        }
        return result;
    }

    private static int[] getMinus(int[] set_first, int[] set_second) {
        int[] result;
        int length_first = set_first.length;
        int length_second = set_second.length;
        if (length_first == 0) {
            result = new int[0];
        }
        else {
            int[] temp = new int[length_first];
            for (int i = 0; i < length_first; i++) {
                Boolean flag = true;
                for (int j = 0; j < length_second; j++) {
                    if (set_first[i] == set_second[j]) {
                        flag = false;
                    }
                }
                if (flag) {
                    temp[i] = set_first[i];
                }
            }
            result = removeZeros(temp);
        }
        return result;
    }

    private static int[] removeDuplicateElements(int arr[]){
        int initialLength = arr.length;
        int[] temp = new int[initialLength];
        if (initialLength == 0 || initialLength == 1) {
            return arr;
        }
        else {
            int[] result;
            int j = 0;
            for (int i=0; i < initialLength - 1; i++) {
                if (arr[i] != arr[i + 1]){
                    temp[j++] = arr[i];
                }
            }
            temp[j++] = arr[initialLength - 1];
            result = removeZeros(temp);
            return result;
        }
    }

    private static int[] removeZeros(int arr[]){
        int[] result;
        int[] temp = new int[arr.length];
        int numberOfZeros = 0;
        for (int i = 0; i < arr.length; i++){
            if (arr[i] != 0){
                temp[i - numberOfZeros] = arr[i];
            }
            else {
                numberOfZeros++;
            }
        }
        result = new int[temp.length - numberOfZeros];
        System.arraycopy(temp, 0, result, 0, result.length);
        return result;
    }

    private static int[] getResultSet(String expression, int[] A, int[] B, int[] C, int[] D) {
        int[] result = new int[0];
        int[] tempResult_first = getTempResult(expression.substring(2, expression.indexOf(") ")), A, B, C, D);
        int[] tempResult_second = getTempResult(expression.substring(expression.indexOf(" (") + 2, expression.length() - 2), A, B, C, D);
        result = getResultBySign(expression.substring(expression.indexOf(") ") + 2, expression.indexOf(" (")), tempResult_first, tempResult_second);
        Arrays.sort(result);
        return result;
    }

    private static int[] getTempResult(String expression, int[] A, int[] B, int[] C, int[] D) {
        int[] result;
        if (expression.length() != 5) {
            throw new NullPointerException("Error on getTempResult!");
        }
        else {
            int[] set_first = getSet(expression.substring(0, 1), A, B, C, D);
            int[] set_second = getSet(expression.substring(expression.length() - 1, expression.length()), A, B, C, D);
            result = getResultBySign(expression.substring(expression.indexOf(" ") + 1, expression.lastIndexOf(" ")), set_first, set_second);
            return result;
        }
    }

    private static int[] getSet(String sign, int[] A, int[] B, int[] C, int[] D) {
        int[] result;
        switch (sign) {
            case "A":
                result = A;
                break;
            case "B":
                result = B;
                break;
            case "C":
                result = C;
                break;
            case "D":
                result = D;
                break;
            default:
                throw new NullPointerException("Error on parseSet!");
        }
        return result;
    }

    private static int[] getResultBySign(String sign, int[] set_first, int[] set_second) {
        int[] result;
        switch (sign) {
            case "∪":
                result = getUnion(set_first, set_second);
                break;
            case "⋂":
                result = getIntersection(set_first, set_second);
                break;
            case "\\":
                result = getMinus(set_first, set_second);
                break;
            default:
                throw new NullPointerException("Error on getResultBySign!");
        }
        return result;
    }

    private static String getSetFormatted(int[] set) {
        return Arrays.toString(set).replaceAll(",", ";").replace("[", "{").replace("]", "}");
    }

    @Override
    public CheckingSingleConditionResult checkSingleCondition(ConditionForChecking condition, String instructions, GeneratingResult generatingResult) throws Exception {
        BigDecimal points;
        String comment = "";

        try {
            String variant_json = generatingResult.getCode();
            JSONObject variant = new JSONObject(variant_json);
            int[] A = getIntArrayFromJSON(variant.getJSONArray("A"));
            int[] B = getIntArrayFromJSON(variant.getJSONArray("B"));
            int[] C = getIntArrayFromJSON(variant.getJSONArray("C"));
            int[] D = getIntArrayFromJSON(variant.getJSONArray("D"));
            String expr1 = variant.getString("expr1");
            String expr2 = variant.getString("expr2");
            String expr3 = variant.getString("expr3");

            String answers_json = instructions;
            JSONObject answers = new JSONObject(answers_json);
            int[] answer1 = getIntArrayFromJSON(answers.getJSONArray("answer1"));
            int[] answer2 = getIntArrayFromJSON(answers.getJSONArray("answer2"));
            int[] answer3 = getIntArrayFromJSON(answers.getJSONArray("answer3"));

            int[] trueAnswer1 = getResultSet(expr1, A, B, C, D);
            int[] trueAnswer2 = getResultSet(expr2, A, B, C, D);
            int[] trueAnswer3 = getResultSet(expr3, A, B, C, D);
            double trueAnswers = 0.0;
            if (Arrays.equals(answer1, trueAnswer1)) {
                trueAnswers += 1.0;
            }
            else {
                comment += "Неверное значение первого множества. Ожидается ответ " + getSetFormatted(trueAnswer1) + ". ";
            }
            if (Arrays.equals(answer2, trueAnswer2)) {
                trueAnswers += 1.0;
            }
            else {
                comment += "Неверное значение второго множества. Ожидается ответ " + getSetFormatted(trueAnswer2) + ". ";
            }
            if (Arrays.equals(answer3, trueAnswer3)) {
                trueAnswers += 1.0;
            }
            else {
                comment += "Неверное значение третьего множества. Ожидается ответ " + getSetFormatted(trueAnswer3) + ".";
            }

            points = new BigDecimal(Math.round((trueAnswers / 3.0) * 100.0) / 100.0);
        }
        catch(Exception e) {
            points = new BigDecimal(1.0);
            comment = "Failed, " + e.getMessage();
        }

        return new CheckingSingleConditionResult(points, comment);
    }

    @Override
    public void setPreCheckResult(PreCheckResult<String> preCheckResult) {}
}
