import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils/cn";

describe("cn class merging utility", () => {
  it("should merge basic classnames correctly", () => {
    expect(cn("bg-red-500", "text-white")).toBe("bg-red-500 text-white");
  });

  it("should handle conditional/falsy classnames correctly", () => {
    expect(cn("bg-red-500", false && "text-white", null, undefined, "flex")).toBe("bg-red-500 flex");
  });

  it("should correctly resolve tailwind conflicts", () => {
    expect(cn("px-2 py-1", "p-4")).toBe("p-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });
});
