import {useEffect, useState} from "react";

export default function GradeGenerator({scoreString}) {
    const [grade,setGrade] = useState('');

    useEffect(() => {
        // cast score to a float
        const score = parseFloat(scoreString.trim()).toFixed(2);
        // evaluate score to determine grade
        if (score >= 80.00 && score <= 100.00) {
            setGrade("A");
        } else if (score >= 70) {
            setGrade("B");
        } else if (score >= 60) {
            setGrade("C");
        } else if (score >= 50) {
            setGrade("D");
        } else {
            setGrade("F");
        }
    }, [scoreString]);
    return (
        <>
            {grade}
        </>
    )
}