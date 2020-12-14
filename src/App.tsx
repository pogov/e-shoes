import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import ItemDetails from "./components/itemDetails/ItemDetails";
import Main from "./pages/Main";
import CartDetails from "./components/cartDetails/CartDetails";
import MainTemplate from "./templates/MainTemplate";
import shoesStore from "./stores/shoesStore";
import { Provider } from "react-redux";
import "./App.scss";

const App: React.FC = () => {
  return (
    <Provider store={shoesStore}>
      <BrowserRouter>
        <MainTemplate>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/items/:id" component={ItemDetails} />
            <Route exact path="/cart" component={CartDetails} />
          </Switch>
        </MainTemplate>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
