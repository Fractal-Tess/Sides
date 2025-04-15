
import React from 'react';
import { Quote } from '../services/QuoteService';
import { Card, CardContent } from '@/components/ui/card';

interface QuoteCardProps {
  quote: Quote;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
  return (
    <Card className="quote-card w-full max-w-md bg-white/90 border-none animate-fade-in">
      <CardContent className="pt-6">
        <div className="text-center px-2 py-6">
          <p className="text-xl md:text-2xl mb-4 font-medium leading-relaxed text-gray-700">
            "{quote.text}"
          </p>
          <p className="text-primary italic">— {quote.author}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
