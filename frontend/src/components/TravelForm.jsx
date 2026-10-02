import { useState } from "react";

function TravelForm({ onAddPlan }) {

  const [formData, setFormData] = useState({
    tripName: "",
    destination: "",
    placesToVisit: "",
    startDate: "",
    endDate: "",
    estimatedBudget: "",
    notes: ""
  });

  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  };

  const handleSubmit = async (event) => {

  event.preventDefault();

  // Validation 1: Trip name
  if (formData.tripName.trim() === "") {
    alert("Please enter a valid trip name.");
    return;
  }

  // Validation 2: Destination
  if (formData.destination.trim() === "") {
    alert("Please enter a valid destination.");
    return;
  }

  // Convert places into an array
  const placesToVisit = formData.placesToVisit
    .split(",")
    .map((place) => place.trim())
    .filter((place) => place !== "");

  // Validation 3: Places to visit
  if (placesToVisit.length === 0) {
    alert("Please enter at least one place to visit.");
    return;
  }

  // Validation 4: Date
  if (formData.endDate < formData.startDate) {
    alert("End date cannot be before start date.");
    return;
  }

  // Validation 5: Budget
  if (Number(formData.estimatedBudget) < 0) {
    alert("Budget cannot be negative.");
    return;
  }

  const newPlan = {

    tripName: formData.tripName.trim(),

    destination: formData.destination.trim(),

    placesToVisit: placesToVisit,

    startDate: formData.startDate,

    endDate: formData.endDate,

    estimatedBudget:
      Number(formData.estimatedBudget),

    notes: formData.notes.trim()
  };

  try {

    const response = await fetch(
      "http://localhost:5000/api/travel-plans",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newPlan)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to add travel plan"
      );
    }

    onAddPlan(data.travelPlan);

    // Clear form after successful submission
    setFormData({
      tripName: "",
      destination: "",
      placesToVisit: "",
      startDate: "",
      endDate: "",
      estimatedBudget: "",
      notes: ""
    });

  } catch (error) {

    console.error("Error:", error);
    alert("Failed to add travel plan");

  }

};

  return (

    <form
      className="travel-form"
      onSubmit={handleSubmit}
    >

      <h2>Plan Your Trip</h2>

      <div className="form-group">

        <label>Trip Name</label>

        <input
          type="text"
          name="tripName"
          placeholder="Example: Goa Trip"
          value={formData.tripName}
          onChange={handleChange}
          required
        />

      </div>

      <div className="form-group">

        <label>Destination</label>

        <input
          type="text"
          name="destination"
          placeholder="Example: Goa"
          value={formData.destination}
          onChange={handleChange}
          required
        />

      </div>

      <div className="form-group">

        <label>Places to Visit</label>

        <input
          type="text"
          name="placesToVisit"
          placeholder="Baga Beach, Fort Aguada, Calangute"
          value={formData.placesToVisit}
          onChange={handleChange}
          
        />

        <small>
          Separate multiple places using commas.
        </small>

      </div>

      <div className="date-row">

        <div className="form-group">

          <label>Start Date</label>

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />

        </div>

        <div className="form-group">

          <label>End Date</label>

          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />

        </div>

      </div>

      <div className="form-group">

        <label>Estimated Budget</label>

        <input
          type="number"
          name="estimatedBudget"
          placeholder="Example: 15000"
          value={formData.estimatedBudget}
          onChange={handleChange}
          required
        />

      </div>

      <div className="form-group">

        <label>Notes</label>

        <textarea
          name="notes"
          placeholder="Add some notes about your trip..."
          value={formData.notes}
          onChange={handleChange}
        />

      </div>

      <button
        type="submit"
        className="add-btn"
      >
        + Add Travel Plan
      </button>

    </form>

  );
}

export default TravelForm;