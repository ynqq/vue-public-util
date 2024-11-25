export interface DataItem {
  id: number;
  width: number;
  height: number;
}

export interface DataResult {
  name: string;
  settingData: DataItem[];
}
