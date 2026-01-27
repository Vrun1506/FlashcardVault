"use client";
import React from "react";
// import Link from "next/link";
import Navbar from "../components/Navbar";

const DemoPage = () => {

    return(
        <>
            <Navbar activeSection = "demo" setActiveSection = {() => {}} />
            <div className = "min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                    <iframe
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        width="560"
                        height="315"
                        title="Flashcard Vault Demo Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </>
    )
}

export default DemoPage;