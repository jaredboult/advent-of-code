import { readInput } from '../helperFunctions.ts';

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const validEyeColors = new Set(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]);

const passports = readInput()
    .split('\n\n')
    .map(passport => {
        const result : Record<string, string> = {};
        const entries = passport.split(/\s/);
        entries.forEach((entry) => {
            const [key, value] = entry.split(":");
            result[key] = value;
        });
        return result;
    });

const result = passports.filter((passport) => {
    return validateFieldsPresent(passport) &&
        validateBirthYear(passport['byr']) &&
        validateIssueYear(passport['iyr']) &&
        validateExpirationYear(passport['eyr']) &&
        validateHeight(passport['hgt']) &&
        validateHairColor(passport['hcl']) &&
        validateEyeColor(passport['ecl']) &&
        validatePassportId(passport['pid']);
})

function validateFieldsPresent(record: Record<string, string>) {
    for (const field of requiredFields){
        if (!Object.prototype.hasOwnProperty.call(record, field))
            return false;
    }
    return true;
}

function validateBirthYear(value: string){
    return validateYear(value, 1920, 2002);
}

function validateIssueYear(value: string){
    return validateYear(value, 2010, 2020);
}

function validateExpirationYear(value: string){
    return validateYear(value, 2020, 2030);
}

function validateHeight(value: string){
    if (value.endsWith('cm')){
        const height = Number.parseInt(value.split("cm")[0], 10);
        return height <= 193 && height >= 150;
    }
    else if (value.endsWith('in')){
        const height = Number.parseInt(value.split("in")[0], 10);
        return height <= 76 && height >= 59;
    }
    return false;
}

function validateHairColor(value: string){
    if (!value.startsWith("#")){
        return false;
    }
    const hex = value.split("#")[1];
    for (let i = 0; i < hex.length; i++){
        const code = hex.charCodeAt(i);
        return (code >= 48 && code <= 57) || (code >= 97 && code <= 103);
    }
}

function validateEyeColor(value: string){
    return validEyeColors.has(value);
}

function validatePassportId(value: string){
    return value.length === 9 && !Number.isNaN(Number.parseInt(value, 10));
}

function validateYear(value: string, min: number, max: number){
    const year = Number.parseInt(value, 10);
    return value.length === 4 && year >= min && year <= max;
}

console.log(result.length);