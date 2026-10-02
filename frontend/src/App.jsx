import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import TravelForm from "./components/TravelForm";
import EditTravelForm from "./components/EditTravelForm";
import Home from "./pages/Home";

import "./App.css";

function App() {

  const [currentImage, setCurrentImage] = useState(0);

  const travelImages = [
    "/images/travel1.jpg",
    "/images/travel2.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((previous) =>
        previous === 0 ? 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const [travelPlans, setTravelPlans] = useState([]);

  const [editingPlan, setEditingPlan] =
    useState(null);
    useEffect(() => {
  const fetchTravelPlans = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/travel-plans"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch travel plans"
        );
      }

      setTravelPlans(data);

    } catch (error) {
      console.error("Error:", error);
      alert("Failed to load travel plans");
    }
  };

  fetchTravelPlans();
}, []);

  // Add plan
  const handleAddPlan = (newPlan) => {

    setTravelPlans((previousPlans) => [
      newPlan,
      ...previousPlans
    ]);

  };

  // Delete plan
  const handleDelete = async (id) => {

  const confirmDelete =
    window.confirm(
      "Are you sure you want to delete this trip?"
    );

  if (!confirmDelete) {
    return;
  }

  try {

    const response = await fetch(
      `http://localhost:5000/api/travel-plans/${id}`,
      {
        method: "DELETE"
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to delete travel plan"
      );
    }

    setTravelPlans((previousPlans) =>
      previousPlans.filter(
        (plan) => plan.id !== id
      )
    );

  } catch (error) {

    console.error("Error:", error);

    alert("Failed to delete travel plan");

  }

};

  // Start editing
 const handleEdit = (plan) => {
  setEditingPlan(plan);

  setTimeout(() => {
    document
      .getElementById("add-trip")
      ?.scrollIntoView({
        behavior: "smooth"
      });
  }, 100);
};

  // Update plan
  const handleUpdate = (updatedPlan) => {

    setTravelPlans((previousPlans) =>
      previousPlans.map((plan) =>
        plan.id === updatedPlan.id
          ? updatedPlan
          : plan
      )
    );

    setEditingPlan(null);

  };

  return (

    <div className="app">

      <Navbar />

      <header
        className="hero"
        id="home"
      >

        <div
          className="hero-background"
          style={{
            backgroundImage: `url(${travelImages[0]})`,
            opacity: currentImage === 0 ? 1 : 0
          }}
        ></div>

        <div
          className="hero-background"
          style={{
            backgroundImage: `url(${travelImages[1]})`,
            opacity: currentImage === 1 ? 1 : 0
          }}
        ></div>

        <div className="hero-content">

          <p className="hero-tag">
            ✈️ PLAN • EXPLORE • TRAVEL
          </p>

          <h1>
            Plan Your Next
            <span> Adventure</span>
          </h1>

          <p>
            Organize your destinations, dates,
            places to visit and budget
            all in one place.
          </p>

          <a
            href="#add-trip"
            className="hero-btn"
          >
            Start Planning
          </a>

        </div>

      </header>

      <main>

        <section
          className="form-section"
          id="add-trip"
        >

          {editingPlan ? (

            <EditTravelForm
              plan={editingPlan}
              onUpdate={handleUpdate}
              onCancel={() =>
                setEditingPlan(null)
              }
            />

          ) : (

            <TravelForm
              onAddPlan={handleAddPlan}
            />

          )}

        </section>

        <Home
          travelPlans={travelPlans}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

      </main>

      <footer>

        <p>
          © 2026 Travel Planner
        </p>

      </footer>

    </div>

  );
}

export default App;