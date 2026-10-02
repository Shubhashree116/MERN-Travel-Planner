function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        ✈️ Travel Planner
      </div>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#plans">My Trips</a>
        <a href="#add-trip">Add Trip</a>
      </div>
    </nav>
  );
}

export default Navbar;