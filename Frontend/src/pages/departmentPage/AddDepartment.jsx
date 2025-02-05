import { useState } from "react";
import { registerDept } from "../../databaseFunctions/department"
import { useNavigate } from "react-router-dom";
import Loading from './../../components/Loading';



const AddDepartment = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);


  const [formData, setFormData] = useState({
    departmentname: "",
    location: "",
    desc: "",
    head: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null)
    // Add form submission logic here
    setLoading(true);
    const push = async () => {
      try {
        await registerDept(formData)
        setLoading(false);
        navigate('..')
      } catch (error) {
        setLoading(false);
        setError("Department Name and Location must be unique")
        console.log(error)
      }
    }
    push();
  };

  return (
    <>
      {loading && <Loading />}
      {error != null &&  <div className="font-bold p-4 text-red-400 text-center  bg-gray-100 dark:bg-background-primary"> {error}</div> }

      {loading == false && <>

        <form onSubmit={handleSubmit} className="h-full p-4 space-y-6 bg-gray-100 dark:bg-background-primary">
          <div className="bg-gray-50 dark:bg-background-secondary p-4 rounded-md">
            <h2 className="text-lg font-semibold dark:text-text-secondary text-gray-800 mb-4">Add Department</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Department Name</label>
                <input
                  type="text"
                  name="departmentname"
                  placeholder="Department Name"
                  value={formData.departmentname}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 mt-1 border rounded-md dark:bg-background-tertiary dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 mt-1 border rounded-md dark:bg-background-tertiary dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  name="desc"
                  placeholder="Description"
                  value={formData.desc}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border rounded-md dark:bg-background-tertiary dark:text-gray-100"
                />
              </div>

            </div>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-md dark:bg-background-secondary hover:bg-blue-700"
          >
            Add Department
          </button>
        </form>
      </>}
    </>
  );
};

export default AddDepartment;
