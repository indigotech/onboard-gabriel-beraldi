import AsyncStorage from "@react-native-async-storage/async-storage";

export function storeData(key: string, value: string): Promise<void> {
  return AsyncStorage.setItem(key, value);
}

export function getData(key: string): Promise<string | null> {
  return AsyncStorage.getItem(key);
}
