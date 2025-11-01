import React, { useContext } from "react";
import Modals from "../Modal/Modals";
import UserProfile from "../UserProfile/UserProfile";
import { API_PATHS } from "../Utility/apiPath";
import { BASE_URL } from "../Utility/apiPath";
import { UserContext } from "../Context/UserProvider";
import Navbar from "../Layouts/Navbar";
import { motion } from "framer-motion";
import { Brain, BookOpen, Star } from "lucide-react";
import Card from "../assets/card.png";
import QuestionList from "../assets/questionList.png";
import LearnMore from "../assets/learnMore.png";
import toast from "react-hot-toast";
import { FaInfoCircle } from "react-icons/fa";

function Landing() {
  // const { setIsLogin } = useContext(UserContext);

  function handleToast(){
    toast("Please Login or Singup",{
      icon: <FaInfoCircle color="blue" size={20} />,
    });

  }

  return (
    <div className="bg-white text-gray-800 scroll-smooth">
      <Navbar />

      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Master Your{" "}
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
              Interviews
            </span>{" "}
            with AI Assistance
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-600">
            Get AI-tailored interview questions, detailed answers, and learning
            resources. Mark important ones and prepare smarter — not harder.
          </p>
          <div>
            <button className="bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 transition shadow-md hover:shadow-xl"
            onClick={handleToast}
            >
              Get Started Free
            </button>
          </div>
        </motion.div>

        <motion.img
          src={Card}
          alt="AI Interview"
          className="w-full md:w-[45%] mt-12 md:mt-0 drop-shadow-xl"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        />
      </section>

      <section id="features" className="px-6 md:px-20 py-24 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Why Choose <span className="text-blue-600">AI Interview Prep?</span>
        </h2>
        <div className="grid gap-10 md:grid-cols-3 text-center">
          {[
            {
              icon: <Brain className="w-12 h-12 text-blue-500 mx-auto mb-4" />,
              title: "AI-Generated Questions",
              desc: "Get questions designed for your role, experience, and focus areas.",
            },
            {
              icon: (
                <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              ),
              title: "Smart Answers & Resources",
              desc: "Every question comes with detailed answers and extra learning links.",
            },
            {
              icon: <Star className="w-12 h-12 text-blue-500 mx-auto mb-4" />,
              title: "Mark & Revise",
              desc: "Save important questions to revisit and strengthen your prep.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition"
            >
              {f.icon}
              <h3 className="font-semibold text-xl mb-3 text-blue-600">
                {f.title}
              </h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="how" className="px-6 md:px-20 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          How It <span className="text-blue-600">Works</span>
        </h2>
        <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-3 text-center">
          {[
            {
              step: "1",
              text: "Enter your role, experience, and topics you want to focus on.",
            },
            {
              step: "2",
              text: "AI generates curated interview questions with answers & resources.",
            },
            {
              step: "3",
              text: "Mark important questions and track your preparation with ease.",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="p-8 bg-white rounded-xl shadow-md border-1 border-gray-200"
            >
              <span className="text-blue-500 text-5xl font-bold">{s.step}</span>
              <p className="mt-6 text-gray-600 text-lg">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-20 py-24 bg-gray-50 flex flex-col md:flex-row items-center gap-12">
        <motion.img
          src={QuestionList}
          alt="Interview Card"
          className="w-full md:w-1/2 rounded-2xl shadow-xl"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        />
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Create Your <span className="text-blue-600">Interview Cards</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Generate personalized interview cards with role-specific questions.
            Organize them by difficulty, topic, and priority for an efficient prep strategy.
          </p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 transition cursor-pointer"
          onClick={handleToast}
          >
            Try Card Builder
          </button>
        </motion.div>
      </section>

      <section className="px-6 md:px-20 py-24 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Practice with <span className="text-blue-600">Q&A Mode</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Explore curated questions with detailed AI-generated answers. 
            Get explanations, insights, and references to improve your understanding and confidence.
          </p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 transition cursor-pointer"
          onClick={handleToast}
          >
            Start Practicing
          </button>
        </motion.div>
        <motion.img
          src={LearnMore}
          alt="Q&A Section"
          className="w-full md:w-1/2 rounded-2xl shadow-xl"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        />
      </section>

      <section
        id="cta"
        className="px-6 md:px-20 py-28 bg-gradient-to-r from-blue-500 to-blue-700 text-center text-white"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-8">
          Ready to Transform Your Interview Prep?
        </h2>
        <p className="text-lg md:text-xl mb-10 opacity-90">
          Join thousands of candidates using AI to ace their interviews. Your
          dream job is just one step away.
        </p>
        <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-2xl cursor-pointer"
        onClick={handleToast}
        >
          Get Started Free
        </button>
      </section>

      <footer className="px-6 md:px-20 py-6 text-center text-white bg-blue-500 mt-10 shadow-md">
        © {new Date().getFullYear()} AI Interview Prep. All rights reserved.
      </footer>

      <></>
    </div>
  );
}

export default Landing;
