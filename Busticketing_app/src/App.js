import { useMemo, useState } from 'react';
import { routes, activityFeed, demandInsights, passengers } from './data/dashboardData';
import './styles/App.css';
import './styles/layout.css';
import './styles/components.css';

const sections = [
  { id: 'overview', label: 'Operations Overview' },
  { id: 'booking', label: 'Booking Workspace' },
  { id: 'fleet', label: 'Fleet Monitor' },
  { id: 'support', label: 'Customer Support' }
];

const topLinks = ['Routes', 'Fleet', 'Promotions', 'Support', 'Analytics'];

const seatTemplate = [
  { id: 'A1', status: 'selected' },
  { id: 'A2', status: 'available' },
  { id: 'A3', status: 'occupied' },
  { id: 'A4', status: 'available' },
  { id: 'B1', status: 'available' },
  { id: 'B2', status: 'occupied' },
  { id: 'B3', status: 'selected' },
  { id: 'B4', status: 'available' },
  { id: 'C1', status: 'available' },
  { id: 'C2', status: 'available' },
  { id: 'C3', status: 'occupied' },
  { id: 'C4', status: 'available' }
];

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedRouteId, setSelectedRouteId] = useState(routes[0].id);

  const selectedRoute = useMemo(
    () => routes.find((route) => route.id === selectedRouteId) ?? routes[0],
    [selectedRouteId]
  );

  const stats = useMemo(
    () => [
      {
        label: 'Active bookings',
        value: '1,284',
        detail: 'Up 14% vs last evening'
      },
      {
        label: 'Buses in service',
        value: '86',
        detail: '7 vehicles close to depot'
      },
      {
        label: 'On-time departures',
        value: '94%',
        detail: 'Operational target: 92%'
      },
      {
        label: 'Support resolution',
        value: '8 min',
        detail: 'Average first response time'
      }
    ],
    []
  );

  return (
    <div className="app-shell">
      <header className="utility-bar">
        <div>
          <span className="eyebrow">Live application interface</span>
          <h1>TransitFlow Control Center</h1>
        </div>
        <div className="utility-meta">
          <span>Region: Central Hub</span>
          <span>Updated 2 minutes ago</span>
          <button type="button" className="ghost-button">
            Export manifests
          </button>
        </div>
      </header>

      <nav className="top-nav" aria-label="Primary navigation">
        <div className="brand-lockup">
          <div className="brand-icon">TF</div>
          <div>
            <strong>Operations Console</strong>
            <p>Ticketing, dispatch, and support in one workspace</p>
          </div>
        </div>
        <div className="top-nav-links">
          {topLinks.map((link) => (
            <button key={link} type="button" className="top-link">
              {link}
            </button>
          ))}
        </div>
      </nav>

      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-card">
            <span className="eyebrow">Navigation bars</span>
            <h2>Functional Areas</h2>
            <p>Each section is clearly identified so the interface reads like a live application.</p>
          </div>

          <div className="sidebar-menu" role="tablist" aria-label="Section navigation">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`sidebar-link ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span>{section.label}</span>
                <small>{section.id === activeSection ? 'Open now' : 'View panel'}</small>
              </button>
            ))}
          </div>

          <div className="sidebar-card status-card">
            <span className="status-dot" />
            <div>
              <strong>System health stable</strong>
              <p>Payments, schedules, and alerts are all synchronized.</p>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <section className="hero-panel">
            <div className="hero-copy">
              <span className="eyebrow">Front-end showcase</span>
              <h2>Real-time trip management with clear booking and operations flows</h2>
              <p>
                This React layout combines dashboard analytics, booking interactions, seat selection,
                fleet visibility, and support actions in a single modern interface.
              </p>
            </div>
            <div className="hero-actions">
              <button type="button" className="primary-button">
                Launch booking
              </button>
              <button type="button" className="secondary-button">
                Review schedules
              </button>
            </div>
          </section>

          <section className="stats-grid" aria-label="Application metrics">
            {stats.map((stat) => (
              <article key={stat.label} className="stat-card">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <p>{stat.detail}</p>
              </article>
            ))}
          </section>

          <section className="content-grid">
            <article className="panel panel-large">
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">Booking functionality</span>
                  <h3>Trip Search and Route Selection</h3>
                </div>
                <button type="button" className="ghost-button">
                  View all schedules
                </button>
              </div>

              <div className="search-banner">
                <div>
                  <label>From</label>
                  <strong>Dallas Central</strong>
                </div>
                <div>
                  <label>To</label>
                  <strong>Austin Downtown</strong>
                </div>
                <div>
                  <label>Date</label>
                  <strong>08 Apr 2026</strong>
                </div>
                <div>
                  <label>Passengers</label>
                  <strong>2 Adults</strong>
                </div>
              </div>

              <div className="route-list">
                {routes.map((route) => (
                  <button
                    key={route.id}
                    type="button"
                    className={`route-card ${route.id === selectedRouteId ? 'selected' : ''}`}
                    onClick={() => setSelectedRouteId(route.id)}
                  >
                    <div>
                      <h4>{route.name}</h4>
                      <p>{route.departure} to {route.arrival}</p>
                    </div>
                    <div className="route-meta">
                      <span>{route.duration}</span>
                      <strong>{route.price}</strong>
                    </div>
                  </button>
                ))}
              </div>
            </article>

            <article className="panel">
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">Seat functionality</span>
                  <h3>Seat Selection</h3>
                </div>
                <span className="pill">{selectedRoute.coachType}</span>
              </div>

              <div className="seat-legend">
                <span><i className="seat available" /> Available</span>
                <span><i className="seat selected" /> Selected</span>
                <span><i className="seat occupied" /> Occupied</span>
              </div>

              <div className="seat-map">
                {seatTemplate.map((seat) => (
                  <div key={seat.id} className={`seat ${seat.status}`}>
                    {seat.id}
                  </div>
                ))}
              </div>

              <div className="selection-summary">
                <p>Selected seats: A1, B3</p>
                <strong>Total fare: {selectedRoute.price}</strong>
              </div>
            </article>

            <article className="panel">
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">Live activity</span>
                  <h3>Operations Feed</h3>
                </div>
              </div>

              <div className="feed-list">
                {activityFeed.map((item) => (
                  <div key={item.id} className="feed-item">
                    <div className={`feed-indicator ${item.tone}`} />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.detail}</p>
                    </div>
                    <span>{item.time}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel panel-wide">
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">Passenger functionality</span>
                  <h3>Passenger and Service Requests</h3>
                </div>
                <button type="button" className="ghost-button">
                  Open CRM tools
                </button>
              </div>

              <div className="table-list">
                {passengers.map((passenger) => (
                  <div key={passenger.id} className="table-row">
                    <div>
                      <strong>{passenger.name}</strong>
                      <p>{passenger.route}</p>
                    </div>
                    <span>{passenger.seat}</span>
                    <span>{passenger.status}</span>
                    <span>{passenger.request}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel">
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">Demand functionality</span>
                  <h3>Demand Insights</h3>
                </div>
              </div>

              <div className="insight-list">
                {demandInsights.map((insight) => (
                  <div key={insight.city} className="insight-card">
                    <strong>{insight.city}</strong>
                    <p>{insight.message}</p>
                    <span>{insight.load}</span>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
