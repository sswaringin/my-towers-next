import storageAvailable from "./storageAvailable";

function updateLocalStorage<T>(key: string, value: T): void {
  try {
    const hasLocalStorage = storageAvailable("localStorage");
    if (!hasLocalStorage) return;

    const existingData = localStorage.getItem(key);
    const parsedData = existingData ? JSON.parse(existingData) : {};
    const mergedData = { ...parsedData, ...value };

    localStorage.setItem(key, JSON.stringify(mergedData));
  } catch (error) {
    console.error({ error });
  }
}

export default updateLocalStorage;
