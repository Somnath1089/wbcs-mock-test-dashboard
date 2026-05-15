import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BookOpen, Brain, Clock, Trophy, BarChart3, RefreshCcw, CheckCircle2 } from 'lucide-react';
import './styles.css';

const subjects = [
  { name: 'English Composition', questions: 25, color: 'blue' },
  { name: 'General Science', questions: 25, color: 'green' },
  { name: 'Current Affairs', questions: 25, color: 'orange' },
  { name: 'History of India', questions: 25, color: 'purple' },
  { name: 'Geography of India & WB', questions: 25, color: 'teal' },
  { name: 'Indian Polity & Economy', questions: 25, color: 'red' },
  { name: 'Indian National Movement', questions: 25, color: 'indigo' },
  { name: 'General Mental Ability', questions: 25, color: 'pink' },
];

const questionBank = [
  {
    id: 'ENG-001',
    subject: 'English Composition',
    question: "Choose the synonym of 'Abundant'.",
    options: ['Scarce', 'Plentiful', 'Weak', 'Tiny'],
    answer: 'Plentiful',
    explanation: 'Abundant means available in large quantity.',
  },
  {
    id: 'SCI-001',
    subject: 'General Science',
    question: 'Which vitamin is produced in human skin in sunlight?',
    options: ['Vitamin A', 'Vitamin B12', 'Vitamin C', 'Vitamin D'],
    answer: 'Vitamin D',
    explanation: 'Sunlight helps the skin synthesize Vitamin D.',
  },
  {
    id: 'CA-001',
    subject: 'Current Affairs',
    question: 'Current affairs preparation should be revised mainly through which cycle?',
    options: ['Daily only', 'Daily, weekly and monthly', 'Yearly only', 'No revision'],
    answer: 'Daily, weekly and monthly',
    explanation: 'A layered revision cycle improves retention for WBCS prelims.',
  },
  {
    id: 'HIS-001',
    subject: 'History of India',
    question: 'Who founded the Maurya Empire?',
    options: ['Ashoka', 'Chandragupta Maurya', 'Bindusara', 'Harsha'],
    answer: 'Chandragupta Maurya',
    explanation: 'Chandragupta Maurya founded the Maurya Empire.',
  },
  {
    id: 'GEO-001',
    subject: 'Geography of India & WB',
    question: 'The Sundarbans delta is mainly formed by which river system?',
    options: ['Ganga-Brahmaputra-Meghna', 'Narmada-Tapi', 'Godavari-Krishna', 'Mahanadi'],
    answer: 'Ganga-Brahmaputra-Meghna',
    explanation: 'The Sundarbans is part of the Ganga-Brahmaputra-Meghna delta system.',
  },
  {
    id: 'POL-001',
    subject: 'Indian Polity & Economy',
    question: 'Who is known as the guardian of the Indian Constitution?',
    options: ['Parliament', 'Supreme Court', 'President', 'Election Commission'],
    answer: 'Supreme Court',
    explanation: 'The Supreme Court protects constitutional supremacy through judicial review.',
  },
  {
    id: 'INM-001',
    subject: 'Indian National Movement',
    question: 'The Non-Cooperation Movement was launched in which year?',
    options: ['1905', '1919', '1920', '1930'],
    answer: '1920',
    explanation: 'The Non-Cooperation Movement was launched by Gandhi in 1920.',
  },
  {
    id: 'GMA-001',
    subject: 'General Mental Ability',
    question: 'Find the next number: 2, 4, 8, 16, ?',
    options: ['20', '24', '30', '32'],
    answer: '32',
    explanation: 'Each term is multiplied by 2.',
  },
];

function calculateResult(questions, answers) {
  let correct = 0;
  let wrong = 0;
  let unattempted = 0;

  questions.forEach((q) => {
    if (!answers[q.id]) unattempted += 1;
    else if (answers[q.id] === q.answer) correct += 1;
    else wrong += 1;
  });

  return {
    correct,
    wrong,
    unattempted,
    score: Number((correct - wrong / 3).toFixed(2)),
    accuracy: questions.length ? Math.round((correct / questions.length) * 100) : 0,
  };
}

function App() {
  const [mode, setMode] = useState('dashboard');
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const activeQuestions = useMemo(() => questionBank, []);
  const result = calculateResult(activeQuestions, answers);

  const resetTest = () => {
    setAnswers({});
    setSubmitted(false);
    setMode('mock');
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">WBCS Prelims Preparation System</p>
          <h1>Mock Test Dashboard</h1>
          <p className="hero-text">
            Subject-wise practice, PYQ-style questions, current affairs tests, negative marking and performance analytics in one fast dashboard.
          </p>
          <div className="hero-actions">
            <button onClick={() => setMode('mock')}>Start Demo Mock</button>
            <button className="secondary" onClick={() => setMode('dashboard')}>View Dashboard</button>
          </div>
        </div>
        <div className="score-card">
          <Trophy size={34} />
          <h2>Target Score</h2>
          <strong>130–150</strong>
          <span>High-scoring prelims range</span>
        </div>
      </section>

      {mode === 'dashboard' && (
        <>
          <section className="metrics-grid">
            <div className="metric"><BookOpen /><span>8 Subjects</span><strong>200 Marks</strong></div>
            <div className="metric"><Clock /><span>Exam Time</span><strong>150 Min</strong></div>
            <div className="metric"><Brain /><span>Negative Marking</span><strong>1/3</strong></div>
            <div className="metric"><BarChart3 /><span>Analytics</span><strong>Accuracy + Weak Area</strong></div>
          </section>

          <section className="panel">
            <div className="section-title">
              <h2>Subject-wise Practice</h2>
              <p>Each subject contains 25 questions in the final WBCS prelims pattern.</p>
            </div>
            <div className="subject-grid">
              {subjects.map((subject) => (
                <article className="subject-card" key={subject.name}>
                  <div className={`dot ${subject.color}`} />
                  <h3>{subject.name}</h3>
                  <p>{subject.questions} questions · 25 marks</p>
                  <button onClick={() => setMode('mock')}>Practice</button>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

      {mode === 'mock' && (
        <section className="panel">
          <div className="section-title test-head">
            <div>
              <h2>Demo Mock Test Engine</h2>
              <p>Replace the sample questions with your WBCS PYQ and current affairs JSON database.</p>
            </div>
            <div className="timer"><Clock size={18} /> 150:00</div>
          </div>

          <div className="questions">
            {activeQuestions.map((q, index) => (
              <article className="question-card" key={q.id}>
                <h3>Q{index + 1}. {q.question}</h3>
                <div className="options">
                  {q.options.map((option) => (
                    <label key={option} className={answers[q.id] === option ? 'selected' : ''}>
                      <input
                        type="radio"
                        name={q.id}
                        value={option}
                        checked={answers[q.id] === option}
                        onChange={() => setAnswers({ ...answers, [q.id]: option })}
                        disabled={submitted}
                      />
                      {option}
                    </label>
                  ))}
                </div>
                {submitted && (
                  <p className={answers[q.id] === q.answer ? 'correct' : 'wrong'}>
                    <CheckCircle2 size={16} /> Correct Answer: {q.answer}. {q.explanation}
                  </p>
                )}
              </article>
            ))}
          </div>

          <div className="submit-row">
            <button onClick={() => setSubmitted(true)}>Submit Test</button>
            <button className="secondary" onClick={resetTest}><RefreshCcw size={16} /> Restart</button>
          </div>

          {submitted && (
            <div className="result-grid">
              <div><span>Score</span><strong>{result.score} / {activeQuestions.length}</strong></div>
              <div><span>Correct</span><strong>{result.correct}</strong></div>
              <div><span>Wrong</span><strong>{result.wrong}</strong></div>
              <div><span>Unattempted</span><strong>{result.unattempted}</strong></div>
              <div><span>Accuracy</span><strong>{result.accuracy}%</strong></div>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
