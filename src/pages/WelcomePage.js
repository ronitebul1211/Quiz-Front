import React from "react";
import "./WelcomePage.css";
import api from "../api/quizApi";

class WelcomePage extends React.Component {
   state = { name: "" };
   // api.getQuizData();

   onNameChange = (event) => {
      const updatedValue = event.target.value;
      this.setState({ name: updatedValue });
   };

   onStartClick = () => {
      //create user / friend in endpoint by mode
      // if response succeed get user id and open new quiz componenet
      this.props.history.push("/15/51/quiz");
      if (this.props.mode === "newUser") {
         //create user in endpoint
         //response succeed
         //return open new quiz /:userId/quiz
      }
      if (this.props.mode === "addFriend") {
         //get user id from url
         //create friend in endpoint
         //response succeed
         //return open new quiz /:userId/:friendId/quiz
      }
   };

   render() {
      //TODO: Set instruction's by mode
      console.log(this.props.mode);
      return (
         <div>
            <div className="instruction">
               <span className="instruction__title">הוראות</span>
               <span className="instruction__item">1. הזן את שמך</span>
               <span className="instruction__item">2. ענה על החידון</span>
               <span className="instruction__item">3. בסיום תקבל קישור</span>
               <span className="instruction__item">
                  4. שתף עם חברים ובקש מהם לענות את התשובות הנכונות לגביך
               </span>
               <span className="instruction__item">5. בדוק את הניקוד של חבריך בקישור החידון</span>
            </div>
            <div className="user-form">
               <input
                  className="user-form__name-input"
                  placeholder="הכנס שם"
                  value={this.state.name}
                  onChange={this.onNameChange}
               />
               <button className="user-form__submit-btn" onClick={this.onStartClick}>
                  התחל
               </button>
            </div>
         </div>
      );
   }
}
export default WelcomePage;
