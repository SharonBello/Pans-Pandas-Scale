// src/components/CalculatorForm.tsx
import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SymptomGroup, PansFormData, RatingValue } from '../types/pansTypes';
import { computeScores } from '../utils/computeScores';
import SurveySection from './SurveySection';
import FunctionalSection from './sections/FunctionalSection';
import './sections/Sections.scss'

const CalculatorForm: React.FC = () => {
  const navigate = useNavigate();

  const ocdInitial: SymptomGroup[] = [
    {
      id: 'ocd_contamination',
      label:
        'דאגות (חרדות) טורדניות ומתמשכות לגבי לכלוך וחיידקים, וכפייתיות רחצה קשורה.',
      rating: 0,
    },
    {
      id: 'ocd_harm',
      label:
        'דאגות (חרדות) טורדניות ומתמשכות לגבי פגיעה בעצמי או בזולת, וכפייתיות קשורה; צורך להיזהר מפגיעה או לספר/להתוודות.',
      rating: 0,
    },
    {
      id: 'ocd_sex_religion',
      label:
        'דאגות (חרדות) טורדניות ומתמשכות לגבי מחשבות או התנהגויות מיניות או דתיות, וטקסים כפייתיים קשורים.',
      rating: 0,
    },
    {
      id: 'ocd_symmetry',
      label:
        'דאגות טורדניות לגבי סימטריה וכפייתיות קשורה: סידור, ספירה או ארגון; צורך לגעת, להקיש או לשפשף; או צורך שדברים ירגישו/ייראו/יישמעו בדיוק נכון.',
      rating: 0,
    },
    {
      id: 'ocd_hoarding',
      label: 'דאגות (חרדות) טורדניות ומתמשכות לגבי איסוף ואגירה.',
      rating: 0,
    },
    {
      id: 'ocd_eating',
      label:
        'תסמיני צריכת מזון מגבילה ו/או נמנעת; הפרעת אכילה או האכלה (לרבות, אך לא רק: חוסר עניין לכאורה באכילה או במזון; הימנעות המבוססת על מאפיינים תחושתיים של המזון; או דאגה לגבי השלכות שליליות של אכילה) המובילה לסירוב לאכול (אנורקסיה לא טיפוסית) או לירידה ניכרת בצריכת המזון.',
      rating: 0,
    },
    {
      id: 'ocd_misc',
      label:
        'שונות: צורך לדעת או לזכור; פחד מלומר דברים מסוימים; פחד לא לומר בדיוק את הדבר הנכון; דימויים חודרניים (לא אלימים); צלילים, מילים, מוזיקה או מספרים חודרניים; צורך לחזור על פעולות (למשל, להיכנס ולצאת מפתח דלת, לקום ולשבת מכיסא); צורך לערב אדם אחר בטקס (למשל, לבקש מהורה לענות שוב ושוב על אותה שאלה); טקסים מנטליים שאינם בדיקה/ספירה; הכנת רשימות מוגזמת; או אחר (פרטו).',
      rating: 0,
    },
  ];

  const associatedInitial: SymptomGroup[] = [
    {
      id: 'assoc_separation',
      label: 'חרדת נטישה – צורך לשמור על קרבה לאדם, למקום מוכר או לחפץ.',
      rating: 0,
    },
    { id: 'assoc_general_anxiety', label: 'חרדה כללית.', rating: 0 },
    { id: 'assoc_phobias', label: 'פחדים ו/או פוביות לא רציונליים וחסרי בסיס.', rating: 0 },
    { id: 'assoc_panic', label: 'התקפי פאניקה.', rating: 0 },
    {
      id: 'assoc_mood_changes',
      label:
        'קשיי ויסות רגשי, דיכאון – קשיי ויסות רגשי (תנודות קיצוניות במצב הרוח), ודיכאון עם או בלי מחשבות אובדניות.',
      rating: 0,
    },
    {
      id: 'assoc_irritability',
      label:
        'רגזנות מוגברת או התנהגות תוקפנית – דרישות מתריסות/לא הגיוניות; התנהגות תוקפנית תגובתית, התקפי זעם או התפרצויות.',
      rating: 0,
    },
    {
      id: 'assoc_withdrawal',
      label:
        'נסיגה התנהגותית ("דיבור תינוקי", התנהגות שאינה אופיינית לגיל הכרונולוגי); שינוי באישיות.',
      rating: 0,
    },
    {
      id: 'assoc_school_function',
      label:
        'תפקוד בבית הספר, ריכוז / למידה – קשיים בקשב, בריכוז או בלמידה; אובדן מיומנויות אקדמיות; בלבול.',
      rating: 0,
    },
    {
      id: 'assoc_sensory',
      label:
        'תסמינים תחושתיים – רגישות מוגברת לאור, לאופן שבו דברים "מרגישים" (למשל תוויות בבגדים), או "נשמעים"; צורך לגעת בדברים בצורה מסוימת; עיוות מרחבי (למשל, חפצים נראים קרובים יותר ממה שהם באמת); רגישות לריח או טעם.',
      rating: 0,
    },
    {
      id: 'assoc_hallucinations',
      label: 'הזיות ראייה או שמיעה.',
      rating: 0,
    },
    {
      id: 'assoc_motor',
      label:
        'תסמינים מוטוריים – דיסגרפיה (אובדן יכולת לצייר/להעתיק/לכתוב); היפראקטיביות מוטורית או תנועות חריגות/בלתי רצוניות (הקשות, היפוכים וכוʹ); תנועות אצבעות "כמו נגינה בפסנתר"; טיקים מוטוריים או קוליים (פשוטים או מורכבים, כולל חזרה על מילים או פעולות גסות).',
      rating: 0,
    },
    {
      id: 'assoc_urinary',
      label:
        'תסמינים במערכת השתן – תכיפות במתן שתן או דחיפות מוגברת במתן שתן, ביום או בלילה; חוסר יכולת לתת שתן.',
      rating: 0,
    },
    {
      id: 'assoc_sleep',
      label:
        'הפרעות שינה, עייפות – בעיות שינה (טקסי שינה ארוכים, נדודי שינה, חוסר יכולת לישון; ישנוניות יתר, סיוטים) או עייפות רבה/תשישות קיצונית.',
      rating: 0,
    },
    {
      id: 'assoc_pupil',
      label: 'אישונים מורחבים – "מבט מבועת".',
      rating: 0,
    },
  ];

  const functionalInitial: SymptomGroup[] = [
    {
      id: 'functional_impairment',
      label: 'פגיעה תפקודית', // הפרטים של תיאור הרמה בעמודה בטבלה עצמה
      rating: 0,
    },
  ];

  const [ocdAnswers, setOcdAnswers] = useState<SymptomGroup[]>([...ocdInitial]);
  const [assocAnswers, setAssocAnswers] = useState<SymptomGroup[]>([...associatedInitial]);
  const [funcAnswers, setFuncAnswers] = useState<SymptomGroup[]>([...functionalInitial]);

  const [sectionIndex, setSectionIndex] = useState<number>(0);

  useEffect(() => {
    const savedOCD = localStorage.getItem('ocdSymptoms');
    if (savedOCD) {
      try {
        setOcdAnswers(JSON.parse(savedOCD));
      } catch { }
    }
    const savedAssoc = localStorage.getItem('associatedSymptoms');
    if (savedAssoc) {
      try {
        setAssocAnswers(JSON.parse(savedAssoc));
      } catch { }
    }
    const savedFunc = localStorage.getItem('functionalImpairment');
    if (savedFunc) {
      try {
        setFuncAnswers(JSON.parse(savedFunc));
      } catch { }
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

  const finishOcd = (answers: SymptomGroup[]) => {
    setOcdAnswers(answers);
    setSectionIndex(1); // עוברים למדור II
  };

  const finishAssoc = (answers: SymptomGroup[]) => {
    setAssocAnswers(answers);
    setSectionIndex(2); // עוברים למדור III
  };

  const finishFunctional = (answers: SymptomGroup[]) => {
    setFuncAnswers(answers);
    setSectionIndex(3); // עוברים לחישוב סופי
  };

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
    <Box sx={{ width: '100%' }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {sectionIndex === 0 && (
          <SurveySection
            title="I. תסמיני OCD"
            items={ocdAnswers}
            onComplete={finishOcd}
          />
        )}

        {sectionIndex === 1 && (
          <SurveySection
            title="II. תסמינים נלווים"
            items={assocAnswers}
            onComplete={finishAssoc}
          />
        )}

        {sectionIndex === 2 && (
          <FunctionalSection
            items={funcAnswers}
            onItemChange={(id, value) =>
              setFuncAnswers([
                {
                  id,
                  label: funcAnswers[0].label,
                  rating: value as RatingValue,
                },
              ])
            }
          />
        )}
        {sectionIndex === 2 && (
          <Box textAlign="center" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={() => finishFunctional(funcAnswers)}>
              סיים מדור III
            </Button>
          </Box>
        )}

        {sectionIndex === 3 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              כל המדורים הושלמו!
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCalculate}>
              חשב ניקוד סופי
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default CalculatorForm;
