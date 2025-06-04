import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './sections/Sections.scss';
import { PansFormData, RatingValue, SymptomGroup } from '../types/pansTypes';
import SurveySection from './SurveySection/SurveySection';
import FunctionalSection from './sections/FunctionalSection';
import { computeScores } from '../utils/computeScores';

const CalculatorForm: React.FC = () => {
  const navigate = useNavigate();

  // 1. הגדרת הנתונים ההתחלתיים לכל קבוצה
  const ocdInitial: SymptomGroup[] = [
    {
      id: 'ocd_contamination',
      label:
        'דאגות (חרדות) טורדניות ומתמשכות לגבי לכלוך וחיידקים, וכפייתיות רחצה קשורה.',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
    {
      id: 'ocd_harm',
      label:
        'דאגות (חרדות) טורדניות ומתמשכות לגבי פגיעה בעצמי או בזולת, וכפייתיות קשורה; צורך להיזהר מפגיעה או לספר/להתוודות.',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
    {
      id: 'ocd_sex_religion',
      label:
        'דאגות (חרדות) טורדניות ומתמשכות לגבי מחשבות או התנהגויות מיניות או דתיות, וטקסים כפייתיים קשורים.',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
    {
      id: 'ocd_symmetry',
      label:
        'דאגות טורדניות לגבי סימטריה וכפייתיות קשורה: סידור, ספירה או ארגון; צורך לגעת, להקיש או לשפשף; או צורך שדברים ירגישו/ייראו/יישמעו בדיוק נכון.',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
    {
      id: 'ocd_hoarding',
      label: 'דאגות (חרדות) טורדניות ומתמשכות לגבי איסוף ואגירה.',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
    {
      id: 'ocd_eating',
      label:
        'תסמיני צריכת מזון מגבילה ו/או נמנעת; הפרעת אכילה או האכלה (לרבות, חוסר עניין באכילה או במזון; הימנעות מבוססת על תחושות; דאגה לגבי השלכות) המובילה לסירוב לאכול (אנורקסיה לא טיפוסית).',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
    {
      id: 'ocd_misc',
      label:
        'שונות: צורך לדעת או לזכור; פחד מלומר/לא לומר דברים מסוימים; דימויים חודרניים; קולות חודרניים; צורך בטקסים חוזרים; צורך להכין רשימות; או אחרים (פרטו).',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
  ];

  const associatedInitial: SymptomGroup[] = [
    {
      id: 'assoc_separation',
      label: 'חרדת נטישה – צורך לשמור על קרבה לאדם, למקום מוכר או לחפץ.',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
    {
      id: 'assoc_general_anxiety',
      label: 'חרדה כללית.',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
    {
      id: 'assoc_phobias',
      label: 'פחדים ו/או פוביות לא רציונליים וחסרי בסיס.',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
    {
      id: 'assoc_panic',
      label: 'התקפי פאניקה.',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
    {
      id: 'assoc_mood_changes',
      label:
        'קשיי ויסות רגשי, דיכאון – תנודות קיצוניות במצב הרוח, ודיכאון עם או בלי מחשבות אובדניות.',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
    {
      id: 'assoc_irritability',
      label:
        'רגזנות מוגברת או תוקפנות – דרישות מתריסות, התקפי זעם או התפרצויות.',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
    {
      id: 'assoc_withdrawal',
      label:
        'נסיגה התנהגותית (“דיבור תינוקי”, שינוי באישיות); חוסר רצון לאינטראקציה.',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
    {
      id: 'assoc_school_function',
      label:
        'תפקוד בבית ספר, ריכוז/למידה – קשיים בקשב או בלמידה; בלבול; אובדן מיומנויות אקדמיות.',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
    {
      id: 'assoc_sensory',
      label:
        'תסמינים תחושתיים – רגישות לאור, טעם, ריח או מרקם; צורך לגעת בחפצים באופן ספציפי.',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
    {
      id: 'assoc_hallucinations',
      label: 'הזיות ראייה או שמיעה.',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
    {
      id: 'assoc_motor',
      label: 'תסמינים מוטוריים – דיסגרפיה, תנועות חריגות, טיקים מוטוריים או קוליים.',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
    {
      id: 'assoc_urinary',
      label: 'תסמינים במערכת השתן – תכיפות או דחיפות בשתן, חוסר יכולת לתת שתן.',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
    {
      id: 'assoc_sleep',
      label:
        'הפרעות שינה, עייפות – נדודי שינה, ישנוניות יתר, סיוטים או תשישות קיצונית.',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
    {
      id: 'assoc_pupil',
      label: 'אישונים מורחבים – “מבט מבועת”.',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
  ];

  const functionalInitial: SymptomGroup[] = [
    {
      id: 'functional_impairment',
      label: 'פגיעה תפקודית (0–5)',
      ratingBefore: 0 as RatingValue,
      ratingAfter: 0 as RatingValue,
      ratingCurrent: 0 as RatingValue,
    },
  ];

  // 2. סטייט לכל מדור
  const [ocdAnswers, setOcdAnswers] = useState<SymptomGroup[]>([...ocdInitial]);
  const [assocAnswers, setAssocAnswers] = useState<SymptomGroup[]>([...associatedInitial]);
  const [funcAnswers, setFuncAnswers] = useState<SymptomGroup[]>([...functionalInitial]);

  // 3. ניהול תצוגה: 0 = OCD, 1 = Associated, 2 = Functional, 3 = חישוב סופי
  const [sectionIndex, setSectionIndex] = useState<number>(0);

  // 4. טעינה/שמירה ב־localStorage
  useEffect(() => {
    const savedOCD = localStorage.getItem('ocdSymptoms');
    if (savedOCD) {
      try {
        setOcdAnswers(JSON.parse(savedOCD));
      } catch {}
    }
    const savedAssoc = localStorage.getItem('associatedSymptoms');
    if (savedAssoc) {
      try {
        setAssocAnswers(JSON.parse(savedAssoc));
      } catch {}
    }
    const savedFunc = localStorage.getItem('functionalImpairment');
    if (savedFunc) {
      try {
        setFuncAnswers(JSON.parse(savedFunc));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ocdSymptoms', JSON.stringify(ocdAnswers));
  }, [ocdAnswers]);

  useEffect(() => {
    localStorage.setItem('associatedSymptoms', JSON.stringify(assocAnswers));
  }, [assocAnswers]);

  useEffect(() => {
    localStorage.setItem('functionalImpairment', JSON.stringify(funcAnswers));
  }, [funcAnswers]);

  // 5. סיום מדור I
  const finishOcd = (answers: SymptomGroup[]) => {
    setOcdAnswers(answers);
    setSectionIndex(1);
  };

  // 6. סיום מדור II
  const finishAssoc = (answers: SymptomGroup[]) => {
    setAssocAnswers(answers);
    setSectionIndex(2);
  };

  // 7. סיום מדור III (פגיעה תפקודית)
  const finishFunctional = (answers: SymptomGroup[]) => {
    setFuncAnswers(answers);
    setSectionIndex(3);
  };

  // 8. חישוב סופי
  const handleCalculate = () => {
    const formData: PansFormData = {
      ocdSymptoms: ocdAnswers,
      associatedSymptoms: assocAnswers,
      functionalImpairment: funcAnswers,
    };
    const scores = computeScores(formData);
    navigate('/results', { state: { formData, scores } });
  };

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Paper elevation={3} sx={{ p: 2, maxWidth: 900, mx: 'auto' }}>
        {/* ===== מדור I: שאלון OCD “שאלה אחר שאלה” ===== */}
        {sectionIndex === 0 && (
          <SurveySection
            title="I. תסמיני OCD"
            items={ocdAnswers}
            onComplete={finishOcd}
          />
        )}

        {/* ===== מדור II: שאלון תסמינים נלווים “שאלה אחר שאלה” ===== */}
        {sectionIndex === 1 && (
          <SurveySection
            title="II. תסמינים נלווים"
            items={assocAnswers}
            onComplete={finishAssoc}
          />
        )}

        {/* ===== מדור III: פגיעה תפקודית – טבלה אנכית ===== */}
        {sectionIndex === 2 && (
          <>
            <FunctionalSection
              items={funcAnswers}
              onItemChange={(id, value: any) => {
                setFuncAnswers([
                  {
                    id: funcAnswers[0].id,
                    label: funcAnswers[0].label,
                    ratingBefore: funcAnswers[0].ratingBefore,
                    ratingAfter: funcAnswers[0].ratingAfter,
                    ratingCurrent: value as RatingValue,
                  },
                ]);
              }}
            />
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button variant="contained" onClick={() => finishFunctional(funcAnswers)}>
                סיים מדור III
              </Button>
            </Box>
          </>
        )}

        {/* ===== שלב סופי: הצג כפתור חישוב סופי ===== */}
        {sectionIndex === 3 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" gutterBottom>
              כל המדורים הושלמו!
            </Typography>
            <Button variant="contained" size="large" onClick={handleCalculate}>
              חשב ניקוד סופי
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default CalculatorForm;
