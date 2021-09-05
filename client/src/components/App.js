import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import RecipeList from "../pages/RecipeList";
import NewRecipe from "../pages/NewRecipe";
import MainPage from "../pages/MainPage";
import CryptoChatter from "../pages/CryptoChatter";
import NewChatter from "../pages/NewChatter";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/chatter">
            <CryptoChatter user={user} />
          </Route>
          <Route path="/newchatter">
            <NewChatter user={user} />
          </Route>
          <Route path="/">
            <MainPage />
            {/* <RecipeList /> */}
          </Route>
          <Route path="/new">
            <NewRecipe user={user} />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
