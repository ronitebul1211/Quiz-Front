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

   onContinueClick = () => {
      //Check is it last?

      if (this.props.mode === "newUser") {
         this.saveQuizResult();
         if (!this.isQuizFinished()) {
            this.renderNextQuestion();
         } else {
         }
      }
   };

   renderNextQuestion = () => {
      const nextQuestionIndex = this.state.currentQuestionIndex + 1;
      this.setState({ currentQuestionIndex: nextQuestionIndex, currentAnswerId: 1 });
   };
   saveQuizResult = () => {
      const quizResultsCopy = [...this.state.quizResults];
      const questionId = this.getCurrentQuestionId();
      const answerId = this.state.currentAnswerId;
      quizResultsCopy.push({ questionId, answerId });
      this.setState({ quizResults: quizResultsCopy });
   };
   getCurrentQuestionId = () => {
      return this.state.quizData[this.state.currentQuestionIndex].question.id;
   };
   isQuizFinished = () => {
      return this.state.currentQuestionIndex === this.state.quizData.length - 1;
   };

   render() {
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
      return <div>{questionUi}</div>;
   }
}

export default QuizPage;
