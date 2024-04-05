import React, { useState } from 'react';

// A React component for displaying tooltips.
export default function ToolOptions({ content, children, onClose }) {
  // State to manage tooltip visibility
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  // Function to show the tooltip
  const showTooltip = () => setTooltipVisible(true);

  // Function to hide the tooltip and call onClose if provided
  const hideTooltip = () => {
    setTooltipVisible(false);
    if (onClose) onClose();
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* The clickable child element that triggers the tooltip */}
      <span onClick={showTooltip}>{children}</span>

      {/* Conditionally rendered tooltip */}
      {isTooltipVisible && (
        <div
          style={{
            background: '#fff',
            position: 'fixed',
            display: 'inline-block',
            padding: '10px',
          }}
          className="block rounded-md border-0 py-2 text-blue-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <div style={{ display: 'flex' }}>
            {/* Tooltip content */}
            {content}
            {/* Close button */}
            <button
              style={{ marginLeft: 'auto', cursor: 'pointer' }}
              onClick={hideTooltip}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
