const retriveRouter = require("../routes/retriveRouter");
const { similar_word } = require("../models");
const {Op} = require("sequelize");

const handler = async (req, res) => {
    const lastPage = req.body.lastPage ? req.body.lastPage : 1;
    // const {questionType} = req.body;
    const questionsData = await similar_word.findAll({
        where: {
            id: {
                [Op.gte]: [lastPage],
            }
          }
    });

    res.send({questionsData});
}

retriveRouter.post("/questions", handler);