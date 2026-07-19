import "@testing-library/jest-dom";

// Mock localStorage for Zustand persist middleware
if (typeof window !== "undefined") {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      length: 0,
      key: () => "",
    };
  })();
  
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
    writable: true,
  });
}
