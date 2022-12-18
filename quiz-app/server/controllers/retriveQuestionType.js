const retriveRouter = require("../routes/retriveRouter");
const { question_type } = require("../models");

const handler = async (req, res) => {
    const questionTypes = await question_type.findAll({
        // name: "Similar World"
    });

    res.send({ questionTypes });
}

retriveRouter.post("/question-type", handler);