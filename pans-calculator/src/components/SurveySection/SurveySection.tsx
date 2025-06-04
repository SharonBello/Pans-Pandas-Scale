// src/components/SurveySection/SurveySection.tsx
import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    LinearProgress,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import { RatingValue, SymptomGroup } from '../../types/pansTypes';
import '../sections/Sections.scss';
import QuestionCard from '../QuestionCard/QuestionCard';

interface SurveySectionProps {
    title: string;
    items: SymptomGroup[];
    onComplete: (answers: SymptomGroup[]) => void;
}

const SurveySection: React.FC<SurveySectionProps> = ({ title, items, onComplete }) => {
    const [answers, setAnswers] = useState<SymptomGroup[]>(() =>
        items.map((it) => ({ ...it }))
    );
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mode, setMode] = useState<'survey' | 'review'>('survey');
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const total = items.length;

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const handleAnswer = (id: string, field: 'before' | 'after' | 'current', value: RatingValue) => {
        setAnswers((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, [`rating${capitalize(field)}`]: value } : item
            )
        );
    };

    const goNext = () => {
        if (currentIndex < total - 1) {
            setCurrentIndex((idx) => idx + 1);
        } else {
            setMode('review');
        }
    };

    const goBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex((idx) => idx - 1);
        }
    };

    const handleEditClick = (index: number) => {
        setEditIndex(index);
    };

    const handleCloseModal = () => {
        setEditIndex(null);
    };

    const handleFinish = () => {
        onComplete(answers);
    };

    return (
        <Box className="survey-section">
            <Typography variant="h5">{title}</Typography>

            {mode === 'survey' ? (
                <>
                    {/* פס התקדמות */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <LinearProgress
                                variant="determinate"
                                value={Math.round(((currentIndex + 1) / total) * 100)}
                            />
                        </Box>
                        <Typography variant="body2" sx={{ ml: 2, whiteSpace: 'nowrap' }}>
                            {`שאלה ${currentIndex + 1} מתוך ${total}`}
                        </Typography>
                    </Box>

                    {/* כרטיס שאלה נוכחי */}
                    <Grid container justifyContent="center">
                        <Grid size={{xs:12, md:10}}>
                            <QuestionCard
                                question={answers[currentIndex]}
                                onAnswer={handleAnswer}
                            />
                        </Grid>
                    </Grid>

                    {/* כפתורי חזרה / המשך */}
                    <Box className="survey-buttons">
                        <Button variant="outlined" disabled={currentIndex === 0} onClick={goBack}>
                            חזור
                        </Button>
                        <Button variant="contained" onClick={goNext}>
                            {currentIndex < total - 1 ? 'הבא' : 'סיים סקירה'}
                        </Button>
                    </Box>
                </>
            ) : (
                <>
                    {/* מצב סקירה */}
                    <Typography variant="body1" sx={{ mb: 2, textAlign: 'right' }}>
                        סקירת תשובות – ניתן לערוך כל תשובה לפני המעבר למדור הבא.
                    </Typography>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    עריכה
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    לפני
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    אחרי
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    7 ימים
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                                    שאלה
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {answers.map((item, idx) => (
                                <TableRow key={item.id}>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleEditClick(idx)} size="small">
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">{item.ratingBefore}</TableCell>
                                    <TableCell align="center">{item.ratingAfter}</TableCell>
                                    <TableCell align="center">{item.ratingCurrent}</TableCell>
                                    <TableCell sx={{ textAlign: 'right' }}>
                                        <Typography variant="body2">{item.label}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                        <Button variant="contained" onClick={handleFinish}>
                            המשך למדור הבא
                        </Button>
                    </Box>

                    {/* ===== מודל עריכה ===== */}
                    <Dialog
                        open={editIndex !== null}
                        onClose={handleCloseModal}
                        maxWidth="md"
                        fullWidth
                    >
                        <DialogTitle>עריכת שאלה</DialogTitle>
                        <DialogContent>
                            {editIndex !== null && (
                                <QuestionCard
                                    question={answers[editIndex]}
                                    onAnswer={handleAnswer}
                                />
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseModal}>ביטול</Button>
                            <Button onClick={handleCloseModal} variant="contained">
                                שמור
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </Box>
    );
};

export default SurveySection;
