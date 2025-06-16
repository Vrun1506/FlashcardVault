"use client"; // Indicates that this component is a client component in a Next.js application

import React, { useState, useEffect } from 'react'; // Importing React and hooks
import Navbar from '../components/Navbar/navbar'; // Importing the Navbar component
import AnimatedCard from '../components/AnimatedCard/AnimatedCard'; // Importing the AnimatedCard component
import FloatingElements from '../components/FloatingElements/FloatingElements'; // Importing FloatingElements for background effects
import { ArrowRight, Play, Star } from 'lucide-react'; // Importing icons from Lucide
import ImageSlider from '../components/Slider/slider'; // Importing the ImageSlider component
import Image from 'next/image'; // Importing Next.js Image component for optimized images
import styles from './page.module.css'; // Importing CSS module for styling
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';

// Main functional component for the home page
export default function HomePage() {

  // State to keep track of the current testimonial index
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Array of testimonials with user details and messages
  const testimonials = [
    { name: "D Khodakhah", role: "Medical Student", text: "The A level Chemistry deck was amazing as it covered the entire specification", rating: 5 },
    { name: "L Marshall", role: "Economics Student", text: "The Flashcard AI tool helped me save so much time making flashcards for Japanese", rating: 5 },
    { name: "A Thilak", role: "Computer Science student", text: "Good value for money. Absolute gamechanger. Would 100% recommend.", rating: 4 }
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

  return (
    <>
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

                  <div className="flex flex-col sm:flex-row gap-4"> {/* Flex container for buttons */}

                    
                    <Link
                      href="/products"
                      className="group bg-gradient-to-r from-blue-500 to-blue-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    >
                      Browse Products
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
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
              <div className={styles.imagecontainer}>
                <Image
                  src="/images/FlashcardVaultLogo.png"
                  width={450}
                  height={300}
                  alt="Logo"
                  className="rounded-2xl shadow-lg object-cover"
                />
              <div className={styles.imagecontainertext}>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Helping you ace your exams one card at a time
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-rose-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Create your own flashcards with our  
              <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent"> Flashcard AI</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Just upload your PDF and let the AI do the rest! Transform any document into powerful, 
              personalized flashcards.
            </p>
            
            <div className="mt-8 flex justify-center">
              <Link 
                href="/aigenerator"
                className="group bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center">
                Try Flashcard Maker AI
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-700">Save Time</h3>
              <p className="text-gray-500 mt-2">Generate flashcards instantly from textbooks, lecture slides, or notes.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-700">Study Smarter</h3>
              <p className="text-gray-500 mt-2">Our AI extracts key concepts and summaries, so you focus only on what matters.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-700">Active Recall Optimised</h3>
              <p className="text-gray-500 mt-2">Enhance your memory retention through active recall and spaced repetition</p>
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

        <section className="py-10 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Ready to Ace Your Exams?
              </h2>
              <p className="text-xl text-gray-600">
                Join thousands of successful learners today!
                
              </p>
              <br></br>
              <div className={styles.signupbutton}>
                <button className="w-full sm:w-auto bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold">
                  Sign Up Now
                </button>
              </div>
            </div>
          </div>
        </section>



      </div>
    </>
  );
}