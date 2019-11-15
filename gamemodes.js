export function setGamemode(gamemode) {
  if (gamemode === "") {
    return "Practice";
  }
  else if (gamemode === "Practice") {
    return "Normal";
  }
  else if (gamemode === "Normal") {
    return "Practice";
  }
}

export function setInstructions(gamemode) {
  if (gamemode === "") {
    return "Umlimited tries, practice as much as you want"
  }
  else if (gamemode === "Practice") {
    return "Limited tries, finish before using more attempts than there are dots in the grid";
  }
  else if (gamemode === "Normal") {
    return "Umlimited tries, practice as much as you want";
  }
}
