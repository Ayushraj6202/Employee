import { useEffect, useState } from 'react';
import { getDeptList } from "../../databaseFunctions/department"
import { getDesigList } from "../../databaseFunctions/designation"
import { Loading } from "../../components"
import { addEmp } from "../../databaseFunctions/employee"
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {

    const [departments, setDepartments] = useState({});
    const [designations, setDesignations] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const response = await getDeptList({ on: "", pat: "", page: "" });
                setDepartments(response.docs);
                const res = await getDesigList({ on: "", pat: "", page: "" });
                setDesignations(res.docs);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        load();
    }, []);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        avatar: '',
        dob: '',
        gender: 'male',
        joiningdate: '',
        department: '',
        mobileno: '',
        address: '',
        designation: '',
        workingdays: [],
        payfrom: new Date().toISOString().slice(0, 10),
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleWorkingDaysChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevState) => {
            const newWorkingDays = checked
                ? [...prevState.workingdays, value]
                : prevState.workingdays.filter((day) => day !== value);
            return { ...prevState, workingdays: newWorkingDays };
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading ( true )
        try {
            await addEmp ( formData)
            alert ("Employee adder sucessfully")
            navigate ('..')
        } catch (error) {
            console.log ( error , " error " );
            alert( "Employee with same email or mobile no exist");
            setLoading ( false )
        }

    };


    return (
        <>

            { loading  && ( <Loading/>)}
            {!loading  && (               
                <form onSubmit={handleSubmit} className="p-4 space-y-6 bg-gray-100 dark:bg-background-primary ">
                    {/* Personal Details */}
                    <div className="bg-gray-50 dark:bg-background-secondary p-4 rounded-md">
                        <h2 className="text-lg font-semibold dark:text-text-secondary text-gray-800 mb-4">Personal Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300">First Name</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="First Name"
                                    value={formData.firstname}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 mt-1 border rounded-md dark:bg-background-tertiary dark:text-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300">Last Name</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    placeholder="Last Name"
                                    value={formData.lastname}
                                    onChange={handleInputChange}
                                    className="w-full p-2 mt-1 border rounded-md dark:bg-background-tertiary dark:text-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 mt-1 border rounded-md dark:bg-background-tertiary dark:text-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300">Mobile Number</label>
                                <input
                                    type="text"
                                    name="mobileno"
                                    placeholder="Mobile Number"
                                    value={formData.mobileno}
                                    onChange={handleInputChange}
                                    className="w-full p-2 mt-1 border rounded-md dark:bg-background-tertiary dark:text-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 mt-1 border rounded-md dark:bg-background-tertiary dark:text-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 mt-1 border rounded-md dark:bg-background-tertiary dark:text-gray-100"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Job Details */}
                    <div className="bg-gray-50 dark:bg-background-secondary p-4 rounded-md">
                        <h2 className="text-lg font-semibold dark:text-gray-100 text-gray-800 mb-4">Job Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300">Joining Date</label>
                                <input
                                    type="date"
                                    name="joiningdate"
                                    value={formData.joiningdate}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 mt-1 border rounded-md dark:bg-background-tertiary dark:text-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300">Department</label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 mt-1 border rounded-md dark:bg-background-tertiary dark:text-gray-100"
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((dept) => (
                                        <option key={dept._id} value={dept._id}>
                                            {`${dept.departmentname} , ${dept.location}` }
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300">Designation</label>
                                <select
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 mt-1 border rounded-md dark:bg-background-tertiary dark:text-gray-100"
                                >
                                    <option value="">Select Designation</option>
                                    {designations.map((desig) => (
                                        <option key={desig._id} value={desig._id}>
                                            {desig.designationName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300">Pay From</label>
                                <input
                                    type="date"
                                    name="payfrom"
                                    value={formData.payfrom}
                                    onChange={handleInputChange}
                                    className="w-full p-2 mt-1 border rounded-md dark:bg-background-tertiary dark:text-gray-100"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div className="bg-gray-50 dark:bg-background-secondary p-4 rounded-md">
                        <h2 className="text-lg font-semibold dark:text-gray-100 text-gray-800 mb-4">Additional Details</h2>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Address</label>
                            <textarea
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full p-2 mt-1 border rounded-md dark:bg-background-tertiary dark:text-gray-100"
                            ></textarea>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 dark:text-gray-300">Working Days</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                                    <label key={day} className="inline-flex items-center dark:text-gray-100 text-gray-700">
                                        <input
                                            type="checkbox"
                                            value={day}
                                            checked={formData.workingdays.includes(day)}
                                            onChange={handleWorkingDaysChange}
                                            className="mr-2"
                                        />
                                        {day}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-md"
                    >
                        Add Employee
                    </button>
                </form>
            )}
        </>
    );
};

export default AddEmployee;
