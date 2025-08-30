import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Flashcard Vault: Helping you ace your exams one card at a time",
  keywords: [
    "alevels",
    "a levels",
    "a-levels",
    "alevel",
    "alevels flashcards",
    "alevel flashcards",
    "a-level flashcards",
    "a level flashcards",
    "alevels revision",
    "alevel revision",
    "a-level revision",
    "a level revision",
    "flashcards",
    "study",
    "education",
    "learning",
    "exams",
    "revision",
    "memory",
    "test preparation",
    "a-level",
    "chemistry",
    "biology",
    "physics",
    "maths",
    "alevel chemistry",
    "alevel biology",
    "alevel physics",
    "alevel maths",
    "a-level chemistry",
    "a-level biology",
    "a-level physics",
    "a-level maths",
    "a level chemistry",
    "a level biology",
    "a level physics",
    "a level maths",
    "flashcard creator",
    "flashcard maker",
    "flashcard app",
    "flashcard vault",
    "flashcard generator",
    "study app",
    "study tool",
    "study resource",
    "revision app",
    "revision tool",
    "revision resource",
    "exam preparation",
    "exam study",
    "exam revision",
    "exam flashcards",
    "study techniques",
    "study tips",
    "study hacks",
    "study strategies",
    "study skills",
    "active recall",
    "spaced repetition",
    "memory techniques",
    "learning techniques",
    "learning strategies",
    "learning tips",
    "learning hacks",
    "learning skills",
    "educational tools",
    "educational resources",
    "student resources",
    "student tools",
    "student study",
    "student revision",
    "student flashcards",
    "student learning",
    "student education",
    "student success",
    "student achievement",
    "student performance",
    "student study techniques",
    "student study tips",
    "student study hacks",
    "student study strategies",
    "student study skills",
    "student learning techniques",
    "student learning strategies",
    "student learning tips",
    "student learning hacks",
    "student learning skills",
  ],
  description:
    "Flashcard Vault is your ultimate study companion, designed to help you ace your exams one card at a time with personalized flashcards. Create, customize, and master your subjects with ease.",
  authors: [
    {
      name: "Flashcard Vault Team",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />

        {children}
        <Footer />
      </body>
    </html>
  );
}
