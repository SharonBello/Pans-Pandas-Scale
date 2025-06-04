export type RatingValue = 0 | 1 | 2 | 3 | 4 | 5;

export interface SymptomGroup {
  id: string;
  label: string;
  ratingBefore: RatingValue; // שבוע לפני הופעה ראשונה
  ratingAfter: RatingValue; // שבוע אחרי הופעה ראשונה
  ratingCurrent: RatingValue; // 7 ימים אחרונים
}

export interface PansFormData {
  ocdSymptoms: SymptomGroup[];
  associatedSymptoms: SymptomGroup[];
  functionalImpairment: SymptomGroup[];
}

export interface PansScores {
  ocdScore: number; // 0–25
  associatedScore: number; // 0–25
  functionalScore: number; // 0–50
  totalScore: number; // 0–100
}

export interface PansFormData {
  ocdSymptoms: SymptomGroup[];
  associatedSymptoms: SymptomGroup[];
  functionalImpairment: SymptomGroup[];
}
