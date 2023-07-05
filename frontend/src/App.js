import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots";
import { Route } from "react-router-dom/";


import SpotPage from "./components/Spot";
import CreateSpot from "./components/CreateSpot"
import UpdateSpot from "./components/UpdateSpot";
import ManageSpots from "./components/ManageSpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch></Switch>}
      <Switch>
        <Route exact path="/" component={AllSpots} />
        <Route path="/spots/new" component={CreateSpot} />
        <Route path="/spots/current" component={ManageSpots}/>
        <Route path="/spots/:spotId/edit" component={UpdateSpot} />
        <Route path="/spots/:spotId" component={SpotPage} />
        <Route path="/reviews/current" />
      </Switch>
    </>
  );
}

export default App;
