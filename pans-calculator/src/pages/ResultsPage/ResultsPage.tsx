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
    const { before, after, current, total } = scores;
    const { ocdSymptoms, associatedSymptoms, functionalImpairment } = formData;

    /** חישוב סיכום שורה עבור OCD: ניקוד גבוה ביותר × 5 לכל טווח */
    const maxOCD_before = Math.max(...ocdSymptoms.map((s) => s.ratingBefore));
    const maxOCD_after = Math.max(...ocdSymptoms.map((s) => s.ratingAfter));
    const maxOCD_current = Math.max(...ocdSymptoms.map((s) => s.ratingCurrent));
    const scoreOCD_before = maxOCD_before * 5;
    const scoreOCD_after = maxOCD_after * 5;
    const scoreOCD_current = maxOCD_current * 5;
    const totalOCD = scoreOCD_before + scoreOCD_after + scoreOCD_current;

    /** חישוב סיכום תסמינים נלווים: סכום חמשת הערכים הגדולים ביותר בכל טווח */
    const sumTop5 = (arr: number[]) =>
        [...arr].sort((a, b) => b - a).slice(0, 5).reduce((sum, v) => sum + v, 0);

    const assoc_beforeArr = associatedSymptoms.map((s) => s.ratingBefore);
    const assoc_afterArr = associatedSymptoms.map((s) => s.ratingAfter);
    const assoc_currentArr = associatedSymptoms.map((s) => s.ratingCurrent);

    const scoreAssoc_before = sumTop5(assoc_beforeArr);
    const scoreAssoc_after = sumTop5(assoc_afterArr);
    const scoreAssoc_current = sumTop5(assoc_currentArr);
    const totalAssoc = scoreAssoc_before + scoreAssoc_after + scoreAssoc_current;

    /** חישוב פגיעה תפקודית: כל דירוג מוכפל ב־10 */
    const func = functionalImpairment[0];
    const func_before = func.ratingBefore * 10;
    const func_after = func.ratingAfter * 10;
    const func_current = func.ratingCurrent * 10;
    const totalFunc = func_before + func_after + func_current;

    return (
        <Container maxWidth="md" sx={{ py: 4, direction: 'rtl' }}>
            <Typography variant="h4" gutterBottom align="center">
                תוצאות מדד PANS/PANDAS
            </Typography>

            <Table sx={{ mb: 3 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>תחום / סימפטום</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            שבוע לפני הופעה ראשונה
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            שבוע אחרי הופעה ראשונה
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            7 ימים אחרונים
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            ניקוד שורה
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* ===== שורות OCD – כל סימפטום בנפרד ===== */}
                    {ocdSymptoms.map((s) => {
                        const row_before = s.ratingBefore * 5;
                        const row_after = s.ratingAfter * 5;
                        const row_current = s.ratingCurrent * 5;
                        const row_total = row_before + row_after + row_current;
                        return (
                            <TableRow key={s.id}>
                                <TableCell sx={{ textAlign: 'right' }}>{s.label}</TableCell>
                                <TableCell align="center">{row_before}</TableCell>
                                <TableCell align="center">{row_after}</TableCell>
                                <TableCell align="center">{row_current}</TableCell>
                                <TableCell align="center">{row_total}</TableCell>
                            </TableRow>
                        );
                    })}

                    {/* שורה: סכום OCD */}
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                            סך תסמיני OCD (0–25)
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {scoreOCD_before}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {scoreOCD_after}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {scoreOCD_current}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {totalOCD}
                        </TableCell>
                    </TableRow>

                    {/* ===== שורות Associated – כל סימפטום בנפרד ===== */}
                    {associatedSymptoms.map((s) => {
                        const row_before = s.ratingBefore;
                        const row_after = s.ratingAfter;
                        const row_current = s.ratingCurrent;
                        const row_sum = row_before + row_after + row_current;
                        return (
                            <TableRow key={s.id}>
                                <TableCell sx={{ textAlign: 'right' }}>{s.label}</TableCell>
                                <TableCell align="center">{row_before}</TableCell>
                                <TableCell align="center">{row_after}</TableCell>
                                <TableCell align="center">{row_current}</TableCell>
                                <TableCell align="center">{row_sum}</TableCell>
                            </TableRow>
                        );
                    })}

                    {/* שורה: סכום Associated */}
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                            סך תסמינים נלווים (0–25)
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {scoreAssoc_before}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {scoreAssoc_after}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {scoreAssoc_current}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {totalAssoc}
                        </TableCell>
                    </TableRow>

                    {/* ===== שורות Functional – רק שורה אחת, כי זה פריט יחיד ===== */}
                    <TableRow>
                        <TableCell sx={{ textAlign: 'right' }}>
                            {func.label} (0–5)
                        </TableCell>
                        <TableCell align="center">{func_before}</TableCell>
                        <TableCell align="center">{func_after}</TableCell>
                        <TableCell align="center">{func_current}</TableCell>
                        <TableCell align="center">{totalFunc}</TableCell>
                    </TableRow>

                    {/* שורה: סכום Functional */}
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                            סך פגיעה תפקודית (0–50)
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {func_before}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {func_after}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {func_current}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {totalFunc}
                        </TableCell>
                    </TableRow>

                    {/* שורה: סיכום כולל של כל הטווחים */}
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                            סך הכול חלקי בכל טווח
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {before}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {after}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {current}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                            {total}
                        </TableCell>
                    </TableRow>

                    {/* שורה: ציון כולל סופי (0–100) */}
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                            ציון כולל (0–100)
                        </TableCell>
                        <TableCell colSpan={4} align="center" sx={{ fontWeight: 'bold' }}>
                            {total}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button variant="contained" onClick={() => navigate('/')}>
                    התחלה מחדש
                </Button>
            </Box>
        </Container>
    );
};

export default ResultsPage;
