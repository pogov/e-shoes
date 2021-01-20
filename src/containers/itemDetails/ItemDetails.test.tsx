import React from "react";
import { fireEvent, render, cleanup } from "@testing-library/react";
import configureStore, { MockStore } from "redux-mock-store";
import { Provider } from "react-redux";
import ItemDetails from "./ItemDetails";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureStore([]);

const item = {
  _id: "234juhjhf87",
  type: "sport",
  name: "name2",
  price: 123,
  description: "jdhfjshdiu",
  size: 45,
  sizes: [42, 43, 45],
  tags: ["sport", "comfy"],
  imgSrc: "",
  quantity: 1,
};

const handleClick = jest.fn();

describe("ItemDetails", () => {
  let store: MockStore;
  beforeEach(() => {
    store = mockStore({
      shoe: {
        _id: "234juhjhf87",
        type: "sport",
        name: "name2",
        price: 123,
        description: "jdhfjshdiu",
        size: 45,
        sizes: [42, 43, 45],
        tags: ["sport", "comfy"],
        imgSrc: "",
        quantity: 1,
      },
    });
    store.dispatch = jest.fn();
  });

  afterEach(() => cleanup());

  const Component = ({ testSize }: { testSize: number }) => (
    <BrowserRouter>
      <Provider store={store}>
        <ItemDetails
          item={item}
          chosenSize={testSize}
          handleClick={handleClick}
        />
      </Provider>
    </BrowserRouter>
  );

  it("renders", () => {
    const renderItemDetails = () => render(<Component testSize={45} />);
    expect(renderItemDetails).not.toThrow();
  });

  it("displays error message when size is not chosen", () => {
    const { getByTestId, getByText } = render(<Component testSize={0} />);
    fireEvent.click(getByTestId("addItem"));
    expect(
      getByText("Please choose your size", { exact: false }),
    ).not.toBeNull();
  });

  it("displays all item tags", () => {
    const { getByText } = render(<Component testSize={45} />);
    item.tags.forEach((tag) => expect(getByText(tag)).toHaveTextContent(tag));
  });

  it("calls redux action", () => {
    const { getByTestId } = render(<Component testSize={45} />);
    fireEvent.click(getByTestId("addItem"));
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
