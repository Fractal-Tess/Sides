// Types for our quote handling
type Quote = {
  id: number;
  text: string;
  author: string;
};

// Our collection of motivational quotes
const quotes: Quote[] = [
  {
    id: 1,
    text: "Train like you've never won, compete like you've never lost.",
    author: "Sergio Busquets"
  },
  {
    id: 2,
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    id: 3,
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    id: 4,
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair"
  },
  {
    id: 5,
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    id: 6,
    text: "Hardships often prepare ordinary people for an extraordinary destiny.",
    author: "C.S. Lewis"
  },
  {
    id: 7,
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
  {
    id: 8,
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    id: 9,
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela"
  },
  {
    id: 10,
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis"
  },
  {
    id: 11,
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt"
  },
  {
    id: 12,
    text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar"
  }
];

// LocalStorage keys
const LAST_QUOTE_DATE_KEY = 'lastQuoteDate';
const SHOWN_QUOTES_KEY = 'shownQuotes';

// Quote service class
class QuoteService {
  // Get today's quote
  getQuoteForToday(): Quote {
    const today = new Date().toDateString();
    const lastQuoteDate = localStorage.getItem(LAST_QUOTE_DATE_KEY);
    
    // If we've already shown a quote today, return the saved one
    if (lastQuoteDate === today) {
      const savedQuoteId = localStorage.getItem('currentQuoteId');
      if (savedQuoteId) {
        const savedQuote = quotes.find(q => q.id === parseInt(savedQuoteId));
        if (savedQuote) return savedQuote;
      }
    }
    
    // Otherwise, get a new quote for today
    const newQuote = this.getRandomQuote();
    this.saveCurrentQuote(newQuote, today);
    return newQuote;
  }
  
  // Get a random quote that hasn't been shown recently
  private getRandomQuote(): Quote {
    // Get shown quotes from localStorage
    const shownQuotesJson = localStorage.getItem(SHOWN_QUOTES_KEY);
    let shownQuotes: number[] = [];
    
    if (shownQuotesJson) {
      try {
        shownQuotes = JSON.parse(shownQuotesJson);
      } catch (e) {
        console.error("Error parsing shown quotes:", e);
      }
    }
    
    // If we've shown all quotes, reset the list
    if (shownQuotes.length >= quotes.length - 1) {
      shownQuotes = [];
    }
    
    // Filter out quotes we've already shown
    const availableQuotes = quotes.filter(quote => !shownQuotes.includes(quote.id));
    
    // Get a random quote from the available ones
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    return availableQuotes[randomIndex];
  }
  
  // Save the current quote and update shown quotes
  private saveCurrentQuote(quote: Quote, date: string): void {
    // Save today's date
    localStorage.setItem(LAST_QUOTE_DATE_KEY, date);
    
    // Save current quote ID
    localStorage.setItem('currentQuoteId', quote.id.toString());
    
    // Update shown quotes
    const shownQuotesJson = localStorage.getItem(SHOWN_QUOTES_KEY);
    let shownQuotes: number[] = [];
    
    if (shownQuotesJson) {
      try {
        shownQuotes = JSON.parse(shownQuotesJson);
      } catch (e) {
        console.error("Error parsing shown quotes:", e);
      }
    }
    
    // Add current quote to shown quotes
    shownQuotes.push(quote.id);
    localStorage.setItem(SHOWN_QUOTES_KEY, JSON.stringify(shownQuotes));
  }
}

export default new QuoteService();
export type { Quote };
