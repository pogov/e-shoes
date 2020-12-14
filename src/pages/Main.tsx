import React, { useEffect } from "react";
import ItemsList from "../components/itemsList/ItemsList";
import { getItems } from "../actions/shoesActions";
import { connect } from "react-redux";

const Main: React.FC = ({ getItems }: any) => {
  useEffect(() => {
    getItems();
  });
  return (
    <div style={{ paddingTop: "50px", width: "90%", margin: "0 auto" }}>
      <ItemsList />
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getItems: () => dispatch(getItems()),
  };
};

export default connect(null, mapDispatchToProps)(Main);

// const [items, setItems] = useState<ItemsListProps[]>([]);
// useEffect(() => {
//   fetch("http://localhost:5500/api/items")
//     .then((res) => res.json())
//     .then((data) => setItems(data))
//     .catch((err) => console.error(err));
// }, []);
