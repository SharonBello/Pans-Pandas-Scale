/** דירוג (0–5) לכל סימפטום */
export type RatingValue = 0 | 1 | 2 | 3 | 4 | 5;

/** מבנה של הסימפטום: מזהה + תווית + דירוג נבחר */
export interface SymptomGroup {
  id: string;
  label: string;
  rating: RatingValue;
}

/** טופס PANS/PANDAS כפי שחישובנו ידרוש */
export interface PansFormData {
  ocdSymptoms: SymptomGroup[];
  associatedSymptoms: SymptomGroup[];
  functionalImpairment: SymptomGroup[];
}

/** תוצאה (ניקודים) */
export interface PansScores {
  ocdScore: number;            // 0–25
  associatedScore: number;     // 0–25
  functionalScore: number;     // 0–50
  totalScore: number;          // 0–100
}
