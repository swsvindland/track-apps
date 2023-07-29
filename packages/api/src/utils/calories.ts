import { Sex } from "./bodyFat";

export const bmiBasedCalories = (bmi: number, weight: number) => {
    if (bmi < 18.5) {
        return weight * 16;
    } else if (bmi < 25) {
        return weight * 14;
    } else if (bmi < 30) {
        return weight * 12;
    } else {
        return weight * 10;
    }
};

export const bfBasedCalories = (sex: number, bf: number, weight: number) => {
    return sex === Sex.Male
        ? bfBasedCaloriesMale(bf, weight)
        : bfBasedCaloriesFemale(bf, weight);
};

export const bfBasedCaloriesMale = (bf: number, weight: number) => {
    if (bf < 8) {
        return weight * 16;
    } else if (bf < 15) {
        return weight * 14;
    } else if (bf < 25) {
        return weight * 12;
    } else {
        return weight * 10;
    }
};

export const bfBasedCaloriesFemale = (bf: number, weight: number) => {
    if (bf < 18) {
        return weight * 16;
    } else if (bf < 25) {
        return weight * 14;
    } else if (bf < 35) {
        return weight * 12;
    } else {
        return weight * 10;
    }
};

export const computeMacros = (calories: number, weight: number) => {
    const caloriesLow = calories * 0.9;
    const caloriesHigh = calories * 1.1;
    const proteinLow = weight * 0.8;
    const proteinHigh = weight * 1.2;
    const fatLow = weight * 0.3;
    const fatHigh = weight * 0.5;
    const carbsLow = (caloriesLow - proteinHigh * 4 - fatHigh * 9) / 4;
    const carbsHigh = (caloriesHigh - proteinLow * 4 - fatLow * 9) / 4;
    const fiberLow = calories * 0.01;
    const fiberHigh = calories * 0.02;

    return {
        caloriesLow,
        caloriesHigh,
        proteinLow,
        proteinHigh,
        fatLow,
        fatHigh,
        carbsLow,
        carbsHigh,
        fiberLow,
        fiberHigh,
    };
};

export const getMacrosBMI = (bmi: number, weight: number) => {
    const calories = bmiBasedCalories(bmi, weight);
    return computeMacros(calories, weight);
};

export const getMacrosBF = (sex: number, bf: number, weight: number) => {
    const calories = bfBasedCalories(sex, bf, weight);
    return computeMacros(calories, weight);
};
