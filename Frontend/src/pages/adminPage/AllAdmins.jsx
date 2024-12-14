import { useEffect, useState } from "react";
import { getAllAdmins, deleteAdmins } from "../../databaseFunctions/admin.js";

const AllAdmins = () => {
  const [data, setdata] = useState([]);
  const [error, seterror] = useState("");

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await getAllAdmins();
        setdata(response.data.data);
      } catch (error) {
        seterror(error.message || "Failed to fetch admins");
      }
    };
    getDetails();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteAdmins(id);
      setdata(data.filter((admin) => admin._id !== id));
      seterror(""); // Clear any previous errors
    } catch (error) {
      seterror(error.message || "Failed to delete admin");
    }
  };

  return (
    <>
      {error && (
        <div className="text-red-500 bg-orange-100 p-1 text-lg mb-4">
          {error}
        </div>
      )}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-background-primary py-8">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((it, index) => (
            <div
              key={index}
              className="bg-blue-100 dark:bg-background-secondary rounded-lg shadow-md p-4"
            >
              {Object.keys(it).map((key) => {
                if (
                  key === "_id" ||
                  key === "createdAt" ||
                  key === "updatedAt" ||
                  key === "__v" ||
                  key === "password" ||
                  key === "refreshToken"
                ) {
                  return null;
                } else {
                  return (
                    <div key={key} className="mb-2">
                      <span className="block font-semibold text-gray-800 dark:text-text-primary">
                        {key}:
                      </span>
                      <span className="block text-gray-600 dark:text-text-secondary">
                        {it[key]}
                      </span>
                    </div>
                  );
                }
              })}
              <button
                onClick={() => handleDelete(it._id)}
                className="mt-4 w-full p-2 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllAdmins;
