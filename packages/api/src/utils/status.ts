import { Sex } from "./bodyFat";

export const inchToMeter = (inch: number) => {
    return inch * 0.0254;
};

export const poundToKilogram = (pound: number) => {
    return pound * 0.453592;
};

export const computeBMI = (height: number, weight: number) => {
    const heightInMeter = inchToMeter(height);
    const weightInKilogram = poundToKilogram(weight);

    return weightInKilogram / (heightInMeter * heightInMeter);
};

enum BMIStatus {
    Underweight = "Underweight",
    Normal = "Normal",
    Overweight = "Overweight",
    Obese = "Obese",
}

enum HeartRateStatus {
    Low = "Low",
    Normal = "Normal",
    High = "High",
}

export const bmiStatus = (bmi: number) => {
    if (bmi < 18.5) return BMIStatus.Underweight;
    if (bmi < 25) return BMIStatus.Normal;
    if (bmi < 30) return BMIStatus.Overweight;
    return BMIStatus.Obese;
};

export const bodyFatStatus = (bf: number, sex: number) => {
    if (sex === Sex.Male) {
        if (bf < 8) return BMIStatus.Underweight;
        if (bf < 15) return BMIStatus.Normal;
        if (bf < 25) return BMIStatus.Overweight;
        return BMIStatus.Obese;
    }

    if (bf < 18) return BMIStatus.Underweight;
    if (bf < 25) return BMIStatus.Normal;
    if (bf < 35) return BMIStatus.Overweight;
    return BMIStatus.Obese;
};

export const heartRateStatus = (heartRate: number) => {
    if (heartRate < 50) return HeartRateStatus.Low;
    if (heartRate < 70) return HeartRateStatus.Normal;
    return HeartRateStatus.High;
};
