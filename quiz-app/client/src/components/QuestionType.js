import React, { useContext } from 'react'
import axios from 'axios'
import { AppContext } from "./AppContext";
import { useHistory } from 'react-router';

const QuestionType = () => {
    let { type, setType, setQuestions, setCurrentType } = useContext(AppContext);
    const history = useHistory();

    if (JSON.stringify(type) === '{}') {
        setType(JSON.parse(localStorage.getItem("questionType")));
    }

    const handleQuestionData = async (data) => {
        const lastPage = localStorage.getItem("lastPage");
        await axios.post("http://localhost:8200/api/retrive/questions/",
            {
                lastPage,
                questionType: data.name
            })
            .then(res => {
                // console.log(res.data);
                localStorage.setItem("questions", JSON.stringify(res.data));
                localStorage.setItem("currentType", JSON.stringify({data}));
                const question = JSON.parse(localStorage.getItem("questions"));
                const currentType = JSON.parse(localStorage.getItem("currentType"));
                setQuestions(question);
                setCurrentType(currentType);
                history.push("/1")
            })
            .catch(err => console.log(err))
    }


    return (
        <>
            <div className="question-type">
                {
                    type?.questionTypes?.map((data, index) => {
                        return <h1 key={index} onClick={() => handleQuestionData(data)}>{data.name}</h1>
                    })
                }
            </div>
        </>
    )
}

export default QuestionType