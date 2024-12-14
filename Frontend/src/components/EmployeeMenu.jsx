import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OptionsMenu({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-gray-100 dark:bg-background-primary rounded-md flex justify-center">
      <div
        className={`${isOpen ? 'block' : 'hidden'
          } mt-4 md:mt-0 md:flex md:space-x-4 space-y-4 md:space-y-0`}
      >
        <button className="w-full md:w-auto px-4 py-2 rounded-full bg-yellow-600 text-white dark:bg-background-secondary hover:bg-blue-700"
          onClick={e => navigate(`/Employees/attendance/${id}`)}
        >
          Attendance
        </button>
        {/* <button className="w-full md:w-auto px-4 py-2 rounded-full bg-blue-600 text-white dark:bg-background-secondary hover:bg-blue-700"
            onClick={e => navigate(`/Employees/feedback/${id}`) }
        >
            Feedback 
        </button> */}
        {/* <button className="w-full md:w-auto px-4 py-2 rounded-full bg-green-600 text-white dark:bg-background-secondary hover:bg-blue-700"
          onClick={e => navigate(`/Employees/salary/${id}`)}
        >
          Salary
        </button> */}
      </div>
    </div>
  );
}

export default OptionsMenu;
