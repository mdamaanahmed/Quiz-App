const retriveRouter = require("../routes/retriveRouter");
const { user } = require("../models");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const handler = async (req, res) => {
    const { userName, password } = req.body.loginData;
    const login = await user.findOne(
        {
            where: {
                user_name: userName,
                password
            }
        });
    if (login) {
        const token = jwt.sign({ userName, password }, SECRET_KEY);
        res.send({msg: "Login Successfull", token});
    } else {
        res.send({msg: "Invalide Credencials"});
    }
}

retriveRouter.post("/login", handler);