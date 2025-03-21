
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

interface TimelineEventProps {
  event: TimelineEventType;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ event }) => {
  const categoryColor = getCategoryColor(event.category);
  
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
            <p className="text-foreground/90 mb-4">{event.description}</p>
            
            {event.detailedContent && (
              <div className="mt-4">
                <p className="text-foreground/80">{event.detailedContent}</p>
              </div>
            )}
            
            {event.notableFigures && event.notableFigures.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3">Notable Figures</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  {event.notableFigures.map((figure, index) => (
                    <div key={index} className="p-4 rounded-lg bg-secondary/50">
                      <h5 className="font-medium">{figure.name}</h5>
                      <p className="text-sm text-muted-foreground">{figure.role}</p>
                      {figure.description && (
                        <p className="text-sm mt-2">{figure.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {event.sources && event.sources.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-muted-foreground">Sources</h4>
                <ul className="mt-1 space-y-1">
                  {event.sources.map((source, index) => (
                    <li key={index}>
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {source.title}
                      </a>
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
