import React, { useEffect, useState } from 'react';
import { Loading } from "../../components"
import { getSalary, calSalary, compTrans , register } from '../../databaseFunctions/salary';
import { useNavigate, useParams } from 'react-router-dom';

const SalaryDetails = () => {
    const [salary, setSalary] = useState(0);
    const [payment, setPayment] = useState(null);
    const [transactionId, setTransactionId] = useState("");
    const [todate, settodate] = useState(null);
    const [fromdate, setfromdate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recal, setRecal] = useState(true);
    const [showUpdateSalary, setShowUpdateSalary] = useState(false);
    const [newSalary, setNewSalary] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const gtSalary = async () => {
            setLoading(true);
            const res = await getSalary(id);                      
            setSalary(res[0].salary);
            setLoading(false);
        }
        gtSalary();
    }, [recal]);

    const calculatePayment = async (date) => {
        settodate(date);
        setLoading(true);
        const res = await calSalary(id, date);
        console.log(res, "response h ye");
        setPayment(res.payment);
        setfromdate(res.startDate);
        setLoading(false);
    };

    const completePayment = async (transactionId) => { 
        setLoading(true);
        const res = await compTrans(id, todate, fromdate, transactionId, payment);
        console.log(res, "response h ye payment updation ka");
        setLoading(false);
    };

    const handleUpdateSalary = async () => {
        
        setLoading(true);      
        const res = await register(id, newSalary);        
        setRecal ( ! recal );        
        setLoading(false);
        console.log(`Updating salary to: ${newSalary}`);
    };

    return (
        <div className='min-h-full bg-gray-100 dark:bg-background-primary'>
            <div className='p-4'>
                <h2 className='text-lg font-bold dark:text-text-primary'>Present Salary</h2>
                <p className='text-md dark:text-gray-100'>{`${salary}`}</p>
                
                {/* Update Salary Button */}
                <button
                    className='mt-4 bg-yellow-600 text-white rounded-md px-4 py-2 hover:bg-yellow-700'
                    onClick={() => setShowUpdateSalary(!showUpdateSalary)}
                >
                    Update Salary
                </button>

                {/* Update Salary Input */}
                {showUpdateSalary && (
                    <div className='mt-4'>
                        <input
                            type='number'
                            className='w-full p-2 mt-1 rounded-md bg-gray-50 dark:bg-background-tertiary dark:text-gray-100'
                            placeholder='Enter new salary'
                            value={newSalary}
                            onChange={(e) => setNewSalary(e.target.value)}
                        />
                        <button
                            className='mt-2 bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700'
                            onClick={handleUpdateSalary}
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>

            <div className='p-4 bg-white dark:bg-background-secondary rounded-lg shadow'>
                <h3 className='text-lg font-semibold dark:text-text-primary'>Calculate Payment</h3>
                <div className='mt-4'>
                    <label className='block text-sm font-medium dark:text-text-secondary'>Date up to</label>
                    <input
                        type='date'
                        className='w-full p-2 mt-1 rounded-md bg-gray-50 dark:bg-background-tertiary dark:text-gray-100'
                        onChange={(e) => calculatePayment(e.target.value)}
                    />
                </div>
                <button
                    className='mt-4 bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700'
                    onClick={() => setPayment(1000)} // Example amount, replace with calculated payment
                >
                    Calculate
                </button>
            </div>

            {payment && (
                <div className='p-4 mt-6 bg-white dark:bg-background-secondary rounded-lg shadow'>
                    <h3 className='text-lg font-semibold dark:text-text-primary'>Enter Transaction ID and Complete Payment</h3>
                    <div className="font-semibold dark:text-text-primary">{`Payment of ${payment} up to ${todate}`}</div>
                    <div className='mt-4'>
                        <label className='block text-sm font-medium dark:text-text-secondary'>Transaction ID</label>
                        <input
                            type='text'
                            className='w-full p-2 mt-1 rounded-md bg-gray-50 dark:bg-background-tertiary dark:text-gray-100'
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                        />
                    </div>
                    <button
                        className='mt-4 bg-green-600 text-white rounded-md px-4 py-2 hover:bg-green-700'
                        onClick={() => completePayment(transactionId)}
                    >
                        Complete Payment
                    </button>
                </div>
            )}
        </div>
    );
};

export default SalaryDetails;
