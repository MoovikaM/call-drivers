import { useEffect } from "react";
import { site } from "./config";
import { telHref, whatsappHref, defaultWhatsAppText } from "./contact";
import BookingForm from "./components/BookingForm";
import { Footer, Header, MobileBar, SampleBanner, WhatsAppFab } from "./components/Chrome";
import { ChatIcon, PhoneIcon } from "./components/Icons";

const SERVICES = [
  {
    title: "Local / hourly",
    text: "Meetings, errands, and a few hours in the city. The driver stays with your car.",
  },
  {
    title: "Airport pickup and drop",
    text: "Early flights and late landings. Share the terminal and we time the pickup.",
  },
  {
    title: "Outstation",
    text: "One-way or round trip out of the city. Contact us for pricing before the driver starts.",
  },
  {
    title: "Wedding and events",
    text: "Family cars and guest drops through the function, including late hours.",
  },
  {
    title: "Night duty",
    text: "After-midnight drops and early-morning pickups. Contact us for pricing before you confirm.",
  },
  {
    title: "Corporate",
    text: "Office commutes and client visits. Book Hourly and mention the company in notes.",
  },
];

const STEPS = [
  {
    title: "Share the trip",
    text: "Call, WhatsApp, or the form. Send pickup, time, and trip type.",
  },
  {
    title: "Driver arrives",
    text: "A briefed driver reaches your pickup in the time window you agreed.",
  },
  {
    title: "You travel in your car",
    text: "Sit in your own car. The driver handles the road.",
  },
];

const FAQS = [
  {
    q: "Can I cancel?",
    a: "Call or WhatsApp if your plans change. We confirm any cancellation terms before you book.",
  },
  {
    q: "Is there a night charge?",
    a: "Night trips are available. Contact us for pricing details before you confirm.",
  },
  {
    q: "How do outstation trips work?",
    a: "Outstation covers one-way and round trips out of the city. Contact us for pricing details before the driver starts.",
  },
  {
    q: "What should I keep ready?",
    a: "Registration, insurance, and PUC in the car, enough fuel for the trip, and a pickup pin on WhatsApp. The car should be in driving condition.",
  },
];

export default function App() {
  useEffect(() => {
    document.title = `${site.brand} — ${site.tagline}`;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute(
        "content",
        `Book a call driver in ${site.city}. A driver for your own car. Call ${site.phoneDisplay} or WhatsApp ${site.whatsappDisplay}.`,
      );
    }
  }, []);

  return (
    <div className="page" id="top">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <SampleBanner />
      <Header />
      <main id="main">
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow">Call driver · {site.city}</p>
              <h1>A driver at your door. You sit in your own car.</h1>
              <p className="lede">
                Call or WhatsApp. We send a driver for airport runs, outstation trips, hourly city work, weddings, and night duty.
              </p>
              <div className="hero-actions">
                <a className="btn btn-light" href={telHref()}>
                  <PhoneIcon />
                  <span>Call now</span>
                </a>
                <a className="btn btn-wa" href={whatsappHref(defaultWhatsAppText())}>
                  <ChatIcon />
                  <span>WhatsApp</span>
                </a>
              </div>
              <ul className="route" aria-label="What a booking looks like">
                <li>Driver comes to your pickup</li>
                <li>You travel in your car</li>
                <li>No app and no account</li>
              </ul>
            </div>
            <BookingForm idPrefix="hero" variant="compact" />
          </div>
        </section>

        <section className="trust-wrap" aria-label="Why book">
          <ul className="wrap trust">
            <li>
              <strong>Verified drivers</strong>
              <span>ID checked before the first trip.</span>
            </li>
            <li>
              <strong>On time</strong>
              <span>Pickup window confirmed on WhatsApp.</span>
            </li>
            <li>
              <strong>24/7</strong>
              <span>Call or message, including night duty.</span>
            </li>
            <li>
              <strong>{site.city}</strong>
              <span>{site.serviceArea}.</span>
            </li>
          </ul>
        </section>

        <section className="section" id="services">
          <div className="wrap">
            <div className="section-head">
              <p className="kicker">Services</p>
              <h2>Book the kind of trip you have today</h2>
            </div>
            <ul className="cards">
              {SERVICES.map((service) => (
                <li className="card" key={service.title}>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section band" id="how">
          <div className="wrap">
            <div className="section-head">
              <p className="kicker">How it works</p>
              <h2>Three steps, then you are on the road</h2>
            </div>
            <ol className="steps">
              {STEPS.map((step, index) => (
                <li className="step" key={step.title}>
                  <span className="step-num">{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="pricing">
          <div className="wrap">
            <div className="section-head">
              <p className="kicker">Pricing</p>
              <h2>Contact us for pricing details</h2>
              <p>
                Every trip is quoted for the route and time. Call {site.phoneDisplay} or WhatsApp and we confirm the price before a driver is assigned.
              </p>
            </div>
            <div className="contact-cards pricing-contact">
              <a className="contact-card" href={telHref()}>
                <span>Call for pricing</span>
                <strong>{site.phoneDisplay}</strong>
              </a>
              <a className="contact-card wa" href={whatsappHref(defaultWhatsAppText())}>
                <span>WhatsApp for pricing</span>
                <strong>{site.whatsappDisplay}</strong>
              </a>
            </div>
          </div>
        </section>

        <section className="section band" id="book">
          <div className="wrap book-layout">
            <div className="section-head">
              <p className="kicker">Book</p>
              <h2>Book a driver</h2>
              <p>
                Fill the trip once. Book on WhatsApp sends it as a message to {site.whatsappDisplay}. Or call {site.phoneDisplay}.
              </p>
              <ul className="ready-list">
                <li>Car papers: RC, insurance, PUC</li>
                <li>Fuel for the trip</li>
                <li>A pickup landmark or map pin</li>
              </ul>
            </div>
            <BookingForm idPrefix="book" variant="full" />
          </div>
        </section>

        <section className="section" id="faq">
          <div className="wrap">
            <div className="section-head">
              <p className="kicker">FAQ</p>
              <h2>Before you call</h2>
            </div>
            <div className="faq-list">
              {FAQS.map((item) => (
                <details className="faq" key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="wrap contact-grid">
            <div>
              <p className="kicker">Contact</p>
              <h2>Call or WhatsApp, any hour</h2>
              <p>
                {site.brand} covers {site.serviceArea}. {site.hours}.
              </p>
            </div>
            <div className="contact-cards">
              <a className="contact-card" href={telHref()}>
                <span>Call</span>
                <strong>{site.phoneDisplay}</strong>
              </a>
              <a className="contact-card wa" href={whatsappHref(defaultWhatsAppText())}>
                <span>WhatsApp</span>
                <strong>{site.whatsappDisplay}</strong>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBar />
      <WhatsAppFab />
    </div>
  );
}
