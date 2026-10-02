function TravelCard({ plan, onDelete, onEdit }) {
  return (
    <div className="travel-card">

      <div className="card-header">
        <h3>{plan.tripName}</h3>
        <span>{plan.destination}</span>
      </div>

      <div className="card-content">

        <p>
          📍 <strong>Destination:</strong>{" "}
          {plan.destination}
        </p>

        <p>
          📅 <strong>Dates:</strong>{" "}
          {plan.startDate} → {plan.endDate}
        </p>

        <p>
          💰 <strong>Budget:</strong>{" "}
          ₹{plan.estimatedBudget}
        </p>

        <p>
          📌 <strong>Places to Visit:</strong>
        </p>

        <ul>
          {plan.placesToVisit.map((place, index) => (
            <li key={index}>{place}</li>
          ))}
        </ul>

        {plan.notes && (
          <p>
            📝 <strong>Notes:</strong>{" "}
            {plan.notes}
          </p>
        )}

      </div>

      <div className="card-buttons">

        <button
          type="button"
          className="edit-btn"
          onClick={(event) => {
            event.preventDefault();
            onEdit(plan);
          }}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(plan.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TravelCard;