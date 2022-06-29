import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  const title = "test title";
  const icon = React.createElement("div", "icon");
  render(<Header icon={<div>icon</div>} title={title} />);

  const iconElement = screen.getByText(/icon/i);
  const titleElement = screen.getByText("test title");
  const headerElement = screen.getByRole("heading");

  test("has an icon and a title", () => {
    expect(iconElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });
  test("has an icon cloned with custom class", () => {
    expect(iconElement).toHaveClass("itemIcon");
  });
  test("has a heading tag", () => {
    expect(headerElement).toBeVisible;
  });
});
