import storageAvailable from "./storageAvailable";

function getLocalStorage<T>(key: string): T | undefined {
  try {
    const hasLocalStorage = storageAvailable("localStorage");
    if (!hasLocalStorage) return;

    const existingData = localStorage.getItem(key);
    if (!existingData) return;

    return JSON.parse(existingData) as T;
  } catch (error) {
    console.error({ error });
  }
}

export default getLocalStorage;
