import { ALL_KOHLI_INNINGS, InningRecord } from '../data/allInningsData';

const STORAGE_KEY = 'vk_custom_innings_data_v1';

export function getCustomInnings(): InningRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse custom innings from localStorage', err);
    return [];
  }
}

export function getAllInnings(): InningRecord[] {
  const custom = getCustomInnings();
  if (!custom || custom.length === 0) {
    return ALL_KOHLI_INNINGS;
  }

  // Create a map by date+format to allow custom AI additions to override or supplement static entries
  const recordMap = new Map<string, InningRecord>();

  // Add baseline entries first
  ALL_KOHLI_INNINGS.forEach((rec) => {
    const key = `${rec.date}_${rec.format}`;
    recordMap.set(key, rec);
  });

  // Add or override with custom entries from AI Agent search
  custom.forEach((rec) => {
    const key = `${rec.date}_${rec.format}`;
    recordMap.set(key, rec);
  });

  // Sort descending by date
  return Array.from(recordMap.values()).sort((a, b) => b.date.localeCompare(a.date));
}

export function saveCustomInnings(innings: InningRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getCustomInnings();
    const map = new Map<string, InningRecord>();
    
    existing.forEach((item) => map.set(item.id, item));
    innings.forEach((item) => map.set(item.id, item));

    const merged = Array.from(map.values());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));

    // Dispatch event for UI reactivity
    window.dispatchEvent(new CustomEvent('vk_innings_updated'));
  } catch (err) {
    console.error('Failed to save custom innings', err);
  }
}

export function deleteCustomInning(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getCustomInnings();
    const filtered = existing.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent('vk_innings_updated'));
  } catch (err) {
    console.error('Failed to delete custom inning', err);
  }
}

export function clearCustomInnings(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('vk_innings_updated'));
  } catch (err) {
    console.error('Failed to clear custom innings', err);
  }
}
