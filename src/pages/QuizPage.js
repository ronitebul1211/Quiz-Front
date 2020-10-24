import React from "react";
import quizApi from "../api/quizApi";
import QuestionField from "../components/QuestionField";

class QuizPage extends React.Component {
   state = { quizData: [], currentQuestionIndex: 0, currentAnswerId: 1, quizResults: [] };

   async componentDidMount() {
      const quizData = await quizApi.getQuizData();
      this.setState({ quizData });
      //TODO catch network error and update UI
   }

   onAnswerChange = (event) => {
      const answerId = parseInt(event.target.value);
      this.setState({ currentAnswerId: answerId }, () => console.log(this.state));
   };

   onContinueClick = async () => {
      if (this.props.mode === "newUser") {
         this.saveQuizResult();
         if (this.isQuizFinished()) {
            //TODO fix bug -> when user finish the last result doesn't sent
            await this.sendQuizResultsToEndPoint();
            return this.props.history.push(`/${this.getCurrentUserId()}/my-ranks`);
         } else {
            return this.renderNextQuestion();
         }
      }

      if (this.props.mode === "addFriend") {
         await this.sendQuestionResultToEndPoint();
         if (this.isQuizFinished()) {
            return this.props.history.push(`/${this.getCurrentUserId()}/my-friend-ranks`);
         } else {
            return this.renderNextQuestion();
         }
      }
   };

   renderNextQuestion = () => {
      const nextQuestionIndex = this.state.currentQuestionIndex + 1;
      this.setState({ currentQuestionIndex: nextQuestionIndex, currentAnswerId: 1 });
   };
   saveQuizResult = () => {
      const quizResultsCopy = [...this.state.quizResults];
      const currentQuestionData = this.getCurrentInQuestionDataObject();
      quizResultsCopy.push(currentQuestionData);
      this.setState({ quizResults: quizResultsCopy });
   };
   sendQuizResultsToEndPoint = async () => {
      console.log(this.state.quizResults);
      await quizApi.updateUserQuizResults(this.getCurrentUserId(), this.state.quizResults);
   };
   sendQuestionResultToEndPoint = async () => {
      const userId = this.getCurrentUserId();
      const friendId = this.props.match.params.friendId;
      const currentQuestionData = this.getCurrentInQuestionDataObject();
      await quizApi.updateFriendQuestionResult(userId, friendId, currentQuestionData);
   };
   getCurrentInQuestionDataObject = () => {
      const questionId = this.getCurrentQuestionId();
      const answerId = this.state.currentAnswerId;
      return { questionId, answerId };
   };
   getCurrentQuestionId = () => {
      return this.state.quizData[this.state.currentQuestionIndex].question.id;
   };
   isQuizFinished = () => {
      return this.state.currentQuestionIndex === this.state.quizData.length - 1;
   };

   getCurrentUserId = () => {
      return this.props.match.params.userId;
   };

   renderQuestion = () => {
      let questionUi;
      if (this.state.quizData.length > 0) {
         questionUi = (
            <React.Fragment>
               <span>שאלה מס' {this.state.currentQuestionIndex + 1}</span>
               <QuestionField
                  selectedValue={this.state.currentAnswerId}
                  questionData={this.state.quizData[this.state.currentQuestionIndex]}
                  onChangeCallback={this.onAnswerChange}
               />
               <button onClick={this.onContinueClick}>המשך</button>
            </React.Fragment>
         );
      } else {
         questionUi = <React.Fragment>בטעינה...</React.Fragment>;
      }
      return questionUi;
   };

   render() {
      return <div>{this.renderQuestion()}</div>;
   }
}

export default QuizPage;
