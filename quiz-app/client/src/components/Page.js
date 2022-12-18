import React, { useState, useEffect, useContext, useRef } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import { AppContext } from "./AppContext";
import {
  animations as packageAnimations,
  presets as packagePresets
} from "@steveeeie/react-page-transition";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export function Page({ data, index }) {
  let {
    setPreset,
    setEnterAnimation,
    setExitAnimation,
    questions: {
      questionsData
    },
    type,
    setType,
    currentType,
    setCurrentType
  } = useContext(AppContext);

  if (JSON.stringify(type) === '{}' || JSON.stringify(currentType) === '{}') {
    setType(JSON.parse(localStorage.getItem("questionType")));
    setCurrentType(JSON.parse(localStorage.getItem("currentType")));
  }

  let [countDown, setCountDown] = useState(currentType?.data.time);
  let bgColor = useRef("");
  const history = useHistory();
  const presetsArr = Object.keys(packagePresets);
  const animationsArr = Object.keys(packageAnimations);

  useEffect(() => {
    const bgColorArr1 = ["#fbc7d4", "#9796f0", "#799F0C", "#799F0C", "#f79d00", "#2980b9", "#FD746C"];
    const bgColorArr2 = ["#e96443", "#A5CC82", "#536976", "#2B32B2", "#16A085", "#5614B0", "#1f4037", "#7F7FD5", "#a8c0ff"];
    let color1 = Math.floor(Math.random() * bgColorArr1.length);
    let color2 = Math.floor(Math.random() * bgColorArr2.length);
    bgColor.current.style.background = `linear-gradient(50deg, ${bgColorArr1[color1]}, ${bgColorArr2[color2]})`;
  }, [])

  const previousPage = (e) => {
    let lastPageId = e.target.getAttribute('id');
    let randomPreset = Math.floor(Math.random() * presetsArr.length);
    let randomEnterAnimation = Math.floor(Math.random() * animationsArr.length);
    let randomExitAnimation = ++randomEnterAnimation;
    setPreset(presetsArr[randomPreset]);
    setEnterAnimation(animationsArr[randomEnterAnimation]);
    setExitAnimation(animationsArr[randomExitAnimation]);
    localStorage.setItem("lastPage", --lastPageId);
  }

  const nextPage = (e) => {
    let lastPageId = e.target.getAttribute('id');
    let randomPreset = Math.floor(Math.random() * presetsArr.length);
    let randomEnterAnimation = Math.floor(Math.random() * animationsArr.length);
    let randomExitAnimation = ++randomEnterAnimation;
    setPreset(presetsArr[randomPreset]);
    setEnterAnimation(animationsArr[randomEnterAnimation]);
    setExitAnimation(animationsArr[randomExitAnimation]);
    localStorage.setItem("lastPage", ++lastPageId);
  }

  const logout = () => {
    localStorage.removeItem('token');
    history.push("/login");
  }

  return (
    <>
      <div className="container" ref={bgColor}>
        <div className="title">
          <h1>
            {currentType?.data.name}
            <span></span>
          </h1>
        </div>
        <div>
          <div className="question">
            <h1>{data.id}</h1>
            <h1>{data.name}</h1>
          </div>
          <div className="options">
            <div>
              <p>A. <span className={!countDown && data.answer === data.a ? "answer" : ""}>{data.a}</span></p>
              <p>B. <span className={!countDown && data.answer === data.b ? "answer" : ""}>{data.b}</span></p>
              <p>C. <span className={!countDown && data.answer === data.c ? "answer" : ""}>{data.c}</span></p>
              <p>D. <span className={!countDown && data.answer === data.d ? "answer" : ""}>{data.d}</span></p>
            </div>
            <div className="timer">
              <CountdownCircleTimer
                isPlaying
                duration={countDown}
                colors={['#00ff22', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[10, 5, 2, 0]}
                isSmoothColorTransition={true}
              >
                {({ remainingTime }) => {
                  if(remainingTime === 0){
                    setCountDown(remainingTime);
                  }
                  console.log(remainingTime);
                  return remainingTime;
                }
                }
              </CountdownCircleTimer>
            </div>
          </div>
        </div>
        <div className="toggle-buttons">
          <NavLink className={data?.id === questionsData[0].id ? "disableNav" : ""} onClick={(e) => previousPage(e)} key={data.id} to={`/${--index}`}>
            <i id={data.id} className="bi bi-arrow-left"></i>
          </NavLink>
          <h1>{data.id}</h1>
          <NavLink id={data.id} className={questionsData.length < 2 + index ? "disableNav" : ""} onClick={(e) => nextPage(e)} key={data.id} to={`/${2 + index}`}>
            <i id={data.id} className="bi bi-arrow-right"></i>
          </NavLink>
        </div>

        <div className="logout" onClick={logout}>
          <p>
            <i class="bi bi-power"></i>
            <span>Logout</span>
          </p>
        </div>
      </div>
    </>
  );
}
