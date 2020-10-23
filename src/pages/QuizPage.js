import React from "react";
import quizApi from "../api/quizApi";
import QuestionField from "../components/QuestionField";

class QuizPage extends React.Component {
   state = { currentQuestion: {}, currentAnswers: [], currentIndex: 0 };

   async componentDidMount() {
      this.quiz = await quizApi.getQuizData();
      console.log(this.quiz);

      this.setState(
         {
            currentQuestion: this.quiz[this.state.currentIndex].question,
            currentAnswers: this.quiz[this.state.currentIndex].answers,
         },
         () => console.log(this.state),
      );
      //TODO catch network error and update UI
   }

   render() {
      console.log(this.props.mode);
      return (
         <div>
            QuizPage
            <QuestionField
               selectedValue={1}
               question={this.state.currentQuestion.text}
               answers={this.state.currentAnswers}
               config={{
                  inputName: "type",
                  defaultValue: "חובה",
                  displayMode: { field: "column", options: "row" },
               }}
               onChangeCallback={this.onChange}
            />
         </div>
      );
   }
}

export default QuizPage;
