import { useEffect, useState } from "react";

function EditTravelForm({ plan, onUpdate, onCancel }) {

  const [formData, setFormData] = useState({
    tripName: "",
    destination: "",
    placesToVisit: "",
    startDate: "",
    endDate: "",
    estimatedBudget: "",
    notes: ""
  });

  useEffect(() => {
    if (plan) {
      setFormData({
        tripName: plan.tripName,
        destination: plan.destination,
        placesToVisit: plan.placesToVisit.join(", "),
        startDate: plan.startDate,
        endDate: plan.endDate,
        estimatedBudget: plan.estimatedBudget,
        notes: plan.notes
      });
    }
  }, [plan]);

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

  const updatedPlan = {

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
      `http://localhost:5000/api/travel-plans/${plan.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPlan)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to update travel plan"
      );
    }

    onUpdate(data.travelPlan);

  } catch (error) {

    console.error("Error:", error);
    alert("Failed to update travel plan");

  }

};

  return (
    <div className="edit-container">

      <form
        className="travel-form"
        onSubmit={handleSubmit}
      >

        <h2>Edit Travel Plan</h2>

        <div className="form-group">
          <label>Trip Name</label>

          <input
            type="text"
            name="tripName"
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
            value={formData.placesToVisit}
            onChange={handleChange}
            
          />
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
            value={formData.estimatedBudget}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Notes</label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <div className="edit-buttons">

          <button
            type="submit"
            className="add-btn"
          >
            Save Changes
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditTravelForm;