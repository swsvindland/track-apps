export enum Unit {
    Imperial = "Imperial",
    Metric = "Metric",
}

export enum Sex {
    Male,
    Female,
}

export const centimetersToInches = (centimeters: number) => {
    return centimeters / 2.54;
};

export const bodyFat = (
    sex: number,
    navel: number,
    hip: number,
    neck: number,
    height: number,
) => {
    if (sex === Sex.Male) {
        return maleBodyFat(Unit.Imperial, navel, neck, height);
    }
    return femaleBodyFat(Unit.Imperial, navel, hip, neck, height);
};

export const maleBodyFat = (
    unit: string,
    navel: number,
    neck: number,
    height: number,
) => {
    const navelInches =
        unit === Unit.Imperial ? navel : centimetersToInches(navel);
    const neckInches =
        unit === Unit.Imperial ? neck : centimetersToInches(neck);
    const heightInches =
        unit === Unit.Imperial ? height : centimetersToInches(height);

    return (
        86.01 * Math.log10(navelInches - neckInches) -
        70.041 * Math.log10(heightInches) +
        36.76
    );
};

export const femaleBodyFat = (
    unit: string,
    navel: number,
    hip: number,
    neck: number,
    height: number,
) => {
    const navelInches =
        unit === Unit.Imperial ? navel : centimetersToInches(navel);
    const neckInches =
        unit === Unit.Imperial ? neck : centimetersToInches(neck);
    const heightInches =
        unit === Unit.Imperial ? height : centimetersToInches(height);
    const hipInches = unit === Unit.Imperial ? hip : centimetersToInches(hip);

    return (
        163.205 * Math.log10(navelInches + hipInches - neckInches) -
        97.684 * Math.log10(heightInches) -
        78.387
    );
};
