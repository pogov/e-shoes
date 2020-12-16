import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Main from "./pages/Main";
import CartDetails from "./components/cartDetails/CartDetails";
import MainTemplate from "./templates/MainTemplate";
import "./App.scss";
import ItemDetailsTemplate from "./templates/ItemDetailsTemplate";
import { getItems } from "./actions/shoesActions";
import { connect } from "react-redux";

const App: React.FC = ({ getItems }: any) => {
  React.useEffect(() => {
    getItems(1, 9);
  }, [getItems]);
  return (
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/items/:id" component={ItemDetailsTemplate} />
          <Route exact path="/cart" component={CartDetails} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getItems: (page: number, limit: number) => dispatch(getItems(page, limit)),
  };
};

export default connect(null, mapDispatchToProps)(App);
