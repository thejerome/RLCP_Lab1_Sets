package vlab.server_java.check;

import rlcp.check.ConditionForChecking;
import rlcp.generate.GeneratingResult;
import rlcp.server.processor.check.CheckProcessor;
import rlcp.server.processor.check.PreCheckProcessor;
import rlcp.server.processor.check.PreCheckProcessor.PreCheckResult;
import rlcp.server.processor.check.PreCheckResultAwareCheckProcessor;

import java.math.BigDecimal;

public class CheckProcessorImpl implements PreCheckResultAwareCheckProcessor<String> {
    @Override
    public CheckingSingleConditionResult checkSingleCondition(ConditionForChecking condition, String instructions, GeneratingResult generatingResult) throws Exception {
        String variant = generatingResult.getCode(); // {"A":[3,8],"B":[4,5,6,8,9],"C":[7,9],"D":[2,3,4,7,8],"expr3":"((D \\ C) ∪ (A ⋂ B))","expr2":"((B ⋂ A) \\ (D ⋂ C))","expr1":"((B ⋂ C) \\ (A ∪ D))"}
        String answers = instructions; // {"answer1":[4,8,9],"answer2":[3,5,6,7],"answer3":[1]}
        BigDecimal points = new BigDecimal(1.0);
        String comment = "it's ok";

        return new CheckingSingleConditionResult(points, comment);
    }

    @Override
    public void setPreCheckResult(PreCheckResult<String> preCheckResult) {}
}
