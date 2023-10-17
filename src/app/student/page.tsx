"use client";

import React, {ReactElement, useState} from "react";

export default function StudentHomePage() {

  const style1 = {
    height: '300px'
  }

  const style2 = {
    height: '120px'
  }

  const style3 = {
    height: '80px'
  }

  const style4 = {
    height: '180px'
  }

  const style5 = {
    height: '160px'
  }

  const style6 = {
    height: '25px'
  }

  return (
   <>
     <div className="dashboard">
       {/*// <!-- Card 1: Enrolled Courses -->*/}
       <div className="card">
         <h2>Enrolled Course</h2>
         <p>Computer Science</p>
       </div>

       {/*// <!-- Card 2: Average Score -->*/}
       <div className="card">
         <h2>Average Score</h2>
         <p>85%</p>
       </div>
      
       {/*// <!-- Card 3: Course Instructor -->*/}
        {/*//<div className="card">
         <h2>Course Instructor</h2>
         <p>John Doe</p>
       </div>*/}
     </div>
     <div className="course-card">
       <div className="bar-chart" style={style1}>
         <div className="bar">
           <div className="bar-fill" style={style2}></div>
           <div className="bar-label">Analytics</div>
         </div>
         <div className="bar">
           <div className="bar-fill" style={style2}></div>
           <div className="bar-label">Bayesian</div>
         </div>
         <div className="bar">
           <div className="bar-fill" style={style3}></div>
           <div className="bar-label">OOP</div>
         </div>
         <div className="bar">
           <div className="bar-fill" style={style4}></div>
           <div className="bar-label">Design</div>
         </div>
         <div className="bar">
           <div className="bar-fill" style={style5}></div>
           <div className="bar-label">DSA</div>
         </div>
       </div>
     </div>
     <h2>Performance Overview</h2>
     <table className="performance-table">
       <thead>
       <tr>
         <th>Course</th>
         <th>Average Score</th>
         <th>Grade</th>
       </tr>
       </thead>
       <tbody>
       <tr>
         <td>Data Analytics and Modelling</td>
         <td>80%</td>
         <td>A</td>
       </tr>
       <tr>
         <td>Object Oriented Programming</td>
         <td>65%</td>
         <td>B</td>
       </tr>
       <tr>
         <td>System Design & Analysis</td>
         <td>65%</td>
         <td>B</td>
       </tr>
       </tbody>
     </table>
   </>
  )
}
