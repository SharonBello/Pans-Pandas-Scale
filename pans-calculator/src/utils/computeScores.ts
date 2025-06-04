import { PansFormData } from "../types/pansTypes";

export function computeScores(data: PansFormData): {
  before: number;
  after: number;
  current: number;
  total: number;
} {
  const { ocdSymptoms, associatedSymptoms, functionalImpairment } = data;

  // ---- מדור I: OCD ----
  // ניקוד OCD בכל טווח – ניקוד = max(ratingX) * 5
  const maxOCD_before = Math.max(
    ...ocdSymptoms.map((s) => s.ratingBefore as number)
  );
  const maxOCD_after = Math.max(
    ...ocdSymptoms.map((s) => s.ratingAfter as number)
  );
  const maxOCD_current = Math.max(
    ...ocdSymptoms.map((s) => s.ratingCurrent as number)
  );

  const scoreOCD_before = maxOCD_before * 5;
  const scoreOCD_after = maxOCD_after * 5;
  const scoreOCD_current = maxOCD_current * 5;

  // ---- מדור II: Associated ----
  // ניקוד = סכום 5 הערכים הגבוהים ביותר מתוך 14 (בכל טווח)
  function sumTop5(arr: number[]): number {
    const sortedDesc = [...arr].sort((a, b) => b - a);
    return sortedDesc.slice(0, 5).reduce((sum, v) => sum + v, 0);
  }

  const assoc_beforeArr = associatedSymptoms.map(
    (s) => s.ratingBefore as number
  );
  const assoc_afterArr = associatedSymptoms.map((s) => s.ratingAfter as number);
  const assoc_currentArr = associatedSymptoms.map(
    (s) => s.ratingCurrent as number
  );

  const scoreAssoc_before = sumTop5(assoc_beforeArr);
  const scoreAssoc_after = sumTop5(assoc_afterArr);
  const scoreAssoc_current = sumTop5(assoc_currentArr);

  // ---- מדור III: Functional ----
  // ניקוד = ratingCurrent * 10 (אנחנו מניחים שאיננו ממנפים את before/after למדור הזה)
  const func = functionalImpairment[0];
  const scoreFunc_before = (func.ratingBefore as number) * 10;
  const scoreFunc_after = (func.ratingAfter as number) * 10;
  const scoreFunc_current = (func.ratingCurrent as number) * 10;

  // ---- חישוב כללי לכל טווח ----
  const before = scoreOCD_before + scoreAssoc_before + scoreFunc_before;
  const after = scoreOCD_after + scoreAssoc_after + scoreFunc_after;
  const current = scoreOCD_current + scoreAssoc_current + scoreFunc_current;

  // ניקוד כולל
  const total = before + after + current;

  return {
    before,
    after,
    current,
    total,
  };
}
