export interface ICompany {
  id: number;
  name: string;
}

export interface IUnit {
  id: number;
  name: string;
  companyId: number;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  unitId: number;
  companyId: number;
}

export type IItem = IUser | IAsset

export interface IAsset {
  id: number;
  sensors: string[];
  model: string;
  status: string;
  healthscore: number;
  name: string;
  image: string;
  specifications: object;
  metrics: {
    totalCollectsUptime: number
    totalUptime: number
    lastUptimeAt: string
  };
  unitId: number;
  companyId: number;
}