import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import Tilt from "react-parallax-tilt";

const taglines = [
  "Because privacy matters.",
  "Because speech means something.",
  "Because Octii kinda sucked.",
  "Because communication is human.",
  "Because encryption isn't just a buzzword.",
  "Because it's time to ditch Discord and Guilded.",
  "Only an integration away from greatness.",
  "Only missing one thing, you.",
  "Zoom can't touch us.",
  "The Zucc can't succ this (data).",
  "Privacy's last stand.",
  "Not selling out to shitcoins.",
  "Back to the future of chat.",
  "A guarantee built on code.",
  "Privacy through encryption.",
];

const Home = () => {
  const [tagline] = useState(
    taglines[Math.floor(Math.random() * taglines.length)]
  );

  return (
    <div className="h-screen flex flex-col relative">
      <div className="p-20 flex">
        <div>
          <h1 className="text-5xl font-bold">Isometric</h1>
          <h2 className="text-3xl text-inndigo mb-2">{tagline}</h2>
          <Link href="/authentication/register">
            <a className="text-xl flex">
              Join us <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </Link>
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-72 mt-10 ml-32"
          >
            <path
              fill="#1E6FEB"
              d="M55.5,-40.5C69.9,-26.1,78.3,-3.2,75,19.4C71.7,42,56.6,64.2,37.3,70.9C18,77.7,-5.5,69,-23.3,57.1C-41.1,45.2,-53,30,-61.1,9.7C-69.2,-10.7,-73.3,-36.2,-62.4,-49.8C-51.6,-63.4,-25.8,-65,-2.6,-62.9C20.5,-60.8,41,-54.9,55.5,-40.5Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        <div className="flex-1">
          <div className="ml-auto" style={{ width: "32rem" }}>
            <Tilt>
              <img src="preview.png" className="h-auto" />
            </Tilt>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#1e6feb"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Home;
