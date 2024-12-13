import { useEffect, useState } from "react";
import { Loading, InfoCard } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { getDepartmentDetails, updateDepartment, deleteDept } from "../../databaseFunctions/department";

const DepartmentDetails = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({});
    const [employees, setEmployees] = useState(0);
    useEffect(() => {
        const fetchdata = async () => {
            const res = await getDepartmentDetails(id)
            setFormData(res.data.department);
            setEmployees(res.data.employeeCount)
            setLoading(false)
        }
        fetchdata()

    }, [])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const toggleEdit = () => {
        if (isEditing) {
            // Save logic here if required
            setLoading(true)
            const upd = async () => {
                const fData = { ...formData, id: id }
                await updateDepartment(fData)
                setLoading(false)
            }
            upd()
        }
        setIsEditing(!isEditing);
    };

    const onDelete = () => {
        setLoading(true)
        const del = async () => {
            await deleteDept(id)
            setLoading(false)
            navigate('..')
        }
        del()
    }
    return (
        <>
            {loading && <Loading />}
            {error != null && <div className="font-bold p-4 text-red-400 text-center  bg-gray-100 dark:bg-background-primary"> {error}</div>}
            {!loading && <>

                <div className="p-4 h-full bg-gray-50 dark:bg-background-secondary rounded-md shadow-md space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-text-secondary">
                            {isEditing ? "Edit Department" : "Department Details"}
                        </h2>
                        <div className="space-x-2">
                            <button
                                onClick={toggleEdit}
                                className={`px-4 py-2 rounded-md ${isEditing ? "bg-green-600" : "bg-blue-600"} text-white hover:${isEditing ? "bg-green-700" : "bg-blue-700"}`}
                            >
                                {isEditing ? "Save" : "Edit"}
                            </button>
                            <button
                                onClick={onDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Department Name</label>
                            <input
                                type="text"
                                name="departmentname"
                                value={formData.departmentname}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="w-full p-2 mt-1 border rounded-md dark:bg-background-tertiary dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="w-full p-2 mt-1 border rounded-md dark:bg-background-tertiary dark:text-gray-100"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-gray-700 dark:text-gray-300">Description</label>
                            <textarea
                                name="desc"
                                value={formData.desc}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="w-full p-2 mt-1 border rounded-md dark:bg-background-tertiary dark:text-gray-100"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-cente">
                        <InfoCard number={employees} description="Total Employees" />
                    </div>
                </div>

            </>}
        </>
    );
};

export default DepartmentDetails;

