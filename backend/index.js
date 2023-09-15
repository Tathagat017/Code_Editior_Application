const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const history = [];

app.post("/exe", async (req, res) => {
  const { code } = req.body;
  console.log(code);
  const messages = [];

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        ...messages,
        {
          role: "user",
          content: ` ACT AS INTERPRETOR/COMPILER .I am providing programming language . Please detect the programming language and generate output as it would be shown in console of a text editor. Please donot add any description or explaination. Just give me the output of this ${code}  as it would be in terminal.Please only send just the terminal output and no other statement.`,
        },
      ],
    });

    const completion_text = completion.data.choices[0].message.content;
    //console.log(completion_text);

    res.status(200).send({ code: completion_text });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.post("/lang", async (req, res) => {
  const { code, language } = req.body;
  console.log(code, language);
  const messages = [];

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        ...messages,
        {
          role: "user",
          content: ` ACT AS programming language Transpiler (convert one programming language into another tool). I am providing a code . Please transpile the code in the ${language} . Please this code : ${code} into ${language}.Please just give the converted code and nothing else at all.Please write each line of the code in new line. No explainations is required.Please donot provide anyother detail other than the converted code.`,
        },
      ],
    });

    const completion_text = completion.data.choices[0].message.content;
    //console.log(completion_text);

    res.status(200).send({ code: completion_text });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.post("/quality", async (req, res) => {
  const { code } = req.body;
  console.log(code);
  const messages = [];

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        ...messages,
        {
          role: "user",
          content: ` ACT AS A Syntax Highlighter and Senior Software Developer . I am providing a ${code}. Please check if the right clean code practices are implemented and generate a modular score based on naming conventions, correct syntax, optmized approach etc. Please provide a score out of 10 in first line of your answer.followed by detailed suggestions to improve the code in subsequent new line`,
        },
      ],
    });

    const completion_text = completion.data.choices[0].message.content;
    console.log(completion_text);

    res.status(200).send({ code: completion_text });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
