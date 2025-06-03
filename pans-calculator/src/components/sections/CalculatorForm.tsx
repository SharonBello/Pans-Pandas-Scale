// src/components/CalculatorForm.tsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Button,
  Paper,
  Typography,
  Divider,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PansFormData, SymptomGroup } from '../../types/pansTypes';
import { computeScores } from '../../utils/computeScores';
import OCDSection from './OCDSection';
import AssociatedSection from './AssociatedSection';
import FunctionalSection from './FunctionalSection';


const CalculatorForm: React.FC = () => {
  // 1. סטייטים התחלתיים
  const ocdInitial: SymptomGroup[] = [
    { id: 'ocd_contamination', label: 'דאגות לגבי לכלוך וחיידקים', rating: 0 },
    { id: 'ocd_harm', label: 'דאגות לגבי פגיעה בעצמי/בזולת', rating: 0 },
    { id: 'ocd_sex_religion', label: 'דאגות לגבי מחשבות מיניות/דתיות', rating: 0 },
    { id: 'ocd_symmetry', label: 'דאגות לגבי סימטריה וסדר', rating: 0 },
    { id: 'ocd_hoarding', label: 'דאגות לגבי איסוף ואגירה', rating: 0 },
    { id: 'ocd_eating', label: 'תסמיני אכילה מוגבל/מניעתי', rating: 0 },
    { id: 'ocd_misc', label: `סימפטומים "מנטליים" נוספים`, rating: 0 },
  ];
  const associatedInitial: SymptomGroup[] = [
    { id: 'assoc_separation', label: 'חרדת נטישה', rating: 0 },
    { id: 'assoc_general_anxiety', label: 'חרדה כללית', rating: 0 },
    { id: 'assoc_phobias', label: 'פחדים/פוביות', rating: 0 },
    { id: 'assoc_panic', label: 'התקפי פאניקה', rating: 0 },
    { id: 'assoc_mood_changes', label: 'תנודות קיצוניות במצב רוח', rating: 0 },
    { id: 'assoc_irritability', label: 'רגזנות/תקיפה', rating: 0 },
    { id: 'assoc_cognitive', label: 'קשיי למידה/בלבול', rating: 0 },
    { id: 'assoc_withdrawal', label: 'נסיגה התנהגותית', rating: 0 },
    { id: 'assoc_sensory', label: 'תסמינים תחושתיים', rating: 0 },
    { id: 'assoc_hallucinations', label: 'הזיות', rating: 0 },
    { id: 'assoc_motor', label: 'תסמינים מוטוריים (טיקים)', rating: 0 },
    { id: 'assoc_urinary', label: 'תסמיני מערכת השתן', rating: 0 },
    { id: 'assoc_sleep', label: 'הפרעות שינה/עייפות', rating: 0 },
    { id: 'assoc_pupil', label: 'אישונים מורחבים', rating: 0 },
  ];
  const functionalInitial: SymptomGroup[] = [
    { id: 'functional_impairment', label: 'פגיעה תפקודית (0–5)', rating: 0 },
  ];

  const [ocdSymptoms, setOcdSymptoms] = useState<SymptomGroup[]>(ocdInitial);
  const [associatedSymptoms, setAssociatedSymptoms] = useState<SymptomGroup[]>(associatedInitial);
  const [functionalImpairment, setFunctionalImpairment] = useState<SymptomGroup[]>(functionalInitial);

  const [scores, setScores] = useState<null | ReturnType<typeof computeScores>>(null);

  // 2.שימור וטעינת נתונים מה־LocalStorage
  useEffect(() => {
    const savedOCD = localStorage.getItem('ocdSymptoms');
    if (savedOCD) {
      try {
        setOcdSymptoms(JSON.parse(savedOCD));
      } catch {
        console.warn('שגיאה בפרשנות ocdSymptoms מ־localStorage');
      }
    }
    const savedAssoc = localStorage.getItem('associatedSymptoms');
    if (savedAssoc) {
      try {
        setAssociatedSymptoms(JSON.parse(savedAssoc));
      } catch {
        console.warn('שגיאה בפרשנות associatedSymptoms מ־localStorage');
      }
    }
    const savedFunc = localStorage.getItem('functionalImpairment');
    if (savedFunc) {
      try {
        setFunctionalImpairment(JSON.parse(savedFunc));
      } catch {
        console.warn('שגיאה בפרשנות functionalImpairment מ־localStorage');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ocdSymptoms', JSON.stringify(ocdSymptoms));
  }, [ocdSymptoms]);
  useEffect(() => {
    localStorage.setItem('associatedSymptoms', JSON.stringify(associatedSymptoms));
  }, [associatedSymptoms]);
  useEffect(() => {
    localStorage.setItem('functionalImpairment', JSON.stringify(functionalImpairment));
  }, [functionalImpairment]);

  // 3. חישוב אחוז התקדמות
  const totalFields =
    ocdSymptoms.length + associatedSymptoms.length + functionalImpairment.length;
  const filledCount =
    ocdSymptoms.filter((s) => s.rating > 0).length +
    associatedSymptoms.filter((s) => s.rating > 0).length +
    functionalImpairment.filter((s) => s.rating > 0).length;
  const progressPercent = Math.round((filledCount / totalFields) * 100);

  // 4. handlers לעדכון סטייט
  const handleOcdChange = (id: string, value: number) => {
    setOcdSymptoms((prev) =>
      prev.map((item) => (item.id === id ? { ...item, rating: value as any } : item))
    );
  };
  const handleAssociatedChange = (id: string, value: number) => {
    setAssociatedSymptoms((prev) =>
      prev.map((item) => (item.id === id ? { ...item, rating: value as any } : item))
    );
  };
  const handleFunctionalChange = (id: string, value: number) => {
    setFunctionalImpairment([{ id, label: functionalImpairment[0].label, rating: value as any }]);
  };

  const handleCalculate = () => {
    const formData: PansFormData = {
      ocdSymptoms,
      associatedSymptoms,
      functionalImpairment,
    };
    const result = computeScores(formData);
    setScores(result);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        מחשבון מדד PANS/PANDAS
      </Typography>

      {/* 4.1. סרגל התקדמות */}
      <Box sx={{ width: '100%', mb: 2 }}>
        <Typography variant="body2" color="textSecondary" align="right">
          {`${progressPercent}% הושלם`}
        </Typography>
        <LinearProgress variant="determinate" value={progressPercent} />
      </Box>

      <Paper elevation={3} sx={{ p: 3 }}>
        {/* 4.2. מדור I: OCD בתוך אקורדיון */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">I. תסמיני OCD</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <OCDSection items={ocdSymptoms} onItemChange={handleOcdChange} />
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ my: 2 }} />

        {/* 4.3. מדור II: סימפטומים נלווים בתוך אקורדיון */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">II. תסמינים נלווים</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AssociatedSection
              items={associatedSymptoms}
              onItemChange={handleAssociatedChange}
            />
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ my: 2 }} />

        {/* 4.4. מדור III: פגיעה תפקודית בתוך אקורדיון */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">III. פגיעה תפקודית</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FunctionalSection
              items={functionalImpairment}
              onItemChange={handleFunctionalChange}
            />
          </AccordionDetails>
        </Accordion>

        {/* 4.5. כפתור חישוב */}
        <Box textAlign="center" sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleCalculate}>
            חשב ניקוד
          </Button>
        </Box>
      </Paper>

      {/* 4.6. הצגת תוצאות (עטוף בתוך div עם id ספציפי) */}
      {scores && (
        <Box sx={{ mt: 4 }}>
          {/* div הזה הוא מה שברצוננו להדפיס */}
          <div id="printable-area">
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6">תוצאות החישוב:</Typography>
              <Typography>ניקוד OCD: {scores.ocdScore} מתוך 25</Typography>
              <Typography>
                ניקוד סימפטומים נלווים: {scores.associatedScore} מתוך 25
              </Typography>
              <Typography>
                ניקוד פגיעה תפקודית: {scores.functionalScore} מתוך 50
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="h5">
                ניקוד כולל: {scores.totalScore} מתוך 100
              </Typography>
            </Paper>
          </div>

          {/* 4.7. כפתור הדפסה פשוט */}
          <Box textAlign="center" sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => window.print()}
            >
              הדפס / ייצא PDF
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default CalculatorForm;
