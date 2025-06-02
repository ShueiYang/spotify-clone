import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock Next.js headers
vi.mock("next/headers", async () => {
  return {
    cookies: () => {
      return {
        get: () => {
          return {
            value: "cookie",
          };
        },
      };
    },
  };
});
