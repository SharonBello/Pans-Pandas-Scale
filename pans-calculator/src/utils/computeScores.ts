import { PansFormData, PansScores, RatingValue } from "../types/pansTypes";

/**
 * מחשב את ניקוד OCD: מוציא את הערך המרבי (0–5) ומכפיל ב-5 => 0–25
 */
function computeOCDScore(ocdSymptoms: { rating: RatingValue }[]): number {
  const maxRating = Math.max(...ocdSymptoms.map((s) => s.rating));
  return maxRating * 5;
}

/**
 * מחשב את ניקוד הסימפטומים הנלווים: לוקח את 5 הערכים הגבוהים ביותר (0–5) ומסכם => 0–25
 */
function computeAssociatedScore(
  associatedSymptoms: { rating: RatingValue }[]
): number {
  // מייצרים מערך של ערכי ה–rating (RatingValue[]) וממיינים בסדר יורד
  const sortedRatings = associatedSymptoms
    .map((s) => s.rating)
    .sort((a, b) => b - a);

  // חותכים את חמשת הערכים הגבוהים ביותר
  const topFive = sortedRatings.slice(0, 5);

  // כאן מגדירים מפורש שה–reduce מוחזר כ–number
  const sumTopFive = topFive.reduce<number>((sum, val) => sum + val, 0);

  return sumTopFive;
}

/**
 * מחשב את ניקוד הפגיעה התפקודית: מכפיל את הדירוג (0–5) ב-10 => 0–50
 */
function computeFunctionalScore(
  functionalSymptoms: { rating: RatingValue }[]
): number {
  if (functionalSymptoms.length === 0) return 0;
  const rating = functionalSymptoms[0].rating;
  return rating * 10;
}

/**
 * פונקציה מרכזית שמקבלת את כל הנתונים ומחזירה את כל הניקודים
 */
export function computeScores(formData: PansFormData): PansScores {
  const ocdScore = computeOCDScore(formData.ocdSymptoms);
  const associatedScore = computeAssociatedScore(formData.associatedSymptoms);
  const functionalScore = computeFunctionalScore(formData.functionalImpairment);
  const totalScore = ocdScore + associatedScore + functionalScore;

  return {
    ocdScore,
    associatedScore,
    functionalScore,
    totalScore,
  };
}
