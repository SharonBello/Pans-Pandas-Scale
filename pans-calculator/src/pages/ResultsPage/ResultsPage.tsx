import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Box,
} from '@mui/material';
import { PansFormData } from '../../types/pansTypes';

interface ResultsState {
    formData: PansFormData;
    scores: {
        before: number;
        after: number;
        current: number;
        total: number;
    };
}

const ResultsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as ResultsState | undefined;

    if (!state) {
        navigate('/');
        return null;
    }

    const { formData, scores } = state;
    const { current, total } = scores;
    const { ocdSymptoms, associatedSymptoms, functionalImpairment } = formData;

    /** חישוב סיכום שורה עבור OCD: ניקוד גבוה ביותר × 5 לכל טווח */
    // פונקציה לחישוב חמשת הערכים הגבוהים ביותר (כדי לחשב “Associated”)
    const sumTop5 = (arr: number[]) =>
        [...arr].sort((a, b) => b - a).slice(0, 5).reduce((sum, v) => sum + v, 0);

    // ===== חישובי OCD (הכול לא משתנה) =====
    const maxOCD_current = Math.max(...ocdSymptoms.map((s) => s.ratingCurrent));
    const scoreOCD_current = maxOCD_current * 5;

    // ===== חישובי Associated =====
    const assoc_currentArr = associatedSymptoms.map((s) => s.ratingCurrent);
    const scoreAssoc_current = sumTop5(assoc_currentArr);

    // ===== חישובי Functional =====
    const func = functionalImpairment[0];
    const func_current = func.ratingCurrent * 10;

    return (
        <Container maxWidth="md" sx={{ py: 4, direction: 'rtl' }}>
            <Typography variant="h4" gutterBottom align="center">
                תוצאות מדד PANS/PANDAS
            </Typography>

            <Table className="results-table" sx={{ mb: 3 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>תחום / סימפטום</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            7 ימים אחרונים
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            ניקוד שורה
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {/* ===== OCD – כל סימפטום ובחירה “7 ימים” ===== */}
                    {ocdSymptoms.map((s) => {
                        const row_current = s.ratingCurrent * 5;
                        return (
                            <TableRow key={s.id}>
                                <TableCell sx={{ textAlign: 'right' }}>{s.label}</TableCell>
                                <TableCell align="center">{s.ratingCurrent}</TableCell>
                                <TableCell align="center">{row_current}</TableCell>
                            </TableRow>
                        );
                    })}
                    {/* שורה: סיכום OCD 7 ימים (max × 5) */}
                    <TableRow className="results-table__summary-ocd">
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                            סך תסמיני OCD (7 ימים ×5)
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {maxOCD_current}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {scoreOCD_current}
                        </TableCell>
                    </TableRow>

                    {/* ===== Associated – כל סימפטום ובחירה “7 ימים” ===== */}
                    {associatedSymptoms.map((s) => {
                        const row_current = s.ratingCurrent;
                        return (
                            <TableRow key={s.id}>
                                <TableCell sx={{ textAlign: 'right' }}>{s.label}</TableCell>
                                <TableCell align="center">{s.ratingCurrent}</TableCell>
                                <TableCell align="center">{row_current}</TableCell>
                            </TableRow>
                        );
                    })}
                    {/* שורה: סיכום Associated (סכום חמשת הגבוהים ב“7 ימים”) */}
                    <TableRow className="results-table__summary-associated">
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                            סך תסמינים נלווים (7 ימים – חמשת הגבוהים)
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {/* כאן נרצה להציג אולי את חמשת הגבוהים עצמם? בכל אופן נמקם placeholder */}
                            {scoreAssoc_current > 0 ? '–' : '–'}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {scoreAssoc_current}
                        </TableCell>
                    </TableRow>

                    {/* ===== Functional – פריט יחיד הבא “7 ימים” ===== */}
                    <TableRow>
                        <TableCell sx={{ textAlign: 'right' }}>{func.label} (7 ימים)</TableCell>
                        <TableCell align="center">{func.ratingCurrent}</TableCell>
                        <TableCell align="center">{func_current}</TableCell>
                    </TableRow>
                    {/* שורה: סיכום Functional (7 ימים ×10) */}
                    <TableRow className="results-table__summary-functional">
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                            סך פגיעה תפקודית (7 ימים ×10)
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {func.ratingCurrent}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {func_current}
                        </TableCell>
                    </TableRow>

                    {/* ===== שורה סיכום כולל (רק “7 ימים”) ===== */}
                    <TableRow className="results-table__summary-total">
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                            ציון כולל (7 ימים בלבד)
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {/* מציג את סך החלק “7 ימים” שהועבר ב־scores.current */}
                            {current}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {current}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                {/* לחצן חזרה */}
                <Button variant="outlined" color="primary" onClick={() => navigate('/')}>
                    חזרה להתחלה
                </Button>

                {/* לחצן הדפסה */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.print()}
                >
                    הדפס תוצאות
                </Button>
            </Box>
        </Container>
    );
};

export default ResultsPage;