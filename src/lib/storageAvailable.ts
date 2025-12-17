function storageAvailable(
  type: "localStorage" | "sessionStorage"
): boolean | undefined {
  let storage;
  try {
    if (window !== undefined) {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export default storageAvailable;
