import React from 'react';
import styles from "../styles/global.module.css"; 

//<form onSubmit={(e) => handleSubmit(e)}>

const IndexPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    
      //console.log(formData);
    
    fetch('/api/submit-petition', {
      method: 'POST',
      //body: formData
    })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  };

  return (
    <div className={styles.container}>
    <h1 className={styles.heading}>Save the Clifton Park, NY Castle Playground</h1>
    <p className={styles.paragraph}>
      The Clifton Park Castle Playground is more than just a playground. It's a cherished community landmark that has brought joy to generations of residents. It's a place where children can play, imagine, and create memories that will last a lifetime.
    </p>
    <p className={styles.paragraph}>
      This playground is one of the few remaining wooden playgrounds in the area, and it's a testament to the hard work and dedication of the town residents who raised the money to build it. It's a symbol of our community spirit and our commitment to providing a safe and enjoyable space for our children.
    </p>
    <img src="https://cdn.thelocalmomsnetwork.net/wp-content/uploads/sites/9/2019/05/21130537/img_3429.jpg" className={styles.imgFluid} alt="Clifton Park Castle Playground" />
    <br />
    <br />
    <div className={styles.row}>
      <div className={styles.colMd6}>
        <h2 className={styles.heading}>Sign the Petition</h2>
        <form action="/api/submit-petition" method="post">
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name:</label>
            <input type="text" className={styles.formControl} id="name" name="name" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.label}>Address OR Neighborhood:</label>
            <input type="text" className={styles.formControl} id="address" name="address" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="comments" className={styles.label}>Comments:</label>
            <textarea className={styles.formControl} id="comments" name="comments" rows="5" placeholder="Tell us why this playground is important to you"></textarea>
          </div>
          <button type="submit" className={styles.button}>Submit</button>
        </form>
      </div>
    </div>
  </div>

  );
};

export default IndexPage;
