import React, { useEffect } from "react";
import ItemsList from "../components/itemsList/ItemsList";
import { getItems } from "../actions/shoesActions";
import { connect } from "react-redux";

const Main: React.FC = ({ getItems }: any) => {
  useEffect(() => {
    getItems();
  });
  return (
    <main style={{ paddingTop: "50px", width: "90%", margin: "0 auto" }}>
      <ItemsList />
    </main>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getItems: () => dispatch(getItems()),
  };
};

export default connect(null, mapDispatchToProps)(Main);
