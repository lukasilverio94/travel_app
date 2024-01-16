// LocationsPage.jsx
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Hero from "../components/LocationComponents/Hero";
import LocationsContainer from "../components/LocationComponents/LocationsContainer";
// import LocationsContainer from "..components/LocationsContainer";
// locationsData.js
export const locationsData = [
  {
    title: "Ecuador",
    description:
      "Ecuador, nestled in the heart of South America, is a country of unparalleled beauty, diverse landscapes, and rich cultural heritage. From the Amazon Rainforest to the Andes Mountains and the pristine Galápagos Islands, Ecuador offers a unique and immersive travel experience for adventurers.",
    markerIcon: "Antisana",
    imageSrc:
      "https://images.unsplash.com/photo-1612277364679-a14c63e8b6c7?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Antisana at Ecuador",
  },
  {
    title: "Georgia",
    description:
      "Georgia, nestled at the crossroads of Europe and Asia, boasts a rich history, diverse landscapes, and warm hospitality. From the breathtaking Caucasus Mountains to the charming cobblestone streets of Tbilisi, Georgia offers a captivating journey for travelers seeking cultural richness and natural beauty.",
    markerIcon: "Trinity Gergeti Church",
    imageSrc:
      "https://images.unsplash.com/photo-1563284223-333497472e88?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Trinity Gergeti Church in Georgia",
  },
  {
    title: "Chile",
    description:
      "Chile, a land of contrasts stretching along the western edge of South America, invites travelers to explore its diverse landscapes. From the arid Atacama Desert to the snow-capped peaks of the Andes and the picturesque coastal cities, Chile offers a tapestry of natural wonders and cultural richness.",
    markerIcon: "Torres del Paine National Park",
    imageSrc:
      "https://images.unsplash.com/photo-1478827387698-1527781a4887?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Torres del Paine National Park in Chile",
  },
  {
    title: "Estonia",
    description:
      "Estonia, nestled in the Baltic region of Northern Europe, is a country known for its rich history, vibrant culture, and forward-thinking approach. From medieval architecture in Tallinn to the pristine nature of Lahemaa National Park, Estonia offers a blend of old-world charm and modern innovation.",
    markerIcon: "Tallinn - Old Town Beauty",
    imageSrc:
      "https://images.unsplash.com/photo-1585906725330-0444121fecad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Tallinn - Old Town Beauty in Estonia",
  },
  {
    title: "Croatia",
    description:
      "Plitvice Lakes National Park is a breathtaking natural wonder in Croatia, known for its cascading waterfalls, crystal-clear lakes, and lush greenery. Explore wooden pathways that wind through the park, allowing you to witness the beauty of interconnected lakes and vibrant flora and fauna.",
    markerIcon: "Plitvice Lakes - Natural Paradise",
    imageSrc:
      "https://images.unsplash.com/photo-1570135430888-b195b8c21622?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Plitvice Lakes - Natural Paradise in Croatia",
  },
  {
    title: "Vietnam",
    description:
      "Hoi An, a charming town on Vietnam's central coast, is known for its well-preserved ancient architecture, vibrant lantern-lit streets, and a rich cultural heritage. Explore the historic district, enjoy local cuisine, and experience the magical atmosphere that makes Hoi An a must-visit destination in Asia.",
    markerIcon: "Hội An, Quang Nam Province",
    imageSrc:
      "https://images.unsplash.com/photo-1590119329604-0c0caab2a4e6?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Lanterns in Hoi An, Vietnam",
  },
];

export default function LocationsPage() {
  return (
    <div className="mt-16 pb-16 min-h-screen dark:bg-gray-950 dark:text-slate-100">
      {/* Images top hero */}
      <Hero />
      {/* Right Side */}
      <div className="flex flex-col h-full justify-center mx-4">
        <h3 className="text-5xl md:text-6xl font-bold mt-6 mb-3 px-3 dark:text-slate-200">
          Ideas for Your Next Trip
        </h3>

        {/* places container */}
        <LocationsContainer locations={locationsData} />
      </div>
    </div>
  );
}
