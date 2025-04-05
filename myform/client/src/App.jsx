import { useState } from 'react'
import './App.css'

function App() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const res = await fetch("http://localhost:5000/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    const data = await res.json();
    console.log("Backend response:", data);
    setResponse(data.message);
  };
  return (
    <div>
      <h1>Form</h1>
      <form action="post" onSubmit={handleSubmit}>
      <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br /><br />
        <button type='submit'>Submit</button>
        <p>{response}</p>
      </form>
    </div>
  )
}

export default App
