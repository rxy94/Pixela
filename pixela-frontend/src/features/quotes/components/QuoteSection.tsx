import React from 'react';

const STYLES = {
  wrapper: "w-[90%] md:w-[85%] lg:w-[80%] mx-auto px-4 md:px-0",
  container: "flex justify-start text-left lg:justify-end lg:text-right py-8 md:py-12",
  quote: "text-base md:text-lg italic text-gray-400 max-w-2xl text-balance",
  author: "text-sm md:text-base mt-3 text-gray-300",
};

type QuoteSectionProps = {
  quote: {
    quote: string;
    author: string;
  }
}

const QuoteSection = ({ quote }: QuoteSectionProps) => {
  return (
    <div className={STYLES.wrapper}>
        <div className={STYLES.container}>
            <div>
                <p className={STYLES.quote}>&quot;{quote.quote}&quot;</p>
                <p className={STYLES.author}>- {quote.author}</p>
            </div>
        </div>
    </div>
  );
};

export default QuoteSection; 