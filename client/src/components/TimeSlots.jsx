import React, { useState } from "react";

const TimeSlots = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const generateSlots = () => {
    const slots = [];

    let startTime = new Date();
    startTime.setHours(9, 0, 0); // 9:00 AM

    const endTime = new Date();
    endTime.setHours(18, 0, 0); // 6:00 PM

    while (startTime < endTime) {
      const slotStart = new Date(startTime);

      // 10 min slot
      startTime.setMinutes(startTime.getMinutes() + 10);
      const slotEnd = new Date(startTime);

      slots.push({
        type: "slot",
        label: `${formatTime(slotStart)} - ${formatTime(slotEnd)}`,
      });

      // 5 min break (logic only)
      startTime.setMinutes(startTime.getMinutes() + 5);
    }

    return slots;
  };

  const formatTime = (date) =>
    date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {generateSlots().map((item, index) => {
          const isSelected = selectedSlot === item.label;

          return (
            <div
              key={index}
              onClick={() => setSelectedSlot(item.label)}
              className="rounded font-semibold hover:bg-blue-200 cursor-pointer"
              style={{
                width: "30%",
                padding: "6px",
                textAlign: "center",
                fontSize: "12px",
                border: isSelected
                  ? "2px solid #2563eb"
                  : "1px solid #333",
                background: isSelected ? "#dbeafe" : "transparent",
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlots;
