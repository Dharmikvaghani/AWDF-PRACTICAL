import React, { memo } from 'react';

const TaskAnalytics = memo(function TaskAnalytics({ tasks = [] }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const highPriority = tasks.filter(t => t.priority === 'high').length;

  return (
    <div className="card" style={{ marginTop: '16px', background: '#f0fdf4', borderColor: '#bbf7d0' }}>
      <h3 style={{ fontSize: '14px', color: '#166534', marginBottom: '8px' }}>
        📊 Real-Time Task Analytics (Lazy Loaded Bundle)
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
        <div style={{ padding: '8px', background: 'white', borderRadius: '6px', border: '1px solid #dcfce7' }}>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>{total}</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Total Tasks</div>
        </div>
        <div style={{ padding: '8px', background: 'white', borderRadius: '6px', border: '1px solid #dcfce7' }}>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#16a34a' }}>{completed}</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Completed</div>
        </div>
        <div style={{ padding: '8px', background: 'white', borderRadius: '6px', border: '1px solid #dcfce7' }}>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#f59e0b' }}>{pending}</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Pending</div>
        </div>
        <div style={{ padding: '8px', background: 'white', borderRadius: '6px', border: '1px solid #dcfce7' }}>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#ef4444' }}>{highPriority}</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>High Priority</div>
        </div>
      </div>
    </div>
  );
});

export default TaskAnalytics;
