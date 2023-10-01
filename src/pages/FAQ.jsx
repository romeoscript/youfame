import React, { useState } from "react";
import { BsChevronRight as ChevronDownIcon } from "react-icons/bs";
import Footer from "../component/footer/Footer";


const faqs = [
    {
        question: "What is React?",
        answer:
            "React is a JavaScript library for building user interfaces. It allows you to create reusable UI components and manage the state of your application efficiently.",
    },
    {
        question: "What is Tailwind?",
        answer:
            "Tailwind is a utility-first CSS framework that allows you to quickly build custom designs without writing any CSS. It provides a set of pre-defined classes that you can use to style your HTML elements.",
    },
    {
        question: "How do I install React and Tailwind?",
        answer:
            "You can install React and Tailwind using npm or yarn. Here's an example command: npm install react tailwindcss",
    },
];

function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    function handleClick(index) {
        setActiveIndex(index === activeIndex ? null : index);
    }

    return (
        <>
            <div className="text-white md:w-3/5 w-[90%] m-auto mt-[8rem] min-h-[100vh] ">
                <h2 className="text-white text-center text-3xl font-bold p-[2rem] ">Frequently Asked Questions</h2>
                {faqs.map((faq, index) => (
                    <div key={index} className=" py-4">
                        <button
                            onClick={() => handleClick(index)}
                            className="flex justify-between border-l-8 rounded-sm border-[#FF7D00]  text-white items-center w-full px-4 py-2 text-lg font-medium text-left  focus:outline-none "
                        >
                            <span>{faq.question}</span>
                            <ChevronDownIcon
                                className={`${activeIndex === index ? "transform rotate-90" : ""
                                    } w-5 h-5`}
                            />
                        </button>
                        {activeIndex === index && (
                            <p className="mt-2 px-4 text-gray-500 w-4/5 p-[1.5rem] border border-white bg-gray-300 bg-opacity-5 backdrop-blur-md rounded-md">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}

export default FAQ;
