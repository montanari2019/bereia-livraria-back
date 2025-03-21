export interface CachingInterface {
  getCaching<T>(key: string): Promise<T | null>;
  setCaching<T>(key: string, value: T, ttl: number): Promise<void>;
  clearCaching(key: string): Promise<void>;
}
