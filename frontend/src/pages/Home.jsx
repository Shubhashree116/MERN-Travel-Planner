import TravelCard from "../components/TravelCard";

function Home({
  travelPlans,
  onDelete,
  onEdit
}) {

  return (

    <section
      className="plans-section"
      id="plans"
    >

      <div className="section-heading">

        <h2>My Travel Plans</h2>

        <p>
          Manage all your upcoming trips in one place.
        </p>

      </div>

      {travelPlans.length === 0 ? (

        <div className="empty-message">

          <h3>No travel plans yet</h3>

          <p>
            Start planning your next adventure!
          </p>

        </div>

      ) : (

        <div className="plans-container">

          {travelPlans.map((plan) => (

            <TravelCard
              key={plan.id}
              plan={plan}
              onDelete={onDelete}
              onEdit={onEdit}
            />

          ))}

        </div>

      )}

    </section>

  );
}

export default Home;