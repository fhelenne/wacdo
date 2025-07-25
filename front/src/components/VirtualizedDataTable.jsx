import { useState, useEffect, useRef, useMemo, memo } from 'react';

const ITEM_HEIGHT = 60; // Height of each row in pixels
const VISIBLE_ITEMS = 10; // Number of visible items
const BUFFER_SIZE = 5; // Extra items to render for smooth scrolling

function VirtualizedDataTable({ columns, data, renderActions, itemHeight = ITEM_HEIGHT }) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);
  
  const containerHeight = VISIBLE_ITEMS * itemHeight;
  const totalHeight = data.length * itemHeight;
  
  // Calculate which items should be visible
  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      start + VISIBLE_ITEMS + BUFFER_SIZE,
      data.length
    );
    const bufferedStart = Math.max(0, start - BUFFER_SIZE);
    
    return {
      start: bufferedStart,
      end,
      offsetY: bufferedStart * itemHeight
    };
  }, [scrollTop, itemHeight, data.length]);
  
  const visibleItems = useMemo(() => {
    return data.slice(visibleRange.start, visibleRange.end);
  }, [data, visibleRange.start, visibleRange.end]);
  
  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };
  
  // Optimize scroll performance with throttling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let ticking = false;
    const throttledScroll = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll(e);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    container.addEventListener('scroll', throttledScroll, { passive: true });
    return () => container.removeEventListener('scroll', throttledScroll);
  }, []);
  
  if (data.length === 0) {
    return (
      <div role="region" aria-label="Data table">
        <div role="status">
          <div>📋</div>
          <div>Aucune donnée disponible</div>
          <div>Il n'y a actuellement aucun élément à afficher.</div>
        </div>
      </div>
    );
  }
  
  return (
    <div role="region" aria-label="Data table">
      <div>
        <table role="table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index}
                  role="columnheader"
                >
                  {column.header}
                </th>
              ))}
              {renderActions && (
                <th role="columnheader">
                  Actions
                </th>
              )}
            </tr>
          </thead>
        </table>
        
        <div
          ref={containerRef}
          style={{
            height: `${containerHeight}px`,
            overflowY: 'auto',
            position: 'relative'
          }}
          onScroll={handleScroll}
        >
          <div style={{ height: `${totalHeight}px`, position: 'relative' }}>
            <div
              style={{
                transform: `translateY(${visibleRange.offsetY}px)`,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0
              }}
            >
              <table role="table" style={{ width: '100%' }}>
                <tbody>
                  {visibleItems.map((row, index) => {
                    const actualIndex = visibleRange.start + index;
                    return (
                      <tr 
                        key={row.id || actualIndex}
                        role="row"
                        style={{ height: `${itemHeight}px` }}
                      >
                        {columns.map((column, colIndex) => (
                          <td 
                            key={colIndex}
                            role="cell"
                          >
                            {column.render ? column.render(row) : row[column.key]}
                          </td>
                        ))}
                        {renderActions && (
                          <td role="cell">
                            <div>
                              {renderActions(row)}
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(VirtualizedDataTable);