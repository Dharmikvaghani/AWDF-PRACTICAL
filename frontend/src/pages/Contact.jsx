import React, { useState } from 'react';
import Header from '../components/Header';

function Contact() {
  const [formData, setFormData] = useState({
    name: 'Dharmik Vaghani',
    email: '24cs104@charusat.edu.in',
    message: 'Hello! Inquiring regarding AWDF Practical 2 routing and state management.'
  });
  const [submitted, setSubmitted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div>
      <Header
        name="Dharmik Vaghani"
        subtitle="Dharmik Vaghani (24CS104) | ITUE301: Practical 2: React State & Routing"
      />
      <div className="container">
        <section className="card">
          <h2>📭 Contact & Message Routing (Dynamic Form State)</h2>
          <p className="meta-text">Demonstrating React Router DOM declarative routing and useState feedback state.</p>

          <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                Message
                <button
                  type="button"
                  onClick={() => setShowTooltip(prev => !prev)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    marginLeft: '8px',
                    fontSize: '11px',
                    color: '#2563eb'
                  }}
                >
                  ℹ️ {showTooltip ? 'Hide Tip' : 'Show Tip'}
                </button>
              </label>
              {showTooltip && (
                <div style={{ fontSize: '11px', color: '#16a34a', marginBottom: '6px' }}>
                  Tip: Form input is controlled synchronously by React useState!
                </div>
              )}
              <textarea
                name="message"
                className="form-input"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <div style={{ fontSize: '11px', color: '#64748b', textAlign: 'right', marginTop: '4px' }}>
                Live Characters: {formData.message.length}
              </div>
            </div>

            <button type="submit" className="btn-primary">
              📨 Send Message
            </button>
          </form>

          {submitted && (
            <div style={{ marginTop: '14px', padding: '10px 14px', background: '#dcfce7', color: '#166534', borderRadius: '6px', fontSize: '13px' }}>
              ✅ Message routed and state stored successfully!
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Contact;
