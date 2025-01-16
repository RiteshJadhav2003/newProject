import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router";

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/current-user", {
          method: "GET",
          credentials: "include", // Ensure credentials are included
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Not logged in or error fetching user data");
        }

        const user = await response.json();
        console.log("Fetched user:", user);
        setCurrentUser(user);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching current user:", error);
       
        }
      }
    };

    fetchUser();
    return () => controller.abort();
  }, [Navigate]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50">
        <Navbar />
        <div>
          <button onClick={() => Navigate("/")}>Home</button>/User
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
          {currentUser === null ? (
            <p>Loading user data...</p>
          ) : currentUser ? (
            <h3 className="text-xl mb-4">Welcome, {currentUser.name}</h3>
          ) : (
            <p className="text-red-500">Failed to load user data. Please try again.</p>
          )}
          <div className="grid grid-cols-4 gap-6">
            {[{ title: "Generated", description: "ID CARD", color: "teal" },
              { title: "Generated", description: "Appointment Letter", color: "purple" },
              { title: "Paid", description: "Membership Payment", color: "orange" },
              { title: "Active", description: "Membership Status", color: "blue" }]
              .map((card, index) => (
                <div
                  key={index}
                  className={`bg-${card.color}-500 rounded-lg shadow-lg p-6 text-white hover:scale-105 transition-transform`}
                >
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p>{card.description}</p>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
