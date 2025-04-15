
import React, { useState, useEffect } from 'react';
import QuoteService from '../services/QuoteService';
import QuoteCard from '../components/QuoteCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Background from '../components/Background';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const [quote, setQuote] = useState(QuoteService.getQuoteForToday());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <Background />
      
      <div className="w-full max-w-lg">
        <Header />
        
        <div className="flex items-center justify-center py-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <Sparkles className="h-10 w-10 text-primary animate-pulse" />
              <p className="text-sm text-muted-foreground mt-2">Loading your daily inspiration...</p>
            </div>
          ) : (
            <QuoteCard quote={quote} />
          )}
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
