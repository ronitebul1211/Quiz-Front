import React from "react";
import "./WelcomePage.css";
import quizApi from "../api/quizApi";

class WelcomePage extends React.Component {
   state = { name: "" };

   onNameChange = (event) => {
      const updatedValue = event.target.value;
      this.setState({ name: updatedValue });
   };

   onStartClick = async () => {
      if (this.state.name.length <= 1) {
         return console.log("Enter valid name -> more than 1 char");
      }
      if (this.props.mode === "newUser") {
         const userId = await quizApi.createUser(this.state.name);
         return this.props.history.push(`/${userId}/quiz`);
         //TODO catch network error and update UI
      }
      if (this.props.mode === "addFriend") {
         const userId = this.props.match.params.userId;
         const friendId = await quizApi.createFriend(userId, this.state.name);
         return this.props.history.push(`/${userId}/${friendId}/quiz`);
         //TODO catch network error and update UI
      }
   };

   render() {
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
