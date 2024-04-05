import React, { useState } from 'react';

export default function Tool ({ content, children })  {
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    return (
        <div style={{position:"relative"}} >
        <span
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
        >
        {children}
      </span>
            {isTooltipVisible && (
                <div style={{ textAlign:'center', fontSize:'12px', position: 'absolute', top: '100%', left: 0, background: '#333', color: '#fff', padding: '8px', borderRadius: '4px' }}>
                    {content}
                </div>
            )}
        </div>

    );
};
