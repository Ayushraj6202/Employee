import React from "react";
import { Link } from "react-router-dom";

const Home = function () {
  return (
    <div
      className="min-h-screen bg-blue-50 text-gray-800"
      style={{
        backgroundImage: `url('https://blogimage.vantagecircle.com/content/images/2021/01/Employee-Management-Meaning-Importance-Tips-Tools---More.png')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better readability */}
      <div className="bg-blue-900 bg-opacity-60 min-h-screen">
        {/* Header Section */}
        <header className="py-6">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl font-bold">Employee Management System</h1>
            <p className="mt-2 text-lg">
              Manage employees, departments, designations, attendance, and salaries with ease.
            </p>
          </div>
        </header>

        {/* Main Content Section */}
        <main className="container mx-auto px-4 py-10">
          {/* Welcome Section */}
          <section className="text-center mb-10 text-white">
            <h2 className="text-3xl font-semibold">Welcome</h2>
            <p className="mt-4">
              Keep track of all your employees, departments, designations, and operations here.
            </p>
            <p>
              Monitor attendance, manage salaries, and streamline employee management seamlessly.
            </p>
          </section>

          {/* Links to Features */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Employees */}
            <Link
              to="/employees"
              className="bg-blue-500 text-white text-center py-6 rounded-lg shadow-md hover:bg-blue-600 transition-all"
            >
              <h3 className="text-xl font-semibold">Employees</h3>
              <p className="mt-2">View and manage employee details</p>
            </Link>

            {/* Departments */}
            <Link
              to="/departments"
              className="bg-green-500 text-white text-center py-6 rounded-lg shadow-md hover:bg-green-600 transition-all"
            >
              <h3 className="text-xl font-semibold">Departments</h3>
              <p className="mt-2">Add, edit, and manage departments</p>
            </Link>

            {/* Attendance */}
            {/* <Link
              to="/attendance"
              className="bg-yellow-500 text-white text-center py-6 rounded-lg shadow-md hover:bg-yellow-600 transition-all"
            >
              <h3 className="text-xl font-semibold">Attendance</h3>
              <p className="mt-2">Track employee attendance</p>
            </Link> */}

            {/* Salary */}
            {/* <Link
              to="/salary"
              className="bg-purple-500 text-white text-center py-6 rounded-lg shadow-md hover:bg-purple-600 transition-all"
            >
              <h3 className="text-xl font-semibold">Salary</h3>
              <p className="mt-2">Calculate and manage salaries</p>
            </Link> */}

            {/* Designations */}
            <Link
              to="/designations"
              className="bg-red-500 text-white text-center py-6 rounded-lg shadow-md hover:bg-red-600 transition-all"
            >
              <h3 className="text-xl font-semibold">Designations</h3>
              <p className="mt-2">Manage employee designations</p>
            </Link>
          </section>
        </main>

        {/* Footer Section */}
        {/* <footer className="bg-blue-800 text-white py-4">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Employee Management System. All rights reserved.</p>
          </div>
        </footer> */}
      </div>
    </div>
  );
};

export default Home;
