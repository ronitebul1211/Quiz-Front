import axios from "axios";

const BASE_URL = "https://teb-quiz-app.herokuapp.com";

const getQuizData = async () => {
   const response = await axios.get(`${BASE_URL}/quiz`);
   console.log(response);
};

export default {
   getQuizData,
};
