import React, { useState } from 'react';

const Dropdown = ({ options, setSelectedJokeType }: { options: any, setSelectedJokeType: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(options[0]);
    const [index, setIndex] = useState(0)

    const toggleDropdown = () => setIsOpen(!isOpen);

    // Get index from option value
    const getIndex = (option: any) => {
        return options.indexOf(option)
    }

    const handleOptionClick = (option: any) => {
        setSelected(option);
        // setSelectedVariation(variations[getIndex(option)]);
        setSelectedJokeType(option);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="inline-flex justify-between w-56 rounded-md border bg-gray-700 text-gray-100 border-gray-600 shadow-sm px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    id="options-menu"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                >
                    {selected}
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-700 text-gray-100 border-gray-600 ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                >
                    <div className="py-1" role="none">
                        {options.map((option: any) => (
                            <button
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 hover:transition hover:duration-500 w-full text-left rounded-2xl"
                                role="menuitem"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
