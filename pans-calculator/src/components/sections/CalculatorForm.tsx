// src/components/CalculatorForm.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { PansFormData, SymptomGroup } from '../../types/pansTypes';
import { computeScores } from '../../utils/computeScores';
import OCDSection from './OCDSection';
import AssociatedSection from './AssociatedSection';
import FunctionalSection from './FunctionalSection';


const CalculatorForm: React.FC = () => {
  const navigate = useNavigate();

  const ocdInitial: SymptomGroup[] = [
    {
      id: 'ocd_contamination',
      label: 'דאגות (חרדות) טורדניות ומתמשכות לגבי לכלוך וחיידקים, וכפייתיות רחצה קשורה.',
      rating: 0,
    },
    {
      id: 'ocd_harm',
      label: 'דאגות (חרדות) טורדניות ומתמשכות לגבי פגיעה בעצמי או בזולת, וכפייתיות קשורה; צורך להיזהר מפגיעה או לספר/להתוודות.',
      rating: 0,
    },
    {
      id: 'ocd_sex_religion',
      label: 'דאגות (חרדות) טורדניות ומתמשכות לגבי מחשבות או התנהגויות מיניות או דתיות, וטקסים כפייתיים קשורים.',
      rating: 0,
    },
    {
      id: 'ocd_symmetry',
      label: 'דאגות טורדניות לגבי סימטריה וכפייתיות קשורה: סידור, ספירה או ארגון; צורך לגעת, להקיש או לשפשף; או צורך שדברים ירגישו/ייראו/יישמעו בדיוק נכון.',
      rating: 0,
    },
    {
      id: 'ocd_hoarding',
      label: 'דאגות (חרדות) טורדניות ומתמשכות לגבי איסוף ואגירה.',
      rating: 0,
    },
    {
      id: 'ocd_eating',
      label: 'תסמיני צריכת מזון מגבילה ו/או נמנעת; הפרעת אכילה או האכלה (לרבות, אך לא רק: חוסר עניין לכאורה באכילה או במזון; הימנעות המבוססת על מאפיינים תחושתיים של המזון; או דאגה לגבי השלכות שליליות של אכילה) המובילה לסירוב לאכול (אנורקסיה לא טיפוסית) או לירידה ניכרת בצריכת המזון.',
      rating: 0,
    },
    {
      id: 'ocd_misc',
      label: 'שונות: צורך לדעת או לזכור; פחד מלומר דברים מסוימים; פחד לא לומר בדיוק את הדבר הנכון; דימויים חודרניים (לא אלימים); צלילים, מילים, מוזיקה או מספרים חודרניים; צורך לחזור על פעולות (למשל, להיכנס ולצאת מפתח דלת, לקום ולשבת מכיסא); צורך לערב אדם אחר בטקס (למשל, לבקש מהורה לענות שוב ושוב על אותה שאלה); טקסים מנטליים שאינם בדיקה/ספירה; הכנת רשימות מוגזמת; או אחר (פרטו).',
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
      label: 'קשיי ויסות רגשי, דיכאון – קשיי ויסות רגשי (תנודות קיצוניות במצב הרוח), ודיכאון עם או בלי מחשבות אובדניות.',
      rating: 0,
    },

    {
      id: 'assoc_irritability',
      label: 'רגזנות מוגברת או התנהגות תוקפנית – דרישות מתריסות/לא הגיוניות; התנהגות תוקפנית תגובתית, התקפי זעם או התפרצויות.',
      rating: 0,
    },

    {
      id: 'assoc_withdrawal',
      label: 'נסיגה התנהגותית ("דיבור תינוקי", התנהגות שאינה אופיינית לגיל הכרונולוגי); שינוי באישיות.',
      rating: 0,
    },

    {
      id: 'assoc_school_function',
      label: 'תפקוד בבית הספר, ריכוז / למידה – קשיים בקשב, בריכוז או בלמידה; אובדן מיומנויות אקדמיות; בלבול.',
      rating: 0,
    },

    {
      id: 'assoc_sensory',
      label: 'תסמינים תחושתיים – רגישות מוגברת לאור, לאופן שבו דברים "מרגישים" (למשל תוויות בבגדים), או "נשמעים"; צורך לגעת בדברים בצורה מסוימת; עיוות מרחבי (למשל, חפצים נראים קרובים יותר ממה שהם באמת); רגישות לריח או טעם.',
      rating: 0,
    },

    {
      id: 'assoc_hallucinations',
      label: 'הזיות ראייה או שמיעה.',
      rating: 0,
    },

    {
      id: 'assoc_motor',
      label: 'תסמינים מוטוריים – דיסגרפיה (אובדן יכולת לצייר/להעתיק/לכתוב); היפראקטיביות מוטורית או תנועות חריגות/בלתי רצוניות (הקשות, היפוכים וכו\'); תנועות אצבעות "כמו נגינה בפסנתר"; טיקים מוטוריים או קוליים (פשוטים או מורכבים, כולל חזרה על מילים או פעולות גסות).',
      rating: 0,
    },

    {
      id: 'assoc_urinary',
      label: 'תסמינים במערכת השתן – תכיפות במתן שתן או דחיפות מוגברת במתן שתן, ביום או בלילה; חוסר יכולת לתת שתן.',
      rating: 0,
    },

    {
      id: 'assoc_sleep',
      label: 'הפרעות שינה, עייפות – בעיות שינה (טקסי שינה ארוכים, נדודי שינה, חוסר יכולת לישון; ישנוניות יתר, סיוטים) או עייפות רבה/תשישות קיצונית.',
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
      label:
        `פגיעה תפקודית כללית:  
(0 = אין; 1 = מינימלית; 2 = קלה; 3 = בינונית; 4 = חמורה; 5 = קיצונית).  
תיאור רמות:  
• 0 – אין פגיעה: תפקוד רגיל (לימודים, בית, חברים).  
• 1 – מינימלית (10): מינימום הפרעות בתפקוד יומיומי; התנהלות עצמאית.  
• 2 – קלה (20): הפרעות קלות בתפקוד (קושי קל בלמידה, שינוי קל בהתנהגות או חוסר עניין בפעילות).  
• 3 – בינונית (30): הפרעות ממוצעות בתפקוד (קושי משמעותי בלימודים, שינוי משמעותי בהתנהגות החברתית, נסיגה מסוימת מחברים ופעילויות).  
• 4 – חמורה (40): הפרעות חמורות בתפקוד (אי יכולת לשוב ללימודים, הימנעות מלאה ממשימות יומיומיות, שינוי מהותי בהתנהגות החברתית).  
• 5 – קיצונית (50): פגיעה תפקודית קיצונית, חוסר יכולת כמעט מוחלט לבצע פעולות יומיומיות, מצוקה קשה, צורך בסיוע צמוד.`,
      rating: 0,
    },
  ];

  const [ocdSymptoms, setOcdSymptoms] = useState<SymptomGroup[]>(ocdInitial);
  const [associatedSymptoms, setAssociatedSymptoms] = useState<SymptomGroup[]>(associatedInitial);
  const [functionalImpairment, setFunctionalImpairment] = useState<SymptomGroup[]>(functionalInitial);

  // 2. שמירה וטעינת LocalStorage (כמו קודם)
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

  // 5. חישוב הניקוד וסיום
  const handleCalculate = () => {
    const formData: PansFormData = {
      ocdSymptoms,
      associatedSymptoms,
      functionalImpairment,
    };
    const scores = computeScores(formData);

    // ננווט לדף התוצאות (/results) ונעביר בתור state את formData + scores
    navigate('/results', { state: { formData, scores } });
  };

  return (
    <Box>
      {/* 5.1. סרגל התקדמות */}
      <Box sx={{ width: '100%', mb: 2 }}>
        <Typography variant="body2" color="textSecondary" align="right">
          {`${progressPercent}% הושלם`}
        </Typography>
        <LinearProgress variant="determinate" value={progressPercent} />
      </Box>

      <Paper elevation={3} sx={{ p: 3 }}>
        {/* 5.2. מדור I: OCD בתוך אקורדיון */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">I. תסמיני OCD</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <OCDSection items={ocdSymptoms} onItemChange={handleOcdChange} />
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ my: 2 }} />

        {/* 5.3. מדור II: סימפטומים נלווים בתוך אקורדיון */}
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

        {/* 5.4. מדור III: פגיעה תפקודית בתוך אקורדיון */}
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

        {/* 5.5. כפתור חישוב */}
        <Box textAlign="center" sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleCalculate}>
            חשב ניקוד
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CalculatorForm;