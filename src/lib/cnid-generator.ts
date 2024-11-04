import { cnidRegion } from "./cnid-region";

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomRegionCode() {
  const allRegionCodes = Object.keys(cnidRegion);
  const result = getRandomElement(allRegionCodes);
  return {
    regionCode: result,
    regionName: cnidRegion[result],
  }
}

function getRandomGender() {
  const genders = ["M", "F"];
  return getRandomElement(genders) as 'M' | 'F';
}
// 生成随机的出生日期
function getRandomBirthday(): string {
  const year = Math.floor(Math.random() * (2023 - 1950 + 1)) + 1950;
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
  return `${year}${month}${day}`;
}

// 生成顺序码，最后一位为奇数表示男性，偶数表示女性
function getRandomSequenceCode(gender: "M" | "F"): string {
  const random = Math.floor(Math.random() * 100);
  const lastDigit = gender === "M" ? 1 : 0;
  return `${String(random).padStart(2, "0")}${lastDigit}`;
}

// 计算校验码
function calculateCheckCode(idWithoutCheckCode: string): string {
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const checkCodeMap = "10X98765432";

  const sum = idWithoutCheckCode
    .split("")
    .reduce((acc, num, idx) => acc + parseInt(num, 10) * weights[idx], 0);

  const remainder = sum % 11;
  return checkCodeMap[remainder];
}

// 生成身份证号码
export function generateIDCard() {
  const { regionCode, regionName} = getRandomRegionCode();
  const birthday = getRandomBirthday();
  const gender = getRandomGender();
  const sequenceCode = getRandomSequenceCode(gender);
  const idWithoutCheckCode = `${regionCode}${birthday}${sequenceCode}`;
  const checkCode = calculateCheckCode(idWithoutCheckCode);
  return {
    cnid: `${idWithoutCheckCode}${checkCode}`,
    regionCode,
    regionName,
    birthday,
    gender,
    sequenceCode,
    checkCode
  }
}
