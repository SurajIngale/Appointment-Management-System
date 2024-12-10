import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../assets/css/Home.module.css';

const Home = () => {
  return (
    <div className={`container-fluid ${styles.container}`}>
      <div className="">
        <div className=" text-center">
          <h1 className="">Welcome to Appointment Management System</h1>
          <p className="">
            Manage your appointments easily and efficiently.
          </p>
          <button className="btn bg-body-secondary btn-lg me-2" onClick={() => window.location.href='/patient/login'}>
            Login
          </button>
          <button className="btn bg-body-secondary btn-lg" onClick={() => window.location.href='/register'}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
