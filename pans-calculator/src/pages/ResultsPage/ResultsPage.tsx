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
import { useTranslation } from 'react-i18next';
import {
  PansFormData,
  SubSymptom,
  SymptomGroup,
  NPDomainKey,
  NP_DOMAIN_LABELS,
} from '../../types/pansTypes';
import './ResultsPage.scss';

interface ResultsState {
  formData: PansFormData;
}

// פונקציה עזר לחישוב סכום ה־5 התחומים החמורים ביותר מתוך מערך מספרים
const sumTop5 = (arr: number[]) =>
  [...arr].sort((a, b) => b - a).slice(0, 5).reduce((sum, v) => sum + v, 0);

const ResultsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ResultsState | undefined;

  if (!state) {
    navigate('/');
    return null;
  }

  const { formData } = state;
  const { ocdSymptoms, associatedSymptoms, functionalImpairment } = formData;

  // ===== 1. חישובי OCD לכל טווח =====
  const maxOCD_before = Math.max(...ocdSymptoms.map((s) => s.ratingBefore));
  const maxOCD_after = Math.max(...ocdSymptoms.map((s) => s.ratingAfter));
  const maxOCD_current = Math.max(...ocdSymptoms.map((s) => s.ratingCurrent));

  const scoreOCD_before = maxOCD_before * 5;
  const scoreOCD_after = maxOCD_after * 5;
  const scoreOCD_current = maxOCD_current * 5;

  // ===== 2. חישובי NP domains מתוך SubSymptom =====
  // כל מפתחות התחומים
  const allDomains: NPDomainKey[] = [
    'anxiety',
    'moodiness',
    'irritability',
    'cognitive',
    'regression',
    'sensory',
    'hallucinations',
    'motor',
    'urinary',
    'sleep',
    'pupil',
  ];

  // מושכים את הדירוג המקסימלי לכל תחום ולכל טווח
  const domainRatingsBefore: Record<NPDomainKey, number> = {} as any;
  const domainRatingsAfter: Record<NPDomainKey, number> = {} as any;
  const domainRatingsCurrent: Record<NPDomainKey, number> = {} as any;

  allDomains.forEach((domainKey) => {
    const subs = associatedSymptoms.filter((s) => s.domain === domainKey);
    domainRatingsBefore[domainKey] =
      subs.length > 0 ? Math.max(...subs.map((s) => s.ratingBefore)) : 0;
    domainRatingsAfter[domainKey] =
      subs.length > 0 ? Math.max(...subs.map((s) => s.ratingAfter)) : 0;
    domainRatingsCurrent[domainKey] =
      subs.length > 0 ? Math.max(...subs.map((s) => s.ratingCurrent)) : 0;
  });

  const scoreAssoc_before = sumTop5(Object.values(domainRatingsBefore));
  const scoreAssoc_after = sumTop5(Object.values(domainRatingsAfter));
  const scoreAssoc_current = sumTop5(Object.values(domainRatingsCurrent));

  // ===== 3. חישובי פגיעה תפקודית לכל טווח =====
  const func = functionalImpairment[0];
  const func_before = func.ratingBefore * 10;
  const func_after = func.ratingAfter * 10;
  const func_current = func.ratingCurrent * 10;

  // ===== 4. TOTAL SYMPTOMS (OCD + Associated) לכל טווח =====
  const totalSymp_before = scoreOCD_before + scoreAssoc_before;
  const totalSymp_after = scoreOCD_after + scoreAssoc_after;
  const totalSymp_current = scoreOCD_current + scoreAssoc_current;

  // ===== 5. TOTAL SCORE (TOTAL SYMPTOMS + Functional) לכל טווח =====
  const totalScore_before = totalSymp_before + func_before;
  const totalScore_after = totalSymp_after + func_after;
  const totalScore_current = totalSymp_current + func_current;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }} dir={t('dir')}>
      <Typography variant="h4" gutterBottom align="center">
        {t('resultsPage.title')}
      </Typography>

      <Table className="results-table printable-area" sx={{ mb: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>{t('resultsPage.column.topic')}</TableCell>
            <TableCell align="center">{t('timelines.beforeFirstWeek')}</TableCell>
            <TableCell align="center">{t('timelines.afterFirstWeek')}</TableCell>
            <TableCell align="center">{t('timelines.last7Days')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              {t('resultsPage.row.ocdSummary')}
            </TableCell>
            <TableCell align="center">{scoreOCD_before}</TableCell>
            <TableCell align="center">{scoreOCD_after}</TableCell>
            <TableCell align="center">{scoreOCD_current}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={4}>
              {t('resultsPage.row.npHeader')}
            </TableCell>
          </TableRow>
          {allDomains.map(domainKey => (
            <TableRow key={domainKey}>
              <TableCell>{t(`npDomains.${domainKey}`)}</TableCell>
              <TableCell align="center">{domainRatingsBefore[domainKey]}</TableCell>
              <TableCell align="center">{domainRatingsAfter[domainKey]}</TableCell>
              <TableCell align="center">{domainRatingsCurrent[domainKey]}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>{t('resultsPage.row.npSummary')}</TableCell>
            <TableCell align="center">{scoreAssoc_before}</TableCell>
            <TableCell align="center">{scoreAssoc_after}</TableCell>
            <TableCell align="center">{scoreAssoc_current}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('resultsPage.row.totalSymptoms')}</TableCell>
            <TableCell align="center">{totalSymp_before}</TableCell>
            <TableCell align="center">{totalSymp_after}</TableCell>
            <TableCell align="center">{totalSymp_current}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('resultsPage.row.functional')}</TableCell>
            <TableCell align="center">{func_before}</TableCell>
            <TableCell align="center">{func_after}</TableCell>
            <TableCell align="center">{func_current}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('resultsPage.row.totalScore')}</TableCell>
            <TableCell align="center">{totalScore_before}</TableCell>
            <TableCell align="center">{totalScore_after}</TableCell>
            <TableCell align="center">{totalScore_current}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
        <Button variant="outlined" onClick={() => navigate('/')}>
          {t('resultsPage.backButton')}
        </Button>
        <Button variant="contained" onClick={() => window.print()}>
          {t('resultsPage.printButton')}
        </Button>
      </Box>
    </Container>
  );
};

export default ResultsPage;
