import React from "react";
import api from "../api/quizApi";

const WelcomePage = ({ mode }) => {
   console.log(mode);
   api.getQuizData1();

   return <div>welcome</div>;
};
export default WelcomePage;
