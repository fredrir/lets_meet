import React, { useState, useEffect } from 'react';

interface HourlySelectProps {
  startDate: Date;
  endDate: Date;
}

interface TimeSlot {
  datetime: string;
  displayTime: string;
}

const HourlySelect: React.FC<HourlySelectProps> = ({ startDate, endDate }) => {
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);

  const generateTimeSlots = (start: Date, end: Date): Record<string, TimeSlot[]> => {
    const days: Record<string, TimeSlot[]> = {};
    let current = new Date(start);
    const endTime = new Date(end);

    while (current <= endTime) {
      const day = current.toLocaleDateString();
      const hour = current.toLocaleTimeString();
      if (!days[day]) {
        days[day] = [];
      }
      days[day].push({ datetime: current.toISOString(), displayTime: hour });
      current = new Date(current.getTime() + 30 * 60000); // add 30 minutes
    }
    return days;
  };

  const days = generateTimeSlots(startDate, endDate);

  const handleMouseDown = (slot: string) => {
    setIsDragging(true);
    toggleSlot(slot);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseEnter = (slot: string) => {
    if (isDragging) {
      toggleSlot(slot);
    }
  };

  const toggleSlot = (slot: string) => {
    setSelectedSlots(prev => {
      const newSet = new Set(prev);
      if (newSet.has(slot)) {
        newSet.delete(slot);
      } else {
        newSet.add(slot);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const handleMouseUpDocument = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    document.addEventListener('mouseup', handleMouseUpDocument);

    return () => {
      document.removeEventListener('mouseup', handleMouseUpDocument);
    };
  }, [isDragging]);

  return (
    <div className="flex flex-col">
      <div className="text-center justify-center flex flex-col">
        <h1 className="my-5 text-5xl font-semibold text-center">HourlySelect</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        {Object.keys(days).map(day => (
          <div key={day} className="flex-1 p-5 border">
            <div className="font-bold text-center">{day}</div>
            <div className="grid grid-rows-auto gap-1">
              {days[day].map(slot => (
                <div
                  key={slot.datetime}
                  className={`border p-2 ${selectedSlots.has(slot.datetime) ? 'bg-green-500' : 'bg-white'}`}
                  onMouseDown={() => handleMouseDown(slot.datetime)}
                  onMouseEnter={() => handleMouseEnter(slot.datetime)}
                  onMouseUp={handleMouseUp}
                >
                  {slot.displayTime}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlySelect;
