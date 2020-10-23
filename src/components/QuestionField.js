import React from "react";
import "./QuestionField.css";
//Components

/**
 Type 'date' -> content {label:'', value:''}  config{inputName:'', displayMode: 'row' / 'column'} 
 */
const QuestionField = ({ questionData, selectedValue, onChangeCallback }) => {
   const renderedRadioOptions = questionData.answers.map((answer) => {
      return (
         <div className="answer" key={answer.answerId}>
            <input
               className="answer__input"
               value={answer.answerId}
               type="radio"
               checked={answer.answerId === selectedValue}
               onChange={onChangeCallback}
            />
            <label className="answer__text">{answer.text}</label>
         </div>
      );
   });

   return (
      <div className="question-field">
         <label className="question-field__question-text">{questionData.question.text}</label>
         <div className="question-field__answers">{renderedRadioOptions}</div>
      </div>
   );
};

export default QuestionField;
