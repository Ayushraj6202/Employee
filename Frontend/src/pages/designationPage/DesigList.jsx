import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loading as loadingReducer, desiglist as desigListReducer, pattern as patternReducer, patternOn as patternOnReducer } from '../../store/slices/designation_slice';
import { getDesigList } from "../../databaseFunctions/designation";
import { SearchPattern, Pagination, Table, Loading } from '../../components';

const DesignationList = () => {
  const newPat = useSelector(state => state.designation.pattern);
  const newPaton = useSelector(state => state.designation.patternOn);
  const pageno = useSelector(state => state.designation.pageno);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.designation.loading);
  const queryParams = new URLSearchParams(location.search);
  const patternOn = queryParams.get('PatternOn');
  const pattern = queryParams.get('Pattern');
  const page = queryParams.get('page') || 1;

  useEffect(() => {
    dispatch(loadingReducer(true));
    const fetchData = async () => {
      try {
        const response = await getDesigList({ on: patternOn || "", pat: pattern || "", page: page || 1 });
        dispatch(desigListReducer(response));
        dispatch(loadingReducer(false));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [patternOn, pattern, page]);

  useEffect(() => {
    navigate(`?PatternOn=${newPaton}&Pattern=${newPat}&page=${pageno}`);
  }, [newPat, newPaton, pageno]);

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div
          className="h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://empmonitor.com/blog/wp-content/uploads/2021/08/Work-from-home.jpg')`,
          }}
        >
          {/* Semi-transparent overlay for better readability */}
          <div className="min-h-full bg-gray-900 bg-opacity-50">
            <div className="p-4">
              <SearchPattern path={"designation"} patternReducer={patternReducer} patternOnReducer={patternOnReducer} />
            </div>
            <div className="p-4 flex justify-center items-center bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 w-1/5 mx-auto">
              <Link to="add-designation" className="font-semibold text-lg">
                Add Designation
              </Link>
            </div>
            <div className="p-4">
              <Table path={"designation"} listname={"desiglist"} />
            </div>
            <div className="p-4">
              <Pagination path={"designation"} listname={"desiglist"} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DesignationList;
