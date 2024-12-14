import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Table = ({ path, listname }) => {
    const data = useSelector(state => state[path][listname]?.docs || []);
    const headers = useSelector(state => state[path].headers);
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleRowClick = (id) => {
        navigate(`${location.pathname}/details/${id}`);
    };
    // console.log(data,path,listname,headers);
    
    return (
        <div className="overflow-x-auto rounded-md">
            <table className="min-w-full border-collapse table-auto">
                <thead>
                    <tr className="dark:bg-gray-700 bg-gray-200 bg-opacity-150">
                        {Object.keys(headers).map((key) => (
                            <th 
                                key={key} 
                                className="p-4 text-left text-sm font-semibold dark:text-gray-100 text-gray-800"
                            >
                                {headers[key]}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={`cursor-pointer ${
                                rowIndex % 2 === 0
                                    ? 'dark:bg-background-secondary bg-gray-100 bg-opacity-100'
                                    : 'dark:bg-background-tertiary bg-white bg-opacity-70'
                            }`}
                            onClick={() => handleRowClick(row._id)}
                        >
                            {Object.keys(headers).map((key) => (
                                <td
                                    key={key}
                                    className="p-4 text-sm dark:text-gray-300 text-gray-700"
                                >
                                    {row[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
