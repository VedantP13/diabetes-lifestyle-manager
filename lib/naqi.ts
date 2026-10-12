export type Band = [number, number, number, number]; // [BP_lo, BP_hi, I_lo, I_hi]

export const PM25_BANDS: Band[] = [
  [0, 30, 0, 50], [31, 60, 51, 100], [61, 90, 101, 200],
  [91, 120, 201, 300], [121, 250, 301, 400], [251, 9999, 401, 500],
];
export const PM10_BANDS: Band[] = [
  [0, 50, 0, 50], [51, 100, 51, 100], [101, 250, 101, 200],
  [251, 350, 201, 300], [351, 430, 301, 400], [431, 9999, 401, 500],
];

export function calcNAQI(cp: number, bands: Band[]): number {
  for (const [bplo, bphi, ilo, ihi] of bands) {
    if (cp <= bphi) {
      return Math.round(((ihi - ilo) / (bphi - bplo)) * (Math.max(cp, bplo) - bplo) + ilo);
    }
  }
  return 500;
}

export const computeAQI = (pm25: number, pm10: number) =>
  Math.max(calcNAQI(pm25, PM25_BANDS), calcNAQI(pm10, PM10_BANDS));

export const isUnsafeOutdoors = (tempC: number, aqi: number) => tempC > 35 || aqi > 200;

export type MovementMode = 'recovery' | 'indoor' | 'standard';
export const chooseMovementMode = (sleepDeprived: boolean, unsafe: boolean): MovementMode =>
  sleepDeprived ? 'recovery' : unsafe ? 'indoor' : 'standard';