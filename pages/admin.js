import React, { useState, useEffect } from 'react';
import styles from "../styles/global.module.css"; 
//import firebase from "firebase/app";
import "firebase/auth";
//import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import firebase from '../helpers/firebaseauth';
import withAuth from '../helpers/withAuth';


const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth); // Sign out the user
    // Redirect to the login page or any other page as needed
    router.push('/login');
  };

  const router = useRouter(); // Get router instance

  // useEffect(() => {
  //   const auth = getAuth();
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       // Redirect to login page if user is not authenticated
  //       router.push('/login');
  //     }
  //   });
     // Clean up the listener when the component unmounts
    //  return () => unsubscribe();
    // }, []);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false); // Set loading to false when authentication state changes
      if (user) {
        setAuthenticated(true); // Set authenticated to true if user is authenticated
      } else {
        router.replace('/login'); // Redirect to login page if user is not authenticated
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe from onAuthStateChanged listener on component unmount
    };
  }, []);


  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication state
  }

  if (!authenticated) {
    return null; // Render nothing if user is not authenticated to prevent showing the admin page content
  }
 
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
        <button onClick={handleLogout}>Logout</button>
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

export default withAuth(Admin);
