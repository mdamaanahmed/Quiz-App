import React, { useContext } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { PageTransition } from "@steveeeie/react-page-transition";
import { AppContext } from "./AppContext";
import { Page } from "./Page";
import Login from "./Login";
import QuestionType from "./QuestionType";

export function Routes() {
  const { preset, enterAnimation, exitAnimation, questions, setQuestions } = useContext(AppContext);
  const token = localStorage.getItem("token");

  if (JSON.stringify(questions) === '{}') {
    setQuestions(JSON.parse(localStorage.getItem("questions")));
  }
  return (
    <>
      <Route
        render={({ location }) => token ? (
          <PageTransition
            preset={preset}
            transitionKey={location.pathname}
            enterAnimation={enterAnimation}
            exitAnimation={exitAnimation}
          >
            <Switch location={location}>
              {questions?.questionsData?.map((data, index) => {
                return (
                  <Route
                    key={index}
                    exact
                    path={`/${++index}`}
                    render={() => <Page data={data} index={index} />}
                  />
                );
              })}
              <Route exact path="/" render={() => <Redirect to={`/${token ? "question-type" : "login"}`} />} />
              <Route exact path="/question-type" ><QuestionType /></Route>
              <Route exact path="/login" ><Login /></Route>
            </Switch>
          </PageTransition>
        )
          : <Redirect to={`/${token ? "question-type" : "login"}`} />
        }
      />
      <Route exact path="/login" ><Login /></Route>
    </>
  );
}
