import React, { useMemo } from 'react'
import { useEffect, useState } from 'react'
import "../App.css"
import {BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer} from 'recharts'
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"
import LocationMap from './LocationMap';

const Admin = () => {
const [data, setData] = useState({userdata:[],total:0,todaySubmissions:[],weeklySubmissions:[]})
useEffect(() => {
    fetch("https://form-backend-4q6y.onrender.com/api/admin")
    .then(response => response.json())
    .then(res=>{
      console.log(res)
      setData(res)
    })
    .catch(err => console.error("Failed to fetch analytics:", err))
}, [])
const chartData=useMemo(()=>([
  {date:'Today',submissions: data?.todaySubmissions.length || 0},
  {date:'This Week',submissions: data?.weeklySubmissions.length || 0},
  {date:'Total',submissions: data?.total || 0}
]
))
console.log(chartData)

const exportToCSV = () => {
  const headers = ["Name", "Email", "IP Address", "City", "Country", "Date"];
  const rows = data.userdata.map(user => [
    user.name,
    user.email,
    user.ipAddress,
    user.city,
    user.country,
    new Date(user.createdAt).toLocaleString()
  ]);

  let csvContent = "data:text/csv;charset=utf-8," 
    + headers.join(",") + "\n"
    + rows.map(row => row.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "submissions.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const exportToPDF = (data) => {
  const doc = new jsPDF();
  const currentDate = new Date().toLocaleString();
  const img = new Image();
  img.src = "https://images.pexels.com/photos/2059466/pexels-photo-2059466.jpeg?cs=srgb&dl=-2059466.jpg&fm=jpg"

  img.onload = () => {
    doc.addImage(img, "PNG", 10, 10, 30, 30);
    doc.setFontSize(16);
    doc.text("Submission Summary Report", 50, 20);
    doc.setFontSize(10);
    doc.text(`Generated on: ${currentDate}`, 50, 27);

    doc.setFontSize(12);
    doc.text(`Total Submissions: ${data?.total}`, 14, 50);
    doc.text(`Today: ${data?.todaySubmissions?.length}`, 14, 60);
    doc.text(`This Week: ${data?.weeklySubmissions?.length}`, 14, 70);

    // Now safely use autoTable
    autoTable(doc, {
      head: [["#", "Name", "Email", "City", "Submitted At"]],
      body: data?.userdata?.map((entry, idx) => [
        idx + 1,
        entry.name,
        entry.email,
        entry.city,
        new Date(entry.createdAt).toLocaleString(),
      ]),
      startY: 80,
      margin: { top: 10 },
      styles: { fontSize: 10 },
      theme: "grid",
      didDrawPage: (data) => {
        doc.setFontSize(10);
        doc.text(`Page ${doc.internal.getNumberOfPages()}`, data.settings.margin.left, 10);
      },
    });

    doc.save("submissions_report.pdf");
  };
};

  return (
    <div className='Dashboard'>
      <h1>Dashboard</h1>
      {/* <LocationMap submissions={data?.userdata} /> */}
      <button onClick={exportToCSV}>Export CSV</button>
      <button onClick={exportToPDF}>Export PDF</button>
    <div className="chart-container">
      <h2 className='chart-title'>Submission Overview</h2>
      <ResponsiveContainer className="chart" width="100%" height={300}>
      <BarChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="date"/>
      <YAxis/>
      <Tooltip/>
      <Bar dataKey="submissions" fill="#8884d8"/>
      </BarChart>
      </ResponsiveContainer>
    </div>
      <div>Total Submissions till now : {data?.total}</div>
      <div>Today Submissions: {data?.todaySubmissions.length}</div>
      <div>Weekly Submissions: {data?.weeklySubmissions.length}</div>
      <h3>Recent Submissions</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>IP Address</th>
            <th>City</th>
            <th>Region</th>
            <th>Country</th>
            <th>Org</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Submitted at</th>
            </tr>
        </thead>
        <tbody>
        {data?.userdata?.map((sub,idx)=>(
          <tr key={idx}>
            <td>{idx+1}</td>
            <td>{sub.name}</td>
            <td>{sub.email}</td>
            <td>{sub.ipAddress}</td>
            <td>{sub.city}</td>
            <td>{sub.region}</td>
            <td>{sub.country}</td>
            <td>{sub.org}</td>
            <td>{sub.latitude}</td>
            <td>{sub.longitude}</td>
            <td>{sub.createdAt}</td>
         </tr>
         ))}
        </tbody>
      </table>
    </div>
  )
}

export default Admin
