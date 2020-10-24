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

const updateUserQuizResults = async (userId, quizResults) => {
   const response = await axios.put(`${BASE_URL}/user/${userId}/quiz`, quizResults);
   console.log(response);
   //TODO test for valid quiz results
};

const updateFriendQuestionResult = async (userId, friendId, questionResult) => {
   const response = await axios.put(`${BASE_URL}/user/${userId}/friends/${friendId}`, questionResult);
   return response.data.userAnswerId;
   //TODO test for valid question results
};

const getRanks = async (userId) => {
   const response = await axios.get(`${BASE_URL}/user/${userId}/ranks`);
   return response.data.friendsRanks;
};

export default {
   getQuizData,
   createUser,
   createFriend,
   updateUserQuizResults,
   updateFriendQuestionResult,
   getRanks,
};
