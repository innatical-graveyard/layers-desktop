import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

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
  "The Zucc can't succ this.",
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
    <div className="p-20">
      <div>
        <h1 className="text-5xl font-bold">Isometric</h1>
        <h2 className="text-3xl text-inndigo mb-2">{tagline}</h2>
        <Link href="/authentication/register">
          <a className="text-xl">
            Join us <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </Link>
      </div>
      <div className="absolute">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#1e6feb"
            fill-opacity="1"
            d="M0,96L48,85.3C96,75,192,53,288,64C384,75,480,117,576,154.7C672,192,768,224,864,213.3C960,203,1056,149,1152,138.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Home;
