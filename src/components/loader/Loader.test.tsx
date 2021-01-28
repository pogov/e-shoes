import React from "react";
import Loader from "./Loader";
import { render, cleanup } from "@testing-library/react";

describe("Loader", () => {
  afterEach(() => cleanup());

  it("renders", () => {
    const renderLoader = () => render(<Loader />);
    expect(renderLoader).not.toThrow();
  });

  it("displays Loading... message", () => {
    const { getByText } = render(<Loader />);
    expect(getByText("Loading...")).not.toBeNull();
  });

  it("not displays Loading... message when errors", () => {
    const error = { message: "Error message" };
    const container = render(<Loader errors={error} />);
    expect(container.queryByText("Loading...")).toBeNull();
  });

  it("renders error message", () => {
    const error = { message: "Error message" };
    const { getByText } = render(<Loader errors={error} />);
    expect(getByText(error.message)).not.toBeNull();
  });
});
