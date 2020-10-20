import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

//Components
import WelcomePage from "./pages/WelcomePage";

const App = () => {
   return (
      <BrowserRouter>
         <div className="page-container">
            <Route path="/" exact render={(props) => <WelcomePage {...props} mode="newUser" />} />
            <Route
               path="/friend-quiz"
               exact
               render={(props) => <WelcomePage {...props} mode="addFriend" />}
            />
         </div>
      </BrowserRouter>
   );
};

export default App;
