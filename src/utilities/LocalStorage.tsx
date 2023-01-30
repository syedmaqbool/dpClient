export function set<T>(key: string, object: T) {
  const stringifiedObject = JSON.stringify(object);
  localStorage.setItem(key, stringifiedObject);
}

export function get<T>(key: string): T | null {
  const stringifiedObject = localStorage.getItem(key);
  if (stringifiedObject) {
    return JSON.parse(stringifiedObject);
  }
  return null;
}

export function remove(key: string) {
  localStorage.removeItem(key);
}
