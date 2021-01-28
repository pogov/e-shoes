import React, { useEffect } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getItems } from "./redux/actions/shoesActions";
import Main from "./pages/Main";
import Checkout from "./pages/Checkout";
import MainTemplate from "./layouts/MainTemplate";
import ItemDetailsTemplate from "./pages/ItemDetailsTemplate";
import "./App.scss";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { StateType } from "./interfaces/StateType";

interface Props {
  getItems: (page: number, limit: number) => Promise<void>;
}

const App: React.FC<Props> = ({ getItems }) => {
  useEffect(() => {
    getItems(1, 9);
  }, [getItems]);

  return (
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/items/:id" component={ItemDetailsTemplate} />
          <Route exact path="/cart" component={Checkout} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, undefined, AnyAction>,
) => {
  return {
    getItems: (page: number, limit: number, query?: string) =>
      dispatch(getItems(page, limit, query)),
  };
};

export default connect(null, mapDispatchToProps)(App);
