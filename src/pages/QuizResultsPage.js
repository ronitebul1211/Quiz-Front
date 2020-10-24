import React from "react";
import "./QuizResultsPage.css";
import quizApi from "../api/quizApi";

class QuizResultsPage extends React.Component {
   state = { ranks: [] };

   async componentDidMount() {
      const userId = this.getCurrentUserId();
      const ranks = await quizApi.getRanks(userId);
      this.setState({ ranks });
   }

   getCurrentUserId = () => {
      return this.props.match.params.userId;
   };

   renderRanks = () => {
      const renderedRanks = this.state.ranks.map((rank) => {
         return (
            <tr className="ranks-table__row" key={rank.friendId}>
               <td className="ranks-table__row-item">{`${rank.rightAnswers}/${rank.totalQuestions}`} </td>
               <td className="ranks-table__row-item">{rank.friendName}</td>
            </tr>
         );
      });
      return renderedRanks;
   };

   renderMessage = () => {
      if (this.props.mode === "newUser") {
         return (
            <React.Fragment>
               <div className="link-box">
                  <span className="link-box__header">שלח את הקישור לחברים כדי שימלאו את השאלון</span>
                  <a className="link-box__link" href={`http://localhost:3000/${this.getCurrentUserId()}`}>
                     {`http://localhost:3000/${this.getCurrentUserId()}`}
                  </a>
               </div>
               <div className="link-box">
                  <span className="link-box__header">הכנס כדי לגלות מה חברים שלך יודעים עלייך</span>
                  <a
                     className="link-box__link"
                     href={`http://localhost:3000/${this.getCurrentUserId()}/my-ranks`}>
                     {`http://localhost:3000/${this.getCurrentUserId()}/my-ranks`}
                  </a>
               </div>
            </React.Fragment>
         );
      }
      if (this.props.mode === "addFriend") {
         return (
            <React.Fragment>
               <div className="link-box">
                  <span className="link-box__header">עכשיו הגיע תורך לחץ כאן כדי ליצור שאלון משלך</span>
                  <a className="link-box__link" href="http://localhost:3000">
                     http://localhost:3000
                  </a>
               </div>
            </React.Fragment>
         );
      }
   };

   render() {
      return (
         <div className="quiz-result-page">
            <div>{this.renderMessage()}</div>

            <table className="ranks-table">
               <thead className="ranks-table__header">
                  <tr className="ranks-table__row">
                     <th className="ranks-table__header-item">תוצאה</th>
                     <th className="ranks-table__header-item">שם </th>
                  </tr>
               </thead>
               <tbody className="ranks-table__body">{this.renderRanks()}</tbody>
            </table>
         </div>
      );
   }
}

export default QuizResultsPage;
