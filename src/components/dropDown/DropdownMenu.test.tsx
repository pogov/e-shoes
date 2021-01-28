import React from "react";
import { fireEvent, render } from "@testing-library/react";
import DropdownMenu from "./DropdownMenu";

describe("DropdownMenu", () => {
  it("renders", () => {
    const list = ["a", "b"];
    const handler = jest.fn();
    const renderComponent = () =>
      render(
        <DropdownMenu list={list} header="HeaderTest" handler={handler} />,
      );
    expect(renderComponent).not.toThrow();
  });

  it("displays header", () => {
    const list = ["a", "b"];
    const clickHandler = jest.fn();
    const container = render(
      <DropdownMenu list={list} header="HeaderTest" handler={clickHandler} />,
    );
    expect(container.queryByText("HeaderTest")).not.toBeNull();
  });

  it("displays options", () => {
    const list = ["a", "b"];
    const clickHandler = jest.fn();
    const { getByTestId, getByText } = render(
      <DropdownMenu list={list} header="HeaderTest" handler={clickHandler} />,
    );
    const container = getByTestId("header");
    fireEvent.click(container);
    list.forEach((item) => expect(getByText(item)).not.toBeNull());
  });

  it("displays no dropdown when list in empty", () => {
    const list: string[] = [];
    const clickHandler = jest.fn();
    const { getByTestId } = render(
      <DropdownMenu list={list} header="HeaderTest" handler={clickHandler} />,
    );
    const container = getByTestId("header");
    fireEvent.click(container);
    const dropdownList = getByTestId("optionsList");
    expect(dropdownList.childElementCount).toBe(0);
  });

  it("clicking on an option calls handler", () => {
    const list = ["a", "b"];
    const clickHandler = jest.fn();
    const { getByTestId, queryByText } = render(
      <DropdownMenu list={list} header="HeaderTest" handler={clickHandler} />,
    );
    const container = getByTestId("header");
    fireEvent.click(container);
    const optionListItem = queryByText("a") as HTMLButtonElement;
    fireEvent.click(optionListItem);
    expect(clickHandler).toHaveBeenCalled();
  });
});
