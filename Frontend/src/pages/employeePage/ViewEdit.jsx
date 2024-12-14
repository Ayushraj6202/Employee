import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Loading as LoadingComp } from '../../components';
import { getDeptList } from "../../databaseFunctions/department"
import { getDesigList } from "../../databaseFunctions/designation"
import { getEmp, updateEmp } from "../../databaseFunctions/employee"
import { EmployeeMenu } from '../../components';

const EmployeeDetails = () => {

  const { id } = useParams();
  const [Loading, setLoading] = useState(true);

  const [editPersonal, setEditPersonal] = useState(false);
  const [editJob, setEditJob] = useState(false);
  const [editOther, setEditOther] = useState(false);
  const [departments, setDepartments] = useState();
  const [designations, setDesignations] = useState();
  const [employee, setEmp] = useState();

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getDeptList({ on: "", pat: "", page: "" });
        setDepartments(response.docs);
        const res = await getDesigList({ on: "", pat: "", page: "" });
        setDesignations(res.docs);
        const fdata = await getEmp({ id: id });
        const put = await fdata.data
        put.id = put._id
        setEmp(put);
        setFormData(put);
        setLoading(false);
      } catch (error) {
        console.log("error is fetching data \n")
      }
    }
    fetchEmployee();

  }, [id])
  // State for input fields
  const handleEditToggle = (section) => {
    setLoading(true)
    setEmp(formData)
    const upd = async () => {
      try {
        const res = await updateEmp(formData)
        console.log(res)
      } catch (error) {
        console.log(error);
      }
    }
    upd();
    setLoading(false)

    if (section === "personal") {
      setEditPersonal(!editPersonal);
    } else if (section === "job") {
      setEditJob(!editJob);
    } else if (section === "other") {
      setEditOther(!editOther);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (day) => {
    setFormData((prevState) => ({
      ...prevState,
      workingdays: prevState.workingdays.includes(day)
        ? prevState.workingdays.filter((d) => d !== day)
        : [...prevState.workingdays, day]
    }));
  };

  return (
    <>
      {Loading && (<LoadingComp />)}
      {!Loading && <>
        <div className="dark:bg-background-primary bg-gray-100 p-6  shadow-md h-full">

          < EmployeeMenu id={id} />

          {/* Personal Details */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold dark:text-text-primary text-black mb-2">Personal Details</h2>
            <div className="dark:bg-background-secondary bg-gray-300 p-4 rounded">
              {editPersonal ? (
                <>
                  <label className="block dark:text-text-primary text-black mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="dark:bg-background-tertiary bg-gray-200 dark:text-text-primary text-black w-full mb-2 p-2 rounded"
                    placeholder="First Name"
                  />
                  <label className="block dark:text-text-primary text-black mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="dark:bg-background-tertiary bg-gray-200 dark:text-text-primary text-black w-full mb-2 p-2 rounded"
                    placeholder="Last Name"
                  />
                  <label className="block dark:text-text-primary text-black mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="dark:bg-background-tertiary bg-gray-200 dark:text-text-primary text-black w-full mb-2 p-2 rounded"
                    placeholder="Email"
                  />
                  <label className="block dark:text-text-primary text-black mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={new Date(formData.dob).toISOString().split('T')[0]} // Ensure date format
                    onChange={handleChange}
                    className="dark:bg-background-tertiary bg-gray-200 dark:text-text-primary text-black w-full mb-2 p-2 rounded"
                  />
                  <label className="block dark:text-text-primary text-black mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="dark:bg-background-tertiary bg-gray-200 dark:text-text-primary text-black w-full mb-2 p-2 rounded"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </>
              ) : (
                <>
                  <p className="dark:text-text-primary text-black mb-2">Name: {employee.firstname} {employee.lastname}</p>
                  <p className="dark:text-text-primary text-black mb-2">Email: {employee.email}</p>
                  <p className="dark:text-text-primary text-black mb-2">DOB: {new Date(employee.dob).toLocaleDateString()}</p>
                  <p className="dark:text-text-primary text-black mb-2">Gender: {employee.gender}</p>
                </>
              )}
              <button
                onClick={() => handleEditToggle("personal")}
                className="bg-blue-500 text-white p-2 rounded mt-2"
              >
                {editPersonal ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          {/* Job Details */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold dark:text-text-primary text-black mb-2">Job Details</h2>
            <div className="dark:bg-background-secondary bg-gray-300 p-4 rounded">
              {editJob ? (
                <>
                  <label className="block dark:text-text-primary text-black mb-1">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="dark:bg-background-tertiary bg-gray-200 dark:text-text-primary text-black w-full mb-2 p-2 rounded"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept._id} value={dept._id}>{`${dept.departmentname} , ${dept.location}`}</option>
                    ))}
                  </select>
                  <label className="block dark:text-text-primary text-black mb-1">Designation</label>
                  <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="dark:bg-background-tertiary bg-gray-200 dark:text-text-primary text-black w-full mb-2 p-2 rounded"
                  >
                    <option value="">Select Designation</option>
                    {designations.map(des => (
                      <option key={des._id} value={des._id}>{des.designationName}</option>
                    ))}
                  </select>
                  <label className="block dark:text-text-primary text-black mb-1">Joining Date</label>
                  <input
                    type="date"
                    name="joiningdate"
                    value={new Date(formData.joiningdate).toISOString().split('T')[0]}
                    onChange={handleChange}
                    className="dark:bg-background-tertiary bg-gray-200 dark:text-text-primary text-black w-full mb-2 p-2 rounded"
                  />
                  <div className="mb-2">
                    <h3 className="dark:text-text-primary text-black mb-2">Working Days</h3>
                    {daysOfWeek.map((day) => (
                      <label key={day} className="block dark:text-text-primary text-black">
                        <input
                          type="checkbox"
                          checked={formData.workingdays.includes(day)}
                          onChange={() => handleCheckboxChange(day)}
                          className="mr-2"
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="dark:text-text-primary text-black mb-2">
                    Department: {departments.find(dept => dept._id === employee.department)?.departmentname},
                    {departments.find(dept => dept._id === employee.department)?.location}
                  </p>
                  <p className="dark:text-text-primary text-black mb-2">Designation: {designations.find(des => des._id === employee.designation)?.designationName}</p>
                  <p className="dark:text-text-primary text-black mb-2">Joining Date: {new Date(employee.joiningdate).toLocaleDateString()}</p>
                  <p className="dark:text-text-primary text-black mb-2">Working Days: {employee.workingdays.join(', ')}</p>
                </>
              )}
              <button
                onClick={() => handleEditToggle("job")}
                className="bg-blue-500 text-white p-2 rounded mt-2"
              >
                {editJob ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          {/* Other Details */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold dark:text-text-primary text-black mb-2">Other Details</h2>
            <div className="dark:bg-background-secondary bg-gray-300 p-4 rounded">
              {editOther ? (
                <>
                  <label className="block dark:text-text-primary text-black mb-1">Mobile Number</label>
                  <input
                    type="text"
                    name="mobileno"
                    value={formData.mobileno}
                    onChange={handleChange}
                    className="dark:bg-background-tertiary bg-gray-200 dark:text-text-primary text-black w-full mb-2 p-2 rounded"
                    placeholder="Mobile Number"
                  />
                  <label className="block dark:text-text-primary text-black mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="dark:bg-background-tertiary bg-gray-200 dark:text-text-primary text-black w-full mb-2 p-2 rounded"
                    placeholder="Address"
                  />
                </>
              ) : (
                <>
                  <p className="dark:text-text-primary text-black mb-2">Mobile No: {employee.mobileno}</p>
                  <p className="dark:text-text-primary text-black mb-2">Address: {employee.address}</p>
                </>
              )}
              <button
                onClick={() => handleEditToggle("other")}
                className="bg-blue-500 text-white p-2 rounded mt-2"
              >
                {editOther ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </div>

      </>}
    </>
  );
};

export default EmployeeDetails;
