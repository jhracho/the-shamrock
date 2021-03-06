import React from "react";
import HomePage from "./Home/HomePage.js";
import AboutPage from "./About/AboutPage.js";
import CreateProtected from "./Create/CreateProtected.js";
import LoginProtected from "./Auth/LoginProtected.js";
import SignUpProtected from "./Auth/SignUpProtected.js";
import LogOutProtected from "./Auth/LogOutProtected.js";
import EditProtected from "./Edit/EditProtected.js";
import AuthorPage from "./Author/AuthorPage.js";
import PostPage from "./Post/PostPage.js";
import ProfileProtected from "./Profile/ProfileProtected.js"
import NavBar from "./NavBar/NavBar.js";

import{
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

const Components = () => {
  return(
     <Router>
       <NavBar />
       <Switch>
         <Route path="/" exact component={HomePage} />
         <Route path="/about" component={AboutPage} />
         <Route path="/create" component={CreateProtected} />
         <Route path="/login" component={LoginProtected} />
         <Route path="/signup" component={SignUpProtected} />
         <Route path="/logout" component={LogOutProtected} />
         <Route path="/edit/:postId" component={EditProtected} />
         <Route path="/author/:displayname" component={AuthorPage} />    
         <Route path="/post/:id" component={PostPage} />
         <Route path="/profile" component={ProfileProtected} />
         <Redirect to="/" />
       </Switch>
     </Router>
  );
};

export default Components;