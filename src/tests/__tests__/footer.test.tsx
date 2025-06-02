import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/footer/Footer";

test("Correctly render Footer", () => {
  render(<Footer />);

  expect(
    screen.getByRole("heading", {
      name: /company/i,
    }),
  ).toBeInTheDocument();

  expect(screen.getByText("About")).toBeInTheDocument();
  expect(screen.getByText("Jobs")).toBeInTheDocument();
  expect(screen.getByText("For the Record")).toBeInTheDocument();

  expect(
    screen.getByRole("heading", {
      name: /communities/i,
    }),
  ).toBeInTheDocument();

  expect(screen.getByText("For Artists")).toBeInTheDocument();
  expect(screen.getByText("Developers")).toBeInTheDocument();
  expect(screen.getByText("Advertising")).toBeInTheDocument();
  expect(screen.getByText("Investors")).toBeInTheDocument();

  expect(
    screen.getByRole("heading", {
      name: /source code/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("link", {
      name: /github/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /discord/i,
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: /battle\.net/i,
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: /instagram/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByText(/©2025 spotify clone by shueiyang/i),
  ).toBeInTheDocument();
});
