import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentPassword, updateAdminDetails } from "../databaseFunctions/admin";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const data = useSelector((state) => state.admin.data);
    const [change, setchange] = useState(false);
    const [newpass, setnewpass] = useState("");
    const [oldpass, setoldpass] = useState("");
    const [error, seterror] = useState("");
    const [success, setsuccess] = useState("");
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({ fullname: data.fullname, email: data.email });
    // console.log(formData, data);
    const navigate = useNavigate();
    useEffect(() => {
        if (data.fullname && data.email) {
            setFormData({ fullname: data.fullname, email: data.email });
        }
    }, [data])
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handlePasswordChange = async () => {
        seterror('');
        setsuccess('');
        try {
            const resp = await changeCurrentPassword(oldpass, newpass);
            setsuccess(resp.data.message);
            seterror('');
        } catch (error) {
            seterror(error.response.data.message);
            setsuccess("");
        }
    };
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const handleSave = () => {
        setchange(e => !e);
        handlePasswordChange();
    }
    const handleSaveUpdate = async () => {
        setEdit(false);
        seterror('');
        setsuccess('');
        try {
            const res = await updateAdminDetails(formData.fullname, formData.email);
            console.log(res);
            setsuccess(res.data.message);
        } catch (error) {
            console.log(error);
            seterror(error.response.data.message);
        }
    }
    return (
        <div className="container mx-auto mt-10 p-5 max-w-3xl bg-white shadow-md rounded-lg">
            {/* Error and Success Messages */}
            {error && (
                <div className="text-red-500 bg-orange-100 p-1 text-lg mb-4">
                    {error}
                </div>
            )}
            {success && (
                <div className="text-green-500 bg-orange-100 p-1 text-lg mb-4">
                    {success}
                </div>
            )}
            {/* User Details Section */}
            <div className="mb-5">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Profile Details</h2>
                <div className="bg-gray-100 p-4 rounded-md">
                    {Object.keys(data).map((key) => {
                        // Exclude "_id" and "__v"
                        if (key === "_id" || key === "__v") return null;
                        // Format "createdAt" and "updatedAt"
                        if (key === "createdAt" || key === "updatedAt") {
                            return (
                                <div
                                    key={key}
                                    className="flex justify-between py-2 border-b border-gray-300 last:border-b-0"
                                >
                                    <span className="font-medium text-gray-600 capitalize">
                                        {key === "createdAt" ? "Created At" : "Updated At"}:
                                    </span>
                                    <span className="text-gray-800">{formatDate(data[key])}</span>
                                </div>
                            );
                        }
                        if (key === "fullname" || key === "email") {
                            return (
                                <div
                                    key={key}
                                    className="flex justify-between py-2 border-b border-gray-300 last:border-b-0"
                                >
                                    <label htmlFor={key} className="font-medium text-gray-600 capitalize">
                                        {key}:
                                    </label>
                                    <input
                                        type="text"
                                        name={key}
                                        value={formData[key]}
                                        disabled={!edit}
                                        onChange={handleChange}
                                        className={`ml-2 p-1 border rounded-md ${edit ? "bg-white" : "bg-gray-200"}`}
                                    />
                                </div>
                            );
                        }
                        // Default rendering for other keys
                        return (
                            <div
                                key={key}
                                className="flex justify-between py-2 border-b border-gray-300 last:border-b-0"
                            >
                                <span className="font-medium text-gray-600 capitalize">
                                    {key}:
                                </span>
                                <span className="text-gray-800">{data[key]}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="flex justify-between">
                {/* Password Change Section */}
                <div className="">
                    {!change ? (
                        <button
                            onClick={() => setchange((prev) => !prev)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                        >
                            Change Password?
                        </button>
                    ) : (
                        <div className="bg-gray-100 p-5 rounded-md">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Old Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full p-2 border rounded-md"
                                    onChange={(e) => setoldpass(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full p-2 border rounded-md"
                                    onChange={(e) => setnewpass(e.target.value)}
                                />
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                >
                                    Save Password
                                </button>
                                <button
                                    onClick={() => setchange((prev) => !prev)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {/* Edit Buttons */}
                <div className=" space-x-4">
                    {!edit ? (
                        <button
                            onClick={() => setEdit(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                        >
                            Edit Details
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleSaveUpdate}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                            >
                                Save Details
                            </button>
                            <button
                                onClick={() => setEdit(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Now here register admin details */}
            <div className="mt-5 flex justify-between">
                <div>
                    <button
                    onClick={()=>navigate('/admin/register')}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-green-600 transition"
                    >
                        Register New Admin
                        </button>
                </div>
                <div>
                    <button
                    onClick={()=>navigate('/admin/all')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-green-600 transition"
                    >
                        View All Admin
                        </button>
                </div>
            </div>

        </div>
    );
};

export default Profile;
