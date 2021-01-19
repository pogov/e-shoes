import React from "react";
import { BrowserRouter } from "react-router-dom";
import ItemCard from "./ItemCard";
import { render } from "@testing-library/react";

const item = {
  _id: "234juhjhf87",
  type: "sport",
  name: "name1",
  price: 123,
  description: "jdhfjshdiu",
  sizes: [42, 43, 45],
  tags: ["sport"],
  imgSrc: "http://imgsrc.com",
};

describe("ItemCard", () => {
  it("renders without throwing errors", () => {
    const renderItemCard = () =>
      render(
        <BrowserRouter>
          <ItemCard {...item} />
        </BrowserRouter>,
      );
    expect(renderItemCard).not.toThrow();
  });

  it("renders sizes", () => {
    const container = render(
      <BrowserRouter>
        <ItemCard {...item} />
      </BrowserRouter>,
    );
    item.sizes.forEach((size) =>
      expect(container.queryByText(size)).not.toBeNull(),
    );
  });
  it("renders img with correct src", () => {
    const container = render(
      <BrowserRouter>
        <ItemCard {...item} />
      </BrowserRouter>,
    );
    expect(container.queryByAltText(item.name)).toHaveAttribute(
      "src",
      item.imgSrc,
    );
  });
});
