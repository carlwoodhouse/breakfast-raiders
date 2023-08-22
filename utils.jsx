export function csvToArray(csv, delimiter = ",") {
    if (csv === null) {
        return [];
    }

    if (!isNaN(csv)) {
        return [csv];
    }

    return csv.split(delimiter);
}

export function csvToIntArray(csv, delimiter = ",") {
    return csvToArray(csv, delimiter).map(Number);
}

export function characterScoreCompare(a, b) {
    if (Number(a.mp_score) === Number(b.mp_score)) { return Number(a.ilvl) > Number(b.ilvl) ? -1 : 1  } else return Number(a.mp_score) < Number(b.mp_score) ? 1: -1 
  }
  
export function slug(str) {
    return str.replace(" ", "-").toLowerCase();
}