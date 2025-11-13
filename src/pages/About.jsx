
import React from "react";
// import teamImg from "../../assets/team.jpg"; // replace with your real image

import { HandshakeIcon, LightbulbIcon, Rocket, User2 } from "lucide-react";

const About = () => {
  return (
    <div className="w-full  ">
      
      <div className="py-20 px-5 md:px-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-600 dark:text-indigo-400 animate-fadeIn">
          About Our Freelance Marketplace
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300 animate-fadeIn delay-200">
          Connecting skilled freelancers with amazing opportunities worldwide. Our
          platform empowers both clients and freelancers to collaborate, grow, and
          succeed.
        </p>
      </div>
      <div className="py-16 px-5 md:px-20 bg-indigo-50 dark:bg-indigo-900 rounded-lg my-10 mx-5 md:mx-20 shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-700 dark:text-indigo-300 animate-fadeIn">
          Our Mission
        </h2>
        <p className="text-center text-gray-700 dark:text-gray-200 max-w-3xl mx-auto animate-fadeIn delay-200">
          To make freelancing simpler, transparent, and more rewarding. We aim to
          bridge the gap between talent and opportunity, creating a vibrant community
          where everyone thrives.
        </p>
      </div>
      <div className="py-16 px-5 md:px-20 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {[
          { icon: <User2 className="text-4xl text-indigo-600" />, title: "Global Talent", desc: "Access freelancers from every corner of the world." },
          { icon: <Rocket className="text-4xl text-indigo-600" />, title: "Fast & Reliable", desc: "Quick project posting and efficient matching." },
          { icon: <HandshakeIcon className="text-4xl text-indigo-600" />, title: "Secure Payments", desc: "Safe transactions with milestone-based payments." },
          { icon: <LightbulbIcon className="text-4xl text-indigo-600" />, title: "Innovative Projects", desc: "Work on cutting-edge ideas and tech." },
        ].map((feature, index) => (
          <div
            key={index}
            className=" p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform duration-300 animate-fadeIn"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="py-16 px-5 md:px-20 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 animate-fadeIn">
          <img
            src='https://cdn2.stylecraze.com/wp-content/uploads/2018/07/a-women-in-semi-format-attire.jpg.webp'
            alt="Team"
            className="rounded-xl shadow-xl w-full object-cover"
          />
        </div>
        <div className="md:w-1/2 animate-fadeIn delay-200">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300">
            Meet Our Team
          </h2>
          <p className="mb-4">
            Our dedicated team of developers, designers, and strategists work
            tirelessly to make freelancing seamless and enjoyable. Passion drives
            our innovation, and collaboration drives our success.
          </p>
          <p>
            We value transparency, quality, and community above all, building a
            platform where everyone can thrive.
          </p>
        </div>
      </div>

      <div className="py-16 px-5 md:px-20 text-center bg-indigo-600 dark:bg-indigo-700 text-white rounded-lg my-10 mx-5 md:mx-20 animate-fadeIn">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Join the Community?
        </h2>
        <p className="mb-6 text-lg md:text-xl">
          Whether you are a client or freelancer, start your journey with us today!
        </p>
        <button className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default About;
