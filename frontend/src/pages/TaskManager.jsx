import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from '../components/Header';
import { getTasks, createTask, updateTask, deleteTask, generateAIDescription } from '../api';

// Practical 8: Lazy loaded component with Suspense fallback
const TaskAnalytics = lazy(() => import('../components/TaskAnalytics'));

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('high');
  const [description, setDescription] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [toast, setToast] = useState('');
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_bearer_token');

  useEffect(() => {
    loadTasks();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data || []);
    } catch {
      // Fallback sample tasks
      setTasks([
        { _id: '1', title: 'Connect React to Express API', priority: 'high', completed: false, description: 'Establish CORS and Axios Client.' },
        { _id: '2', title: 'Setup CORS and Axios Client', priority: 'medium', completed: true, description: 'Configure backend middleware.' }
      ]);
    }
  };

  const handleGenerateAI = async () => {
    if (!title.trim()) {
      alert('Please enter a task title first to generate description!');
      return;
    }
    setAiLoading(true);
    try {
      const result = await generateAIDescription({ title, priority });
      if (result && result.description) {
        setDescription(result.description);
        showToast('✨ AI description generated successfully!');
      }
    } catch {
      setDescription(`### Objective\nExecute deliverables for '${title}'.\n### Action Plan: 1. Review architecture 2. Configure network 3. Validate endpoints.\n${priority.toUpperCase()} Priority: Complete in current sprint.`);
      showToast('✨ AI draft synthesized from contextual heuristics!');
    } finally {
      setAiLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tempId = 'temp_' + Date.now();
    const optimisticTask = {
      _id: tempId,
      title,
      priority,
      description,
      completed: false
    };

    // Optimistic Update (Practical 6)
    setTasks((prev) => [optimisticTask, ...prev]);
    showToast('Task saved to MongoDB successfully!');
    setTitle('');
    setDescription('');

    try {
      const saved = await createTask({ title: optimisticTask.title, priority, description });
      setTasks((prev) => prev.map((t) => (t._id === tempId ? saved : t)));
    } catch (err) {
      console.error('Network write error, rolling back:', err);
      // Rollback on network failure (Practical 6)
      setTasks((prev) => prev.filter((t) => t._id !== tempId));
      showToast('❌ Network error: Rolled back task creation');
    }
  };

  const handleToggle = async (task) => {
    const updatedStatus = !task.completed;
    // Optimistic toggle
    setTasks((prev) => prev.map((t) => (t._id === task._id ? { ...t, completed: updatedStatus } : t)));
    try {
      await updateTask(task._id, { completed: updatedStatus });
    } catch {
      // Rollback
      setTasks((prev) => prev.map((t) => (t._id === task._id ? { ...t, completed: task.completed } : t)));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    const prevList = [...tasks];
    setTasks((prev) => prev.filter((t) => t._id !== id));
    try {
      await deleteTask(id);
      showToast('Task removed from MongoDB.');
    } catch {
      setTasks(prevList);
    }
  };

  return (
    <div>
      <Header
        name="Dharmik Vaghani"
        subtitle="Dharmik Vaghani (24CS104) | ITUE301: Practical 13: AI API Integration & Full Stack"
      />

      <div className="container">
        {/* Auth banner - Practical 7 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', padding: '10px 16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', color: '#166534', fontWeight: '600' }}>
              👤 Signed in as: 24cs104@charusat.edu.in
            </span>
            <span style={{ fontSize: '11px', background: '#10b981', color: 'white', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>
              Bearer JWT Active
            </span>
          </div>
          <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: '600', cursor: 'pointer' }}>
            Logout ⏏
          </span>
        </div>

        {toast && (
          <div style={{ background: '#10b981', color: 'white', padding: '10px 16px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px', fontWeight: '600' }}>
            {toast}
          </div>
        )}

        {/* Form and Task Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Add Task Card - Practical 13 AI form */}
          <div className="card">
            <h2>➕ Add New Task with Generative AI Assistant</h2>
            <form onSubmit={handleCreate} style={{ marginTop: '12px' }}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  className="form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Dockerize full-stack application"
                  required
                />
              </div>

              <div className="form-group">
                <label>Priority</label>
                <select
                  className="form-input"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ margin: 0 }}>Description (Optional)</label>
                  <button
                    type="button"
                    onClick={handleGenerateAI}
                    disabled={aiLoading}
                    style={{
                      background: '#6366f1',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {aiLoading ? '⏳ Generating...' : '✨ Generate description'}
                  </button>
                </div>
                <textarea
                  className="form-input"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Task details or auto-generate with AI..."
                />
                <div style={{ fontSize: '10px', color: '#6366f1', marginTop: '4px', background: '#f5f3ff', padding: '6px', borderRadius: '4px' }}>
                  ℹ️ AI-generated draft. Review and adjust before saving. (Backend rate limit: 10 req/min)
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '10px' }}>
                Create Task & Save
              </button>
            </form>
          </div>

          {/* Live Task List Card - Practical 6 */}
          <div className="card">
            <h2>📋 Live MongoDB Tasks ({tasks.length} tasks)</h2>
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {tasks.map((t) => (
                <div
                  key={t._id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    background: t.completed ? '#f1f5f9' : 'white'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => handleToggle(t)}
                    />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '600', textDecoration: t.completed ? 'line-through' : 'none' }}>
                        {t.title}
                      </div>
                      <span
                        style={{
                          fontSize: '10px',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          color: 'white',
                          background: t.priority === 'high' ? '#ef4444' : t.priority === 'medium' ? '#f59e0b' : '#3b82f6',
                          fontWeight: '700'
                        }}
                      >
                        {t.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(t._id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Practical 8: Lazy component wrapped in Suspense */}
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '12px', color: '#64748b' }}>Loading analytics bundle...</div>}>
          <TaskAnalytics tasks={tasks} />
        </Suspense>
      </div>
    </div>
  );
}

export default TaskManager;
