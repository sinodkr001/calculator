import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [history, setHistory] = useState([]);
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);

    // Load history from localStorage when the component mounts
    useEffect(() => {
        const storedHistory = localStorage.getItem('calculatorHistory');
        if (storedHistory) {
            try {
                setHistory(JSON.parse(storedHistory));
            } catch (error) {
                console.error("Failed to parse history from localStorage:", error);
                localStorage.removeItem('calculatorHistory'); // Remove corrupted data
            }
        }
    }, []);
    
    // Save history to localStorage whenever it changes
    useEffect(() => {
        if (history.length > 0) {
            localStorage.setItem('calculatorHistory', JSON.stringify(history));
        }
    }, [history]);

    const handleClick = (value) => {
        setInput(prevInput => prevInput + value);
    };

    const handleBackspace = () => {
        setInput(prevInput => prevInput.slice(0, -1));
    };

    const calculate = () => {
        try {
            const newResult = eval(input);
            setResult(newResult);
            setHistory(prevHistory => [...prevHistory, `${input} = ${newResult}`]);
            setInput("");
        } catch (e) {
            setResult("Error");
        }
    };

    const clearInput = () => {
        setInput("");
        setResult("");
    };

    const toggleHistory = () => {
        setIsHistoryVisible(!isHistoryVisible);
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-purple-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-72 mb-4">
                <h1 className="justify-center font-semibold text-2xl mb-4 text-center">Calculator</h1>
                <div className="text-right mb-2">
                    <div className="text-3xl">{result || "0"}</div>
                    <div className="text-sm text-gray-500">{input || "0"}</div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    <button className="btn" onClick={clearInput}>C</button>
                    <button className="btn" onClick={handleBackspace}>DE</button>
                    <button className="btn">%</button>
                    <button className="btn" onClick={() => handleClick('/')}>÷</button>
                    <button className="btn" onClick={() => handleClick('7')}>7</button>
                    <button className="btn" onClick={() => handleClick('8')}>8</button>
                    <button className="btn" onClick={() => handleClick('9')}>9</button>
                    <button className="btn" onClick={() => handleClick('*')}>×</button>
                    <button className="btn" onClick={() => handleClick('4')}>4</button>
                    <button className="btn" onClick={() => handleClick('5')}>5</button>
                    <button className="btn" onClick={() => handleClick('6')}>6</button>
                    <button className="btn" onClick={() => handleClick('-')}>−</button>
                    <button className="btn" onClick={() => handleClick('1')}>1</button>
                    <button className="btn" onClick={() => handleClick('2')}>2</button>
                    <button className="btn" onClick={() => handleClick('3')}>3</button>
                    <button className="btn" onClick={() => handleClick('+')}>+</button>
                    <button className="btn col-span-2" onClick={() => handleClick('0')}>0</button>
                    <button className="btn" onClick={() => handleClick('.')}>.</button>
                    <button className="btn" onClick={calculate}>=</button>
                </div>
                <button className="btn mt-4 w-full" onClick={toggleHistory}>
                    {isHistoryVisible ? 'Hide History' : 'Show History'}
                </button>
            </div>

            {/* History Section */}
            {isHistoryVisible && (
                <div className="bg-white p-6 rounded-lg shadow-lg w-72 ml-4 max-h-48 overflow-y-scroll">
                    <h2 className="text-lg font-semibold mb-4">History</h2>
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                        {history.length === 0 ? (
                            <li>No history yet</li>
                        ) : (
                            history.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default App;
