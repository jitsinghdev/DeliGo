import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};
export const API_BASE_URL: string = extra.API_BASE_URL;
export const REQUEST_TIMEOUT_MS = 10000; // 10 segundos