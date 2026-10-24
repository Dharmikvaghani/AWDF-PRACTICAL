// Practical 13: Generative AI Service with Heuristic Fallback Engine
export async function generateTaskDescription({ title, priority = 'medium' }) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

  if (apiKey && apiKey !== 'your_api_key_here') {
    try {
      // Direct REST call to Gemini / OpenAI if key is configured
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `Generate a concise 2-sentence technical implementation plan and checklist for a task titled "${title}" with ${priority} priority.` }]
          }]
        })
      });
      if (response.ok) {
        const json = await response.json();
        const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            description: text.trim(),
            source: 'gemini-1.5-flash'
          };
        }
      }
    } catch (err) {
      console.warn('AI API call failed, falling back to heuristic synthesizer:', err.message);
    }
  }

  // Resilient Zero-Downtime Contextual Heuristic Synthesizer (Practical 13 requirement)
  return {
    description: `### Objective\nExecute containerization deliverables for '${title}'.\n### Action Plan: 1. Review multi-stage Dockerfiles  2. Configure Compose bridge network  3. Verify named volumes.\n${priority.toUpperCase()} Priority: Complete as early as possible within the current development sprint.`,
    source: 'contextual-heuristic-engine'
  };
}
