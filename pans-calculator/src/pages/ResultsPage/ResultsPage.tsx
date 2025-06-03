import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    Box,
    Button,
} from '@mui/material';
import { PansFormData, PansScores } from '../../types/pansTypes';

interface LocationState {
    formData: PansFormData;
    scores: PansScores;
}

const ResultsPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // וידוא שה־location.state קיים
    const state = location.state as LocationState | null;

    if (!state) {
        // אם התחנו את הדף בלי להזין שדות, נחזיר את המשתמש לדף הראשי
        navigate('/', { replace: true });
        return null;
    }

    const { formData, scores } = state;

    // נבנה מערך של כל הסימפטומים עם הדירוגים שלהם
    // נרצה להציג: ראשית את OCD, אחר כך סימפטומים נלווים, ואז פגיעה תפקודית
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h5" gutterBottom>
                תוצאות מדד PANS/PANDAS
            </Typography>

            <Box id="printable-area">
                {/* הצגת ניקוד כולל */}
                <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6">ניקוד סופי: {scores.totalScore} מתוך 100</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        ▪︎ OCD: {scores.ocdScore} מתוך 25
                        <br />
                        ▪︎ סימפטומים נלווים: {scores.associatedScore} מתוך 25
                        <br />
                        ▪︎ פגיעה תפקודית: {scores.functionalScore} מתוך 50
                    </Typography>
                </Paper>

                {/* פרטי כל הסימפטומים והדירוגים */}
                <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        פירוט דירוגים:
                    </Typography>

                    {/* OCD Section */}
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                        I. תסמיני OCD:
                    </Typography>
                    <List dense>
                        {formData.ocdSymptoms.map((s) => (
                            <ListItem key={s.id}>
                                <ListItemText primary={`${s.label}: דירוג ${s.rating}`} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ my: 2 }} />

                    {/* Associated Section */}
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                        II. תסמינים נלווים:
                    </Typography>
                    <List dense>
                        {formData.associatedSymptoms.map((s) => (
                            <ListItem key={s.id}>
                                <ListItemText primary={`${s.label}: דירוג ${s.rating}`} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ my: 2 }} />

                    {/* Functional Section */}
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                        III. פגיעה תפקודית:
                    </Typography>
                    <List dense>
                        {formData.functionalImpairment.map((s) => (
                            <ListItem key={s.id}>
                                <ListItemText primary={`${s.label}: דירוג ${s.rating}`} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>

            {/* כפתור הדפסה */}
            <Box textAlign="center" sx={{ mt: 2 }}>
                <Button variant="outlined" onClick={() => window.print()}>
                    הדפס / ייצא PDF
                </Button>
            </Box>
            <Box textAlign="center" sx={{ mt: 2 }}>
                <Button variant="outlined" onClick={() => {
                    localStorage.removeItem('ocdSymptoms');
                    localStorage.removeItem('associatedSymptoms');
                    localStorage.removeItem('functionalImpairment');
                    navigate('/');
                }}>
                    מדד חדש
                </Button>
            </Box>
        </Container>
    );
};

export default ResultsPage;
