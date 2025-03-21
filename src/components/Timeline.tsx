
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, GraduationCap, Book, Brain, Baby } from 'lucide-react';
import { timelineEvents } from '../utils/timelineData';
import TimelineEvent from './TimelineEvent';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Timeline: React.FC = () => {
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 5 });
  const [readingLevel, setReadingLevel] = useState<'kids' | 'novice' | 'college' | 'expert'>('novice');
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const activeEvent = timelineEvents[activeEventIndex];
  const sortedEvents = [...timelineEvents].sort((a, b) => a.year - b.year);

  useEffect(() => {
    // Ensure the active event is visible in the timeline
    if (activeEventIndex < visibleRange.start) {
      setVisibleRange({ 
        start: Math.max(0, activeEventIndex - 2), 
        end: Math.min(activeEventIndex + 3, timelineEvents.length - 1) 
      });
    } else if (activeEventIndex > visibleRange.end) {
      setVisibleRange({ 
        start: Math.max(0, activeEventIndex - 3), 
        end: Math.min(activeEventIndex + 2, timelineEvents.length - 1) 
      });
    }
  }, [activeEventIndex, visibleRange]);

  const scrollLeft = () => {
    if (visibleRange.start > 0) {
      setVisibleRange({
        start: visibleRange.start - 1,
        end: visibleRange.end - 1
      });
    }
  };

  const scrollRight = () => {
    if (visibleRange.end < timelineEvents.length - 1) {
      setVisibleRange({
        start: visibleRange.start + 1,
        end: visibleRange.end + 1
      });
    }
  };

  const selectEvent = (index: number) => {
    setActiveEventIndex(index);
  };

  return (
    <section id="timeline" className="py-12">
      <div className="text-center mb-10">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
          Explore History
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuclear Timeline</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover key moments in the history of nuclear fission and energy development in the United States.
        </p>
        
        {/* Reading Level Selector */}
        <div className="mt-6 flex justify-center">
          <Tabs 
            defaultValue="novice" 
            className="w-full max-w-md"
            value={readingLevel}
            onValueChange={(value) => setReadingLevel(value as 'kids' | 'novice' | 'college' | 'expert')}
          >
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="kids" className="flex items-center gap-1">
                <Baby className="h-4 w-4" />
                <span className="hidden sm:inline">Kids</span>
              </TabsTrigger>
              <TabsTrigger value="novice" className="flex items-center gap-1">
                <Book className="h-4 w-4" />
                <span className="hidden sm:inline">Novice</span>
              </TabsTrigger>
              <TabsTrigger value="college" className="flex items-center gap-1">
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">College</span>
              </TabsTrigger>
              <TabsTrigger value="expert" className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Expert</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="relative glass-panel p-6 md:p-8">
        {/* Timeline Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={scrollLeft} 
            disabled={visibleRange.start === 0}
            className="icon-button disabled:opacity-30"
            aria-label="Scroll timeline left"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div 
            ref={timelineRef}
            className="flex-1 relative overflow-hidden mx-4"
          >
            <div className="timeline-line" />
            <div className="flex justify-between relative z-10">
              {sortedEvents.slice(visibleRange.start, visibleRange.end + 1).map((event, idx) => {
                const actualIndex = timelineEvents.findIndex(e => e.id === event.id);
                return (
                  <div key={event.id} className="flex flex-col items-center">
                    <button
                      onClick={() => selectEvent(actualIndex)}
                      className={`${activeEventIndex === actualIndex ? 'timeline-dot-active' : 'timeline-dot'} focus:outline-none focus:ring-2 focus:ring-primary`}
                      aria-label={`View event: ${event.title} (${event.year})`}
                    />
                    <span className="mt-2 text-sm font-medium">{event.year}</span>
                    {activeEventIndex === actualIndex && (
                      <div className="absolute -bottom-8 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-primary transform left-1/2 -translate-x-1/2" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          <button 
            onClick={scrollRight}
            disabled={visibleRange.end === timelineEvents.length - 1}
            className="icon-button disabled:opacity-30"
            aria-label="Scroll timeline right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        {/* Event Details */}
        <div className="mt-12">
          {activeEvent && (
            <TimelineEvent event={activeEvent} readingLevel={readingLevel} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
