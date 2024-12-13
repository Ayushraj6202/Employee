import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SearchPattern = ({ path, patternOnReducer, patternReducer }) => {
    const dropdownOptions = useSelector(state => state[path].searchOn);
    const [selectedOption, setSelectedOption] = useState('');
    const [textInput, setTextInput] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        textInput.trim()
        dispatch(patternOnReducer(selectedOption));
        dispatch(patternReducer(textInput));
    };
    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-gray-200 dark:bg-background-tertiary shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">Search For {path}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-wrap sm:flex-nowrap items-start space-y-4 sm:space-y-0 sm:space-x-4">
                    <select
                        className="w-full sm:w-1/3 p-3 border border-gray-300 dark:border-background-primary rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-background-secondary dark:text-gray-200"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <option value="" disabled>Select Option</option>
                        {Object.keys(dropdownOptions).map((key) => (
                            <option key={key} value={key}>
                                {dropdownOptions[key]}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="w-full sm:flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-background-secondary dark:text-gray-200"
                        placeholder="Enter pattern here..."
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full sm:w-auto p-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchPattern;
