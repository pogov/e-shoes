import React from "react";
import { render } from "@testing-library/react";
import CartDetails from "./CartDetails";

const item = {
  _id: "234juhjhf87",
  type: "sport",
  name: "name2",
  price: 123,
  description: "jdhfjshdiu",
  size: 45,
  sizes: [42, 43, 45],
  tags: ["sport"],
  imgSrc: "",
  quantity: 1,
};

describe("CartDetails", () => {
  it("not throws any exception", () => {
    const renderCartDetails = () =>
      render(<CartDetails item={item} cart={false} />);

    expect(renderCartDetails).not.toThrow();
  });

  it("renders items details ", () => {
    const { getByText } = render(<CartDetails item={item} cart={false} />);
    expect(getByText(item.name)).not.toBeNull();
    expect(getByText(item.price)).not.toBeNull();
  });

  it("displays size and quantity", () => {
    const { getByText } = render(<CartDetails item={item} cart={false} />);
    expect(getByText("size", { exact: false })).toHaveTextContent(
      item.size.toString(),
    );
    expect(getByText("quantity", { exact: false })).toHaveTextContent(
      item.quantity.toString(),
    );
  });

  it("displays qBtns", () => {
    const incr = jest.fn();
    const decr = jest.fn();
    const del = jest.fn();
    const container = render(
      <CartDetails
        item={item}
        cart={true}
        increase={incr}
        decrease={decr}
        deleteItem={del}
      />,
    );
    expect(container.queryByText("+")).not.toBeNull();
    expect(container.queryByText("-")).not.toBeNull();
  });
});
