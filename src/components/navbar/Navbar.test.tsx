import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Navbar from "./NavBar";
import store from "../../redux/store/store";
import { Provider } from "react-redux";

describe("NavBar", () => {
  afterEach(() => {
    cleanup();
  });

  const Component = () => (
    <Provider store={store}>
      <Navbar />
    </Provider>
  );

  it("renders", () => {
    const renderNavBar = () => render(<Component />);
    expect(renderNavBar).not.toThrow();
  });

  it("calls toggle", () => {
    const { getByTestId, getByText } = render(<Component />);
    fireEvent.click(getByTestId("icon"));
    expect(getByText("cart is empty", { exact: false })).not.toBeNull();
  });
});
