import Parse from "parse";

export const createUser = (user) => {
    const newUser = new Parse.User();
    
    // Check that passwords match
    if (user.password !== user.confirm){
        alert("Passwords do not match!");
        return Promise.resolve(false);
    }

    newUser.set("username", user.username);
    newUser.set("firstname", user.firstname);
    newUser.set("lastname", user.lastname);
    newUser.set("password", user.password);
    newUser.set("email", user.email);
    
    return newUser.signUp().then((newUserSaved) => {
        return newUserSaved;
        }).catch((error) => {
            alert(`Error: ${error.message}`);
    });
};

// Log in user with built-in logIn() function
export const loginUser = async (credentials) =>{
    return Parse.User.logIn(credentials.username, credentials.password).then((loggedIn) => {
        return loggedIn;
    }).catch((error) => {
        alert(`Error: ${error.message}`); 
    });
};

export const isAuthed = () => {
    const user = Parse.User.current();
    const authed = user !== null;
    return authed;
};