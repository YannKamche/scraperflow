// A utility function to slow down things in the application
export function waitFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
