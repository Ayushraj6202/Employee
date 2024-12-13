import { useDispatch, useSelector } from "react-redux";
import { pageno as page_reducer } from "../store/slices/employee_slice"

const Pagination = ({path , listname }) => {

    const totalPages = useSelector ( state =>  state[path][listname]?.totalPages || 1);
    // const totalPages = 450 ; 
    const currentPage = useSelector ( state => state[path].pageno )
    const dispatch = useDispatch()

    const handlePrev = () => {
        if (currentPage > 1) {
            const npage = Number(currentPage) -1 ; 
            dispatch ( page_reducer ( npage  ))
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            const npage = Number(currentPage) +  1 ; 
            dispatch ( page_reducer ( npage ))
        }
    };

    return (
        <>
            <div className="flex justify-center items-center space-x-4">
                <button
                    className="px-4 py-2 bg-gray-300 dark:bg-background-tertiary text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {currentPage} / {totalPages}
                </span>

                <button
                    className="px-4 py-2 bg-gray-300 dark:bg-background-tertiary text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>

            </div>
        </>
    )
}

export default Pagination;