"use client";
import React, { useState } from 'react';
import axios from 'axios';
import "./globals.css";

export default function Home() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [agifyResponse, genderizeResponse, nationalizeResponse] = await Promise.all([
        axios.get(`https://api.agify.io?name=${name}`),
        axios.get(`https://api.genderize.io?name=${name}`),
        axios.get(`https://api.nationalize.io?name=${name}`)
      ]);
      setAge(agifyResponse.data.age);
      setGender(genderizeResponse.data.gender);
      setCountry(nationalizeResponse.data.country[0]?.country_id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClear = () => {
    setName('');
    setAge('');
    setGender('');
    setCountry('');
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24 bg-cover" id="myMain">
      <h1 className="text-2xl font-bold mb-8" id="heading">Hy Vee</h1>
      <div id="header">
        <p id="paragraph">Age, Gender, Country Predictor by Name</p>
      </div>
      <div className="flex flex-row" id="main-div" style={{ marginBottom: "100px" }}>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 shadow-lg bg-white p-6 rounded-md" id="form">
            <h2 className="text-lg font-bold mb-4">Guess Me</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="border border-gray-300 rounded-md px-4 py-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Submit
            </button>
            <button type="button" onClick={handleClear} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">
              Clear
            </button>
          </form>
        </div>
        <div className="flex flex-col gap-4 p-6 shadow-lg bg-white rounded-md" id="rectangle-box">
          <div className="rectangle-box flex flex-row">
            <h3 id="text-heading">Age : </h3>
            <div className="rectangle-box-content">{age && <p id="text">{age}</p>}</div>
          </div>
          <div className="rectangle-box flex flex-row">
            <h3 id="text-heading">Gender : </h3>
            <div className="rectangle-box-content">{gender && <p id="text">{gender}</p>}</div>
          </div>
          <div className="rectangle-box flex flex-row">
            <h3 id="text-heading">Country : </h3>
            <div className="rectangle-box-content">{country && <p id="text">{country}</p>}</div>
          </div>
        </div>
      </div>
    </main>
  );
}