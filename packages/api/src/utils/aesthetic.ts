import { Sex } from "./bodyFat";

export const goldenRatioStatus = (sex: number, ratio: number) => {
    if (sex === Sex.Male) return maleGoldenRatioStatus(ratio);
    return femaleGoldenRatioStatus(ratio);
};

export const goldenRatio = (shoulders: number, waist: number) => {
    return shoulders / waist;
};

export const maleGoldenRatioStatus = (ratio: number) => {
    if (ratio < 1.6) return "Waist To Big";
    if (ratio < 1.8) return "Good";
    return "Shoulders To Big";
};

export const femaleGoldenRatioStatus = (ratio: number) => {
    if (ratio < 1.3) return "Waist To Big";
    if (ratio < 1.5) return "Good";
    return "Shoulders To Big";
};

export const symmetry = (left: number, right: number) => {
    return left / right;
};

export const symmetryStatus = (symmetry: number) => {
    if (symmetry < 0.95) return "Left To Big";
    if (symmetry < 1.05) return "Good";
    return "Right To Big";
};
