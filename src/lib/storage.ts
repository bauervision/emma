const APP_PREFIX = "emma"; // slugified prefix

export function storageKey(suffix: string) {
  return `${APP_PREFIX}:${suffix}`;
}
