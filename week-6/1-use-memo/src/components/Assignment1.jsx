import { useMemo } from "react";
import { useState } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
    const [count, setCount] = useState(0);
    const [input, setInput] = useState(0);
    // Your solution starts here 
    function findFactorial(value) {
        let factorial = 1
        for (let i = value; i >= 1; i-- ) {
            factorial = factorial * i
        }
        return factorial;
    }

    const factorial = useMemo(() => {
        console.log("useMemo facorial: Hi!")
        return findFactorial(input);
    }, [input])
    // Your solution ends here

    return (
        <div>
            <input 
                type="number" 
                value={input} 
                onChange={(e) => setInput(Number(e.target.value))} 
            />
            <p>Calculated Value: {factorial}</p>
            <button onClick={() => setCount(count + 1)}>Count {count}</button>
        </div>
    );
}