import characters from "./characters";

function generateRandomCharacters(length: number, chars: string) {
  let output = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    output += chars.substring(randomIndex, randomIndex + 1);
  }
  return output;
}

export default function generatePasswords(requirements: {
  length: number;
  numbers: boolean;
  uppercase: boolean;
  lowercase: boolean;
  symbols: boolean;
}) {
  let slice = Math.floor(requirements.length / Object.values(requirements).filter((item) => item === true).length);
  if (slice <= 0) slice = 1;

  let output = "";
  let leftSlice = requirements.length;

  if (requirements.symbols && leftSlice > 0) {
    output += generateRandomCharacters(slice, characters.symbols);
    leftSlice -= slice;
  }
  if (requirements.numbers && leftSlice > 0) {
    output += generateRandomCharacters(slice, characters.numbers);
    leftSlice -= slice;
  }
  if (requirements.lowercase && leftSlice > 0) {
    output += generateRandomCharacters(slice, characters.lowercase);
    leftSlice -= slice;
  }
  if (requirements.uppercase && leftSlice > 0) {
    output += generateRandomCharacters(slice, characters.uppercase);
    leftSlice -= slice;
  }
  return output
    .split("")
    .sort(() => {
      return Math.random() > 0.5 ? 1 : -1;
    })
    .join("");
}
