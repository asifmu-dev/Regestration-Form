import { useState } from "react";
import "./App.css";

const COURSES = ["Computer Science", "Business Administration", "Electrical Engineering", "Graphic Design", "Psychology"];
const GENDERS = ["Female", "Male", "Other"];

const EMPTY_FORM = { name: "", email: "", phone: "", course: "", gender: "" };

function checkForm(form) {
  const mistakes = {};

  if (form.name.trim().length < 3) {
    mistakes.name = "Name must be at least 3 letters.";
  }

  if (!form.email.includes("@")) {
    mistakes.email = "Email must contain @.";
  }

  if (form.phone.replace(/\D/g, "").length < 10) {
    mistakes.phone = "Phone must have at least 10 digits.";
  }

  if (!form.course) mistakes.course = "Please pick a course.";
  if (!form.gender) mistakes.gender = "Please pick a gender.";

  return mistakes;
}

export default function StudentRegistration() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [mistakes, setMistakes] = useState({});
  const [students, setStudents] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    setMistakes({ ...mistakes, [name]: "" });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = checkForm(form);
    setMistakes(found);

    if (Object.keys(found).length > 0) return;

    setStudents([...students, { id: Date.now(), ...form }]);
    setForm(EMPTY_FORM);
  }

  function handleReset() {
    setForm(EMPTY_FORM);
    setMistakes({});
  }

  return (
    <div className="page">
      <main className="layout">

        <section className="card">
          <h1>🎓 Student Registration</h1>
          <p className="subtitle">Fill in your details below to register.</p>

          <form onSubmit={handleSubmit} noValidate>

            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Asif"
              value={form.name}
              onChange={handleChange}
            />
            {mistakes.name && <p className="error">{mistakes.name}</p>}

            <label>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="asif@example.com"
              value={form.email}
              onChange={handleChange}
            />
            {mistakes.email && <p className="error">{mistakes.email}</p>}

            <label>Phone Number</label>
            <input
              name="phone"
              type="tel"
              placeholder="03001234567"
              value={form.phone}
              onChange={handleChange}
            />
            {mistakes.phone && <p className="error">{mistakes.phone}</p>}

            <label>Course</label>
            <select name="course" value={form.course} onChange={handleChange}>
              <option value="">-- Select a course --</option>
              {COURSES.map((c) => <option key={c}>{c}</option>)}
            </select>
            {mistakes.course && <p className="error">{mistakes.course}</p>}

            <label>Gender</label>
            <div className="radios">
              {GENDERS.map((g) => (
                <label key={g} className="radio">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={form.gender === g}
                    onChange={handleChange}
                  />
                  {g}
                </label>
              ))}
            </div>
            {mistakes.gender && <p className="error">{mistakes.gender}</p>}

            <div className="actions">
              <button type="submit">Register Student</button>
              <button type="button" onClick={handleReset}>Clear</button>
            </div>
          </form>
        </section>
        <section className="card">
          <h2>Registered Students ({students.length})</h2>

          {students.length === 0 && (
            <p className="empty">No students yet. Fill the form to add one.</p>
          )}

          <ul>
            {students.map((s) => (
              <li key={s.id}>
                <strong>{s.name}</strong>
                <p>{s.email}</p>
                <p>{s.phone}</p>
                <p>{s.course}</p>
                <p>{s.gender}</p>
              </li>
            ))}
          </ul>
        </section>

      </main>
    </div>
  );
}