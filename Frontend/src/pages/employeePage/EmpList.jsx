import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loading as loadingReducer, emplist as empListReducer, pattern as patternReducer, patternOn as patternOnReducer } from '../../store/slices/employee_slice'
import { getEmpList } from "../../databaseFunctions/employee"
import { SearchPattern, Pagination, Table } from '../../components';
import { Loading } from '../../components';

const EmpList = () => {

    const newPat = useSelector(state => state.employee.pattern);
    const newPaton = useSelector(state => state.employee.patternOn);
    const pageno = useSelector(state => state.employee.pageno);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.employee.loading);
    const queryParams = new URLSearchParams(location.search);
    const patternOn = queryParams.get('PatternOn');
    const pattern = queryParams.get('Pattern');
    const page = queryParams.get('page') || 1;


    useEffect(() => {
        dispatch(loadingReducer(true))
        const caller = async () => {
            try {
                const response = await getEmpList({ on: patternOn || "", pat: pattern || "", page: page || 1 });
                dispatch(empListReducer(response));
                dispatch(loadingReducer(false));
            } catch (error) {
                console.log(error);
            }
        }
        caller();
    }, [patternOn, pattern, page])


    useEffect(() => {
        navigate(`?PatternOn=${newPaton}&Pattern=${newPat}&page=${pageno}`)
    }, [newPat, newPaton, pageno])

    return (
        <>
            {loading && <Loading />}
            {!loading && (
                <>
                    <div
                        className="min-h-full bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('https://empmonitor.com/blog/wp-content/uploads/2021/08/Work-from-home.jpg')`,
                        }}
                    >
                        {/* Overlay for readability */}
                        <div className="bg-gray-900 bg-opacity-50 min-h-full">
                            <div className="p-4">
                                <SearchPattern
                                    path={"employee"}
                                    patternReducer={patternReducer}
                                    patternOnReducer={patternOnReducer}
                                />
                            </div>
                            <div className="p-4 flex justify-center items-center bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 w-1/5 mx-auto">
                                <Link to="add-employee" className="font-semibold text-lg">
                                    Add Employee
                                </Link>
                            </div>
                            <div className="p-4">
                                <Table path={"employee"} listname={"emplist"} />
                            </div>
                            <div className="p-4">
                                <Pagination path={"employee"} listname={"emplist"} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );

}

export default EmpList