import React, { useState, useEffect } from 'react';
import styles from "../styles/global.module.css"; 

const Admin = () => {
  const [petitions, setPetitions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchPetitions();
  }, [startDate, endDate]); // Fetch petitions whenever startDate or endDate changes

  const fetchPetitions = async () => {
    try {
      let url = '/api/petitions';
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setPetitions(data);
    } catch (error) {
      console.error('Failed to fetch petitions:', error);
    }
  };

  const handleDateFilterSubmit = (e) => {
    e.preventDefault();
    fetchPetitions();
  };

  return (


    <div className={styles.container}>
        <h1>Admin Dashboard</h1>
        <p>Coming Soon!</p>
        <img src="https://www.cliftonpark.com/images/commonplayground.jpg" alt="Admin Dashboard Preview" />
        <p>We're currently working on bringing you an awesome admin dashboard with powerful data management features.</p>
        <p>Please check back later for updates.</p>
    </div>



    // <div>
    //   <h1>Admin Page</h1>
    //   <form onSubmit={handleDateFilterSubmit}>
    //     <label htmlFor="startDate">Start Date:</label>
    //     <input
    //       type="date"
    //       id="startDate"
    //       value={startDate}
    //       onChange={(e) => setStartDate(e.target.value)}
    //     />
    //     <label htmlFor="endDate">End Date:</label>
    //     <input
    //       type="date"
    //       id="endDate"
    //       value={endDate}
    //       onChange={(e) => setEndDate(e.target.value)}
    //     />
    //     <button type="submit">Apply</button>
    //   </form>
    //   <div>
    //   <h2>Petitions Table</h2>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Name</th>
    //         <th>Address</th>
    //         <th>Comments</th>
    //         <th>Date</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {petitions.map(petition => (
    //         <tr key={petition.id}>
    //           <td>{petition.name}</td>
    //           <td>{petition.address}</td>
    //           <td>{petition.comments}</td>
    //           <td>{petition.date}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    // </div>
  );
};

export default Admin;
