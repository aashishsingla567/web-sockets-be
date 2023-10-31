export const addApostropheS = (str: string) => {
  // if the last character is not s, add 's
  if (str[str.length - 1] !== "s") {
    return `${str}'s`;
  }
  return `${str}'`;
};
