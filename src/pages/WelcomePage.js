import React from "react";
import api from "../api/quizApi";

const WelcomePage = ({ mode }) => {
   console.log(mode);
   api.getQuizData();

   return <div>welcome</div>;
};
export default WelcomePage;
