import React from 'react';

interface CardSubComponents {
  Header: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Title: React.FC<React.HTMLAttributes<HTMLHeadingElement>>;
  Description: React.FC<React.HTMLAttributes<HTMLParagraphElement>>;
  Content: React.FC<React.HTMLAttributes<HTMLDivElement>>;
}

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> & CardSubComponents = ({ className, children, ...props }) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={`p-6 border-b border-gray-200 ${className}`} {...props} />
);

const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h3 className={`text-xl font-semibold leading-none tracking-tight text-[#005442] ${className}`} {...props} />
);

const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <p className={`text-sm text-gray-500 mt-1 ${className}`} {...props} />
);

const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={`p-6 ${className}`} {...props} />
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;