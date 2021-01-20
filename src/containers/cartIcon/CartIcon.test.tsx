import React from "react";
import CartIcon from "./CartIcon";
import { fireEvent, render, cleanup } from "@testing-library/react";
import configureStore, { MockStore } from "redux-mock-store";
import { Provider } from "react-redux";

const handler = jest.fn();

const mockStore = configureStore([]);

describe("CartIcon", () => {
  let store: MockStore;

  beforeEach(() => {
    store = mockStore({
      cart: { itemCount: 2, isItem: true },
    });
  });

  afterEach(() => cleanup());

  const Component = () => (
    <Provider store={store}>
      <CartIcon onClick={handler} />
    </Provider>
  );
  it("renders", () => {
    const renderCartIcon = () => render(<Component />);
    expect(renderCartIcon).not.toThrow();
  });
  it("displays correct itemCount value", () => {
    const { getByTestId } = render(<Component />);
    expect(getByTestId("number")).toHaveTextContent("2");
  });
  it("when clicked it calls handler", () => {
    const { getByTestId } = render(<Component />);
    fireEvent.click(getByTestId("icon"));
    expect(handler).toBeCalledTimes(1);
  });
});
