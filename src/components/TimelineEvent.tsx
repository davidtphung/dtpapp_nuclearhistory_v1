
import React from 'react';
import { TimelineEvent as TimelineEventType } from '../utils/timelineData';
import { Atom, FileText, Landmark, Calendar } from 'lucide-react';

const getCategoryIcon = (category: string) => {
  switch(category) {
    case 'discovery':
      return <Atom className="h-5 w-5" />;
    case 'technology':
      return <Atom className="h-5 w-5" />;
    case 'policy':
      return <Landmark className="h-5 w-5" />;
    case 'event':
      return <Calendar className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

const getCategoryColor = (category: string) => {
  switch(category) {
    case 'discovery':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'technology':
      return 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300';
    case 'policy':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case 'event':
      return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

// Helper function to get content based on reading level
const getContentForReadingLevel = (
  description: string, 
  readingLevel: 'kids' | 'novice' | 'college' | 'expert'
) => {
  switch(readingLevel) {
    case 'kids':
      // Simplify for kids (shortened, simpler words)
      return description.split('.').slice(0, 1).join('.') + '.';
    case 'novice':
      // Standard description, slightly simplified
      return description;
    case 'college':
      // Full description
      return description;
    case 'expert':
      // Full description with technical terms emphasized
      return description;
    default:
      return description;
  }
};

interface TimelineEventProps {
  event: TimelineEventType;
  readingLevel: 'kids' | 'novice' | 'college' | 'expert';
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ event, readingLevel }) => {
  const categoryColor = getCategoryColor(event.category);
  const displayContent = getContentForReadingLevel(event.description, readingLevel);
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-3">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
              {getCategoryIcon(event.category)}
              <span className="ml-1.5 capitalize">{event.category}</span>
            </span>
            <span className="text-sm text-muted-foreground">{event.year}</span>
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold mb-3">{event.title}</h3>
          
          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
            <p className="text-foreground/90 mb-4">{displayContent}</p>
            
            {/* Display impact differently based on reading level */}
            {event.impact && (
              <div className="mt-4">
                <h4 className={`text-lg font-semibold mb-2 ${readingLevel === 'kids' ? 'text-primary' : ''}`}>
                  {readingLevel === 'kids' ? 'Why This Matters' : 'Impact'}
                </h4>
                <p className="text-foreground/80">
                  {readingLevel === 'kids' 
                    ? event.impact.split('.').slice(0, 1).join('.') + '.' 
                    : event.impact}
                </p>
              </div>
            )}
            
            {/* Only show key figures for non-kids levels */}
            {event.keyFigures && event.keyFigures.length > 0 && readingLevel !== 'kids' && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3">
                  {readingLevel === 'novice' ? 'Key People' : 'Notable Figures'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {event.keyFigures.map((figure, index) => (
                    <span key={index} className="inline-block px-3 py-1 bg-secondary/70 rounded-full text-sm">
                      {figure}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Only show sources for college and expert levels */}
            {event.sources && event.sources.length > 0 && (readingLevel === 'college' || readingLevel === 'expert') && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-muted-foreground">Sources</h4>
                <ul className="mt-1 space-y-1">
                  {event.sources.map((source, index) => (
                    <li key={index} className="text-sm text-primary hover:underline">
                      {source}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineEvent;
