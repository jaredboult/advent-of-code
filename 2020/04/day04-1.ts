import { readInput } from '../helperFunctions.ts';

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

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
    // requiredFields.forEach(field => {
    //     if (!Object.prototype.hasOwnProperty.call(passport, field))
    //         return false;
    // });
    for (const field of requiredFields){
        if (!Object.prototype.hasOwnProperty.call(passport, field))
            return false;
    }
    return true;
})

console.log(result.length);
