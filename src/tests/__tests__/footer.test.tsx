import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/footer/Footer";

test("Footer", () => {
  render(<Footer />);

  expect(
    screen.getByRole("heading", {
      name: /company/i,
    }),
  ).toBeInTheDocument();
});
