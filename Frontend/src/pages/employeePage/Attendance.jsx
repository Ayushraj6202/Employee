import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAttendance, markAttendance } from '../../databaseFunctions/attendance';
import { Loading } from "../../components"

const AttendanceCalendar = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(true);
    const [dropdownDate, setDropdownDate] = useState(null);

    const { id } = useParams();
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
    console.log(selectedMonth, selectedYear);

    useEffect(() => {
        setLoading(true);
        const load = async () => {
            const res = await getAttendance(selectedYear, Number(selectedMonth) + 1, id);
            setAttendanceData(res);
        };
        load();
        setLoading(false);
    }, [selectedMonth, selectedYear]);

    const handleMonthChange = (event) => setSelectedMonth(event.target.value);
    const handleYearChange = (event) => setSelectedYear(event.target.value);

    const handleAttendanceSelect = (date, workday) => {
        const mark = async () => {
            await markAttendance(date, workday, id);
            setDropdownDate(null);
            setAttendanceData(prev => [...prev, { date: date.toISOString(), workday }]);
        };
        mark();
    };

    const getAttendanceStatus = (date) => {
        const dateString = date.toISOString().split('T')[0];
        const record = attendanceData.find((d) => d.date.startsWith(dateString));
        return record ? record.workday : null;
    };
    console.log("attdata ", attendanceData);

    const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <> {loading && <Loading />} {<>
            <div className="h-full p-4 space-y-6 bg-gray-100 dark:bg-background-secondary">
                <div className="flex justify-between mb-4">
                    <select
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="p-2 rounded-md border dark:bg-background-secondary dark:text-gray-100"
                    >
                        {Array.from({ length: 12 }, (_, index) => (
                            <option key={index} value={index}>
                                {new Date(0, index).toLocaleString('default', { month: 'long' })}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedYear}
                        onChange={handleYearChange}
                        className="p-2 rounded-md border dark:bg-background-secondary dark:text-gray-100"
                    >
                        {Array.from({ length: 10 }, (_, index) => (
                            <option key={index} value={new Date().getFullYear() - 5 + index}>
                                {new Date().getFullYear() - 5 + index}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-7 gap-2 border dark:border-background-secondary">
                    {weekdayNames.map((day, index) => (
                        <div key={index} className="text-center font-semibold text-gray-700 dark:text-gray-100">
                            {day}
                        </div>
                    ))}
                    {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                        <div key={index} className="w-full h-12"></div>
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, index) => {
                        const date = new Date(selectedYear, selectedMonth, index + 1);
                        const attendanceStatus = getAttendanceStatus(date);
                        const isUnmarked = !attendanceStatus;

                        const borderColor = attendanceStatus === 'Full Day'
                            ? 'bg-green-500'
                            : attendanceStatus === 'Absent'
                                ? 'bg-red-500'
                                : 'bg-blue-200';
                        return (
                            <div
                                key={index}
                                className={`relative w-full h-12 border ${borderColor} rounded-md flex items-center justify-center cursor-pointer`}
                                onClick={() => isUnmarked && setDropdownDate(date)}
                            >
                                {date.getDate()}
                                {isUnmarked && dropdownDate?.getTime() === date.getTime() && (
                                    <select
                                        onChange={(e) => handleAttendanceSelect(date, e.target.value)}
                                        className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 p-1 rounded-md border bg-white dark:bg-background-secondary dark:text-gray-100 z-10"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            Select Attendance
                                        </option>
                                        <option value="Full Day">Full Day</option>
                                        <option value="Absent">Absent</option>
                                    </select>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>}  </>
    );
};

export default AttendanceCalendar;

