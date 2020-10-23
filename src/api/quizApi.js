import { wait } from "@testing-library/react";
import axios from "axios";

//TODO - Error handling
const BASE_URL = "https://teb-quiz-app.herokuapp.com";

const getQuizData = async () => {
   const response = await axios.get(`${BASE_URL}/quiz`);
   return response.data;
};

const createUser = async (userName) => {
   const response = await axios.post(`${BASE_URL}/users`, { name: userName });
   return response.data.userId;
};

const createFriend = async (userId, friendName) => {
   const response = await axios.post(`${BASE_URL}/user/${userId}/friends`, { name: friendName });
   return response.data.friendId;
};

export default {
   getQuizData,
   createUser,
   createFriend,
};
