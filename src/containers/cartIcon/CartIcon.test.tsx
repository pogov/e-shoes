import React from "react";
import CartIcon from "./CartIcon";
import { render } from "@testing-library/react";
import store from "../../redux/store/store";
import { Provider } from "react-redux";

const handler = jest.fn();

const Component = () => (
  <Provider store={store}>
    <CartIcon handler={handler} />
  </Provider>
);

describe("CartIcon", () => {
  it("renders", () => {
    const renderCartIcon = () => render(<Component />);
    expect(renderCartIcon).not.toThrow();
  });
});
