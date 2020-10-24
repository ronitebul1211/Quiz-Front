import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

//Components
import WelcomePage from "./pages/WelcomePage";
import QuizPage from "./pages/QuizPage";
import QuizResultsPage from "./pages/QuizResultsPage";

const App = () => {
   return (
      <BrowserRouter>
         <div className="page-container">
            <Route path="/" exact render={(props) => <WelcomePage {...props} mode="newUser" />} />
            <Route path="/:userId" exact render={(props) => <WelcomePage {...props} mode="addFriend" />} />
            <Route path="/:userId/quiz" exact render={(props) => <QuizPage {...props} mode="newUser" />} />
            <Route
               path="/:userId/:friendId/quiz"
               exact
               render={(props) => <QuizPage {...props} mode="addFriend" />}
            />
            <Route
               path="/:userId/my-ranks"
               exact
               render={(props) => <QuizResultsPage {...props} mode="newUser" />}
            />
            <Route
               path="/:userId/my-friend-ranks"
               exact
               render={(props) => <QuizResultsPage {...props} mode="addFriend" />}
            />
         </div>
      </BrowserRouter>
   );
};

export default App;
