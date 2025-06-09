"use client"; // Indicates that this component is a client component in a Next.js application

import React, { useState, useEffect } from 'react'; // Importing React and hooks
import Navbar from '../components/Navbar/navbar'; // Importing the Navbar component
import AnimatedCard from '../components/AnimatedCard/AnimatedCard'; // Importing the AnimatedCard component
import FloatingElements from '../components/FloatingElements/FloatingElements'; // Importing FloatingElements for background effects
import { ArrowRight, Play, Star } from 'lucide-react'; // Importing icons from Lucide
import ImageSlider from '../components/Slider/slider'; // Importing the ImageSlider component
import Image from 'next/image'; // Importing Next.js Image component for optimized images
import styles from './page.module.css'; // Importing CSS module for styling

// Main functional component for the Home Page
export default function HomePage() {
  // State to keep track of the current testimonial index
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // State to store the message from the backend
  const [backendMessage, setBackendMessage] = useState('');

  // Array of testimonials with user details and messages
  const testimonials = [
    { name: "Sarah Chen", role: "Medical Student", text: "FlashcardVault transformed my study routine. I aced my MCAT thanks to their comprehensive card sets!", rating: 5 },
    { name: "Marcus Rodriguez", role: "Language Learner", text: "The Spanish vocabulary cards are incredible. I'm finally fluent after using these for 6 months!", rating: 5 },
    { name: "Dr. Emily Watson", role: "Resident Physician", text: "As a busy resident, these pre-made cards save me hours. The quality is exceptional.", rating: 4 }
  ];

  // Effect to automatically change the displayed testimonial every 4 seconds
  useEffect(() => {
    // Set an interval to update the current testimonial
    const timer = setInterval(() => {
      // Update the index, wrapping around when reaching the end of the array
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000); // 4000 milliseconds = 4 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [testimonials.length]); // Dependency array ensures this effect runs only when testimonials.length changes

  // Effect to fetch a message from the backend API on component mount
  useEffect(() => {
    // Fetch data from the backend
    fetch('http://127.0.0.1:5000/api/hello')
      .then((res) => res.json()) // Parse the JSON response
      .then((data) => setBackendMessage(data.message)) // Set the backend message in state
      .catch((err) => console.error('Error fetching backend message:', err)); // Log any errors
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  return (
    <div className="min-h-screen bg-white"> {/* Main container with minimum height and white background */}
      <Navbar /> {/* Render the Navbar component */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-gray-50 via-white to-rose-50 overflow-hidden"> {/* Background section */}
        <FloatingElements /> {/* Render floating decorative elements */}
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10"> {/* Centered container for content */}
          <div className="grid md:grid-cols-2 gap-12 items-center"> {/* Grid layout for two columns */}

            <AnimatedCard> {/* Animated card component for smooth transitions */}
              <div className="space-y-8"> {/* Vertical spacing for inner elements */}
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"> {/* Main heading */}
                  Master Any Subject with{" "}
                  <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent"> {/* Gradient text */}
                    Premium Flashcards
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed"> {/* Subheading */}
                  Unlock your learning potential with Anki decks covering the entire specification!
                </p>



                {backendMessage && ( // Conditional rendering based on backend message
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4"> {/* Status message container */}
                    <p className="text-green-800 font-medium"> {/* Message text */}
                      <strong>Backend Status:</strong> {backendMessage}
                    </p>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-4"> {/* Flex container for buttons */}
                  <button className="group bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center"> {/* Browse button */}
                    Browse Products
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /> {/* Arrow icon */}
                  </button>
                  <button className="flex items-center justify-center px-8 py-4 border-2 border-gray-300 rounded-full text-lg font-semibold text-gray-700 hover:border-rose-500 hover:text-rose-500 transition-all duration-300"> {/* Watch demo button */}
                    <Play className="mr-2 w-5 h-5" /> {/* Play icon */}
                    Watch Demo
                  </button>
                </div>
                <div className="flex items-center space-x-8 pt-4"> {/* Flex container for stats */}
                  <div className="text-center"> {/* Happy students stat */}
                    <div className="text-2xl font-bold text-gray-900">50K+</div> {/* Count */}
                    <div className="text-sm text-gray-600">Happy Students</div> {/* Label */}
                  </div>
                  <div className="text-center"> {/* Card decks stat */}
                    <div className="text-2xl font-bold text-gray-900">500+</div> {/* Count */}
                    <div className="text-sm text-gray-600">Card Decks</div> {/* Label */}
                  </div>
                  <div className="text-center"> {/* Success rate stat */}
                    <div className="text-2xl font-bold text-gray-900">98%</div> {/* Count */}
                    <div className="text-sm text-gray-600">Success Rate</div> {/* Label */}
                  </div>
                </div>
              </div>
            </AnimatedCard>
            {/* Additional content can be added here */}
            <div className = {styles.imagecontainer}> 
              <Image
                src="/images/FlashcardVaultLogo.png" // Path to the hero image
                width={450} 
                height={300}
                alt="Logo"
                className="rounded-2xl shadow-lg object-cover" // Styling for the image
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20"> {/* Section for the image slider */}
        <ImageSlider /> {/* Render the ImageSlider component */}
      </section>

      {/* Testimonials Marquee Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful learners who transformed their studies
            </p>
          </div>
          
          <div className="relative overflow-hidden">
            <style jsx>{`
              @keyframes marquee {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .animate-marquee {
                animation: marquee 30s linear infinite;
              }
              .animate-marquee:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="flex animate-marquee space-x-8 w-max">
              {/* Duplicate testimonials for seamless loop */}
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-96 bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
                >
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-lg text-gray-800 font-medium mb-6 leading-relaxed">
                    &quot;{testimonial.text}&quot;
                  </blockquote>
                  

                  {/* Displaying user details with a gradient background */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>



                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional sections like Features, Call-to-Action, and Footer can follow here */}

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ready to Ace Your Exams?
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful learners today!
            </p>

            <div className={styles.signupbutton}>
              <button className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white px-3 py-2.5 rounded-full text-sm font-semibold"> {/* Mobile Log In/Register button */}
              Log In / Register
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}