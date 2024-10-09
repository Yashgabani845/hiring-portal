
const User = require("../models/User");
const compilex = require("compilex");
const Result = require("../models/Result");

const options = { stats: true };
compilex.init(options);


exports.compile=async (req, res) => {
    const { question, language, code, testcases, email, assessmentId } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  
    let envData = { OS: "windows", options: { timeout: 10000 } };
    let results = [];
  
    let result = await Result.findOne({
      applicantId: user._id,
      assessmentId: assessmentId,
    });
    if (!result) {
      result = new Result({
        assessmentId: assessmentId,
        applicantId: user._id,
        score: 0,
        answers: [],
        feedback: "",
        status: "not submitted",
      });
    }
  
    const executeTestCase = async (index) => {
      if (index >= testcases.length) {
        result.answers.push({ code, results });
        await result.save();
        return res.json(results.slice(0, 2));
      }
  
      const { input, output } = testcases[index];
      let compileFunc;
  
      switch (language) {
        case "cpp":
          envData.cmd = "g++";
          compileFunc = compilex.compileCPPWithInput;
          break;
        case "java":
          compileFunc = compilex.compileJavaWithInput;
          break;
        case "python":
          compileFunc = compilex.compilePythonWithInput;
          break;
        default:
          result.answers.push({ code, results });
  
          await result.save();
          return res.json({ error: "Language not supported" });
      }
  
      compileFunc(envData, code, input, async (data) => {
        if (data.error) {
          results.push({
            input,
            expectedOutput: output,
            output: data.error,
            passed: false,
            index,
          });
          failed = true;
          result.answers.push({ code, results });
  
          await result.save();
          return res.json({
            input,
            expectedOutput: output,
            output: data.error,
            passed: false,
            index,
          });
        } else {
          const passed = data.output.trim() == output.trim();
          results.push({
            input,
            expectedOutput: output,
            output: data.output,
            passed,
            index,
          });
  
          if (!passed) {
            failed = true;
            result.answers.push({ code, results });
  
            await result.save();
            return res.json({
              input,
              expectedOutput: output,
              output: data.output,
              passed: false,
              index,
            });
          }
        }
  
        executeTestCase(index + 1);
      });
    };
  
    executeTestCase(0);
  };


  exports.endTest=async (req, res) => {
    const { email, assessmentId } = req.body;
    const user = await User.findOne({ email: email });
  
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  
    const result = await Result.findOne({
      applicantId: user._id,
      assessmentId: assessmentId,
    });
    if (!result) {
      return res.status(404).json({ error: "Result not found" });
    }
  
    result.status = "submitted";
    result
      .save()
      .then(() => res.json({ message: "Test ended and result submitted" }))
      .catch((error) => res.status(500).json({ error: "Error updating result" }));
  };

  exports.res=async (req, res) => {
    const { email, assessmentId } = req.params;
  
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const result = await Result.findOne({
        applicantId: user._id,
        assessmentId: assessmentId,
      });
      if (result && result.status === "submitted") {
        res.json(result || { submitted: true, answers: [] });
      } else {
        res.json({ submitted: false, answers: [] });
      }
    } catch (error) {
      console.error("Error in result endpoint:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };