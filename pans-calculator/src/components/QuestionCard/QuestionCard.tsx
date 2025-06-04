import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import './QuestionCard.scss';
import SymptomRating from '../SymptomRating';
import { RatingValue, SymptomGroup } from '../../types/pansTypes';

interface QuestionCardProps {
  question: SymptomGroup;
  onAnswer: (id: string, field: 'before' | 'after' | 'current', value: RatingValue) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  return (
    <Card className="question-card">
      <CardContent>
        {/* תווית השאלה */}
        <Typography className="question-card__label">{question.label}</Typography>

        {/* סימפטום־רייטינג = שלושה סליידרים עם תיאורים */}
        <Box className="question-card__rating-container">
          <SymptomRating 
            id={question.id}
            label="" // label כבר מופיע בראש הכרטיס
            ratingBefore={question.ratingBefore}
            ratingAfter={question.ratingAfter}
            ratingCurrent={question.ratingCurrent}
            onChange={onAnswer}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
