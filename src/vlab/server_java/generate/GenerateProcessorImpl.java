package vlab.server_java.generate;

import java.util.Random;
import java.util.Arrays;
import org.json.JSONObject;

import rlcp.generate.GeneratingResult;
import rlcp.server.processor.generate.GenerateProcessor;

public class GenerateProcessorImpl implements GenerateProcessor {
    static Random random = new Random();

    private static int getRandomIntegerBetween(int a, int b) {
        return (a + random.nextInt(b - a + 1));
    }

    private static int[] getSet() {
        int setSize = getRandomIntegerBetween(2, 5);
        int[] arr = new int[setSize];
        for (int i = 0; i < arr.length; i++) {
            Boolean flag = false;
            while (flag != true) {
                int elem = getRandomIntegerBetween(1, 9);
                int notEquals = 0;
                for (int j = 0; j < arr.length; j++) {
                    if (arr[j] != elem) {
                        notEquals += 1;
                    }
                }
                if (notEquals == arr.length) {
                    arr[i] = elem;
                    flag = true;
                }
            }
        }
        Arrays.sort(arr);
        return arr;
    }

    private static String createExpression() {
        String[] sets = {"A", "B", "C", "D"};
        for (int i=0; i < sets.length; i++) {
            int randomPosition = random.nextInt(sets.length);
            String temp = sets[i];
            sets[i] = sets[randomPosition];
            sets[randomPosition] = temp;
        }
        String[] operations = {generateOperation(), generateOperation(), generateOperation()};
        Boolean flag = false;
        while (flag != true) {
            if (operations[0] == operations[1] && operations[0] == operations[2] && operations[1] == operations[2]) {
                operations[0] = generateOperation();
                operations[1] = generateOperation();
                operations[2] = generateOperation();
            }
            else {
                flag = true;
            }
        }

        return "((" + sets[0] + " " + operations[0] + " " + sets[1] + ") " + operations[1] + " (" + sets[2] + " " + operations[2] + " " + sets[3] + "))";
    }

    private static String generateOperation() {
        int operationSign = getRandomIntegerBetween(1, 9);
        switch (operationSign) {
            case 1:
            case 2:
            case 3:
            case 4:
            default:
                return "∪";//union
            case 5:
            case 6:
            case 7:
                return "⋂";//intersect
            case 8:
            case 9:
                return "\\";//minus
        }
    }

    @Override
    public GeneratingResult generate(String condition) {
        String text = "";
        String code = "";
        String instructions = "";

        JSONObject variant = new JSONObject();
        int[] A = getSet();
        int[] B = getSet();
        int[] C = getSet();
        int[] D = getSet();

        variant.put("A", A);
        variant.put("B", B);
        variant.put("C", C);
        variant.put("D", D);

        String expression1 = createExpression();
        String expression2 = createExpression();
        String expression3 = createExpression();

        variant.put("expr1", expression1);
        variant.put("expr2", expression2);
        variant.put("expr3", expression3);

        text = "Ваш вариант загружен в установку";
        code = variant.toString();
        instructions = "Выполните операции над множествами. Внесите результирующие множества в соответстующий блок.";

        return new GeneratingResult(text, code, instructions);
    }
}
