export type FloorInput = {
  fixed: number;
  miles: number;
  fuel: number;
  maint: number;
  wage: number;
};

export type FloorResult = {
  fixedPer: number;
  total: number;
};

export function floorCost(input: FloorInput): FloorResult {
  const fixedPer = input.miles > 0 ? input.fixed / input.miles : 0;
  return {
    fixedPer,
    total: fixedPer + input.fuel + input.maint + input.wage,
  };
}

export function trueRate(pay: number, loaded: number, deadhead: number): number {
  const hub = loaded + deadhead;
  if (hub <= 0) return 0;
  return pay / hub;
}

export type Verdict = "under" | "thin" | "clear";

export function rateVerdict(rate: number, floor: number): Verdict {
  if (floor <= 0 || rate <= 0) return "under";
  if (rate < floor) return "under";
  if (rate < floor * 1.12) return "thin";
  return "clear";
}

export type WeightClass = {
  gcwr: number;
  cdl: boolean;
  margin: number;
  close: boolean;
};

/** Combination is judged by doorjamb GVWR, not scale weight. */
export function classifyWeight(truckGvwr: number, trailerGvwr: number): WeightClass {
  const gcwr = truckGvwr + trailerGvwr;
  const cdl = trailerGvwr >= 10001 && gcwr >= 26001;
  const margin = 26000 - gcwr;
  return { gcwr, cdl, margin, close: !cdl && margin >= 0 && margin <= 500 };
}

export function tieDownCount(lengthFt: number, weightLbs: number, machinery: boolean): number {
  const length = Math.max(0, lengthFt);
  const weight = Math.max(0, weightLbs);
  let count: number;
  if (length <= 5) count = weight <= 1100 ? 1 : 2;
  else if (length <= 10) count = 2;
  else count = 2 + Math.ceil((length - 10) / 10);
  if (machinery && weight > 10000) count = Math.max(count, 4);
  return count;
}

export function strengthCount(weightLbs: number, wllEach: number): number {
  if (weightLbs <= 0 || wllEach <= 0) return 0;
  return Math.ceil((weightLbs * 0.5) / wllEach);
}

export const STRAP_WLL = 5400;
export const CHAIN_WLL = 6600;
