import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header from "../../components/UI/Header";

test("renders brand", () => {
  render(<Header />);
  const destinav = screen.getByText("DestiNav");
  expect(destinav).toBeInTheDocument();
});
