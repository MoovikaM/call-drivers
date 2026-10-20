import { useState } from "react";
import { site } from "../config";
import {
  buildBookingMessage,
  isValidIndianMobile,
  telHref,
  whatsappHref,
} from "../contact";
import { ChatIcon, PhoneIcon } from "./Icons";

const TRIPS = [
  {
    id: "Hourly",
    label: "Hourly / local",
    needsDrop: false,
    unit: "hours",
    options: [2, 3, 4, 5, 6, 8, 10, 12],
    defaultDuration: "4",
  },
  {
    id: "Airport",
    label: "Airport",
    needsDrop: true,
  },
  {
    id: "Outstation",
    label: "Outstation",
    needsDrop: true,
    unit: "days",
    options: [1, 2, 3, 4, 5, 6, 7, 10, 15],
    defaultDuration: "1",
  },
  {
    id: "Event",
    label: "Event / wedding",
    needsDrop: true,
    unit: "hours",
    options: [4, 5, 6, 8, 10, 12],
    defaultDuration: "6",
  },
];

const CARS = ["Hatchback", "Sedan", "SUV", "MUV", "Luxury"];

const EMPTY = {
  name: "",
  mobile: "",
  pickup: "",
  drop: "",
  datetime: "",
  tripType: "Hourly",
  duration: "4",
  car: "",
  notes: "",
};

function tripById(id) {
  return TRIPS.find((trip) => trip.id === id);
}

function durationLabel(trip, amount) {
  if (!trip?.unit || !amount) return "";
  const count = Number(amount);
  const unit = count === 1 ? trip.unit.replace(/s$/, "") : trip.unit;
  return `${amount} ${unit}`;
}

function validate(form, variant) {
  const errors = {};
  const trip = tripById(form.tripType);

  if (variant === "full" && !form.name.trim()) {
    errors.name = "Enter your name.";
  }
  if (!isValidIndianMobile(form.mobile)) {
    errors.mobile = "Enter a 10-digit mobile number.";
  }
  if (!form.pickup.trim()) {
    errors.pickup = "Enter the pickup location.";
  }
  if (!form.datetime) {
    errors.datetime = "Choose a date and time.";
  }
  if (!form.tripType) {
    errors.tripType = "Choose a trip type.";
  }
  if (trip?.needsDrop && !form.drop.trim()) {
    errors.drop = "Enter the drop location. Choose Hourly if there is no fixed drop.";
  }
  if (trip?.options && !form.duration) {
    errors.duration = `Choose how many ${trip.unit}.`;
  }

  return errors;
}

function Field({ id, label, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <p className="error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function BookingForm({ idPrefix, variant }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [readyMessage, setReadyMessage] = useState("");
  const trip = tripById(form.tripType);
  const compact = variant === "compact";

  function update(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
    setReadyMessage("");
  }

  function changeTrip(id) {
    const nextTrip = tripById(id);
    setForm((current) => ({
      ...current,
      tripType: id,
      duration: nextTrip?.defaultDuration ?? "",
      drop: nextTrip?.needsDrop ? current.drop : "",
    }));
    setReadyMessage("");
  }

  function messageFromForm() {
    return buildBookingMessage({
      ...form,
      duration: durationLabel(trip, form.duration),
    });
  }

  function collect() {
    const nextErrors = validate(form, variant);
    setErrors(nextErrors);
    const fields = Object.keys(nextErrors);
    if (fields.length) {
      setReadyMessage("");
      document.getElementById(`${idPrefix}-${fields[0]}`)?.focus();
      return null;
    }
    return messageFromForm();
  }

  function onSubmit(event) {
    event.preventDefault();
    const message = collect();
    if (message) setReadyMessage(message);
  }

  function onWhatsAppClick(event) {
    if (!collect()) event.preventDefault();
  }

  const describedBy = (name) => (errors[name] ? `${idPrefix}-${name}-error` : undefined);

  return (
    <form className={compact ? "book-card" : "book-card flat"} onSubmit={onSubmit} noValidate>
      <div className="book-card-head">
        {compact ? <h2>Quick request</h2> : <h3>Trip details</h3>}
        <p>{compact ? "Send the basics on WhatsApp." : "No account. We confirm by call or WhatsApp."}</p>
      </div>

      {Object.keys(errors).length > 0 ? (
        <p className="error" role="alert">
          Check the highlighted fields.
        </p>
      ) : null}

      <div className={compact ? "form-grid" : "form-grid two"}>
        {compact ? null : (
          <Field id={`${idPrefix}-name`} label="Name" error={errors.name}>
            <input
              id={`${idPrefix}-name`}
              name="name"
              autoComplete="name"
              value={form.name}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy("name")}
              onChange={(event) => update("name", event.target.value)}
            />
          </Field>
        )}

        <Field id={`${idPrefix}-mobile`} label="Mobile number" error={errors.mobile}>
          <input
            id={`${idPrefix}-mobile`}
            name="mobile"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98765 43210"
            value={form.mobile}
            aria-invalid={Boolean(errors.mobile)}
            aria-describedby={describedBy("mobile")}
            onChange={(event) => update("mobile", event.target.value)}
          />
        </Field>

        <Field id={`${idPrefix}-pickup`} label="Pickup location" error={errors.pickup}>
          <input
            id={`${idPrefix}-pickup`}
            name="pickup"
            autoComplete="street-address"
            placeholder="Area, landmark"
            value={form.pickup}
            aria-invalid={Boolean(errors.pickup)}
            aria-describedby={describedBy("pickup")}
            onChange={(event) => update("pickup", event.target.value)}
          />
        </Field>

        {trip?.needsDrop ? (
          <Field id={`${idPrefix}-drop`} label="Drop location" error={errors.drop}>
            <input
              id={`${idPrefix}-drop`}
              name="drop"
              placeholder="Where should the driver go?"
              value={form.drop}
              aria-invalid={Boolean(errors.drop)}
              aria-describedby={describedBy("drop")}
              onChange={(event) => update("drop", event.target.value)}
            />
          </Field>
        ) : null}

        <Field id={`${idPrefix}-datetime`} label="Date and time" error={errors.datetime}>
          <input
            id={`${idPrefix}-datetime`}
            name="datetime"
            type="datetime-local"
            value={form.datetime}
            aria-invalid={Boolean(errors.datetime)}
            aria-describedby={describedBy("datetime")}
            onChange={(event) => update("datetime", event.target.value)}
          />
        </Field>

        <Field id={`${idPrefix}-tripType`} label="Trip type" error={errors.tripType}>
          <select
            id={`${idPrefix}-tripType`}
            name="tripType"
            value={form.tripType}
            aria-invalid={Boolean(errors.tripType)}
            aria-describedby={describedBy("tripType")}
            onChange={(event) => changeTrip(event.target.value)}
          >
            {TRIPS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>

        {trip?.options ? (
          <Field id={`${idPrefix}-duration`} label={trip.unit === "days" ? "Days" : "Hours"} error={errors.duration}>
            <select
              id={`${idPrefix}-duration`}
              name="duration"
              value={form.duration}
              aria-invalid={Boolean(errors.duration)}
              aria-describedby={describedBy("duration")}
              onChange={(event) => update("duration", event.target.value)}
            >
              {trip.options.map((amount) => (
                <option key={amount} value={String(amount)}>
                  {durationLabel(trip, amount)}
                </option>
              ))}
            </select>
          </Field>
        ) : null}

        {compact ? null : (
          <Field id={`${idPrefix}-car`} label="Car type (optional)" error="">
            <select
              id={`${idPrefix}-car`}
              name="car"
              value={form.car}
              onChange={(event) => update("car", event.target.value)}
            >
              <option value="">Not specified</option>
              {CARS.map((car) => (
                <option key={car} value={car}>
                  {car}
                </option>
              ))}
            </select>
          </Field>
        )}

        {compact ? null : (
          <Field id={`${idPrefix}-notes`} label="Notes (optional)" error="">
            <textarea
              id={`${idPrefix}-notes`}
              name="notes"
              maxLength={400}
              rows={3}
              placeholder="Flight number, night pickup, return trip..."
              value={form.notes}
              onChange={(event) => update("notes", event.target.value)}
            />
          </Field>
        )}
      </div>

      <div className="form-actions">
        <a className="btn btn-navy" href={telHref()}>
          <PhoneIcon />
          Call now
        </a>
        <a
          className="btn btn-wa"
          href={whatsappHref(messageFromForm())}
          onClick={onWhatsAppClick}
        >
          <ChatIcon />
          Book on WhatsApp
        </a>
        <button className="btn btn-ghost" type="submit">
          Review request
        </button>
      </div>

      {compact ? (
        <p className="fine">
          <a href="#book">Add your name, car, and notes</a>
        </p>
      ) : null}

      {readyMessage ? (
        <div className="ready" role="status">
          <h3>Request ready</h3>
          <p>Open WhatsApp to send this message. Nothing is stored on this website.</p>
          <pre>{readyMessage}</pre>
          <div className="form-actions">
            <a className="btn btn-wa" href={whatsappHref(readyMessage)}>
              <ChatIcon />
              Open WhatsApp
            </a>
            <a className="btn btn-navy" href={telHref()}>
              <PhoneIcon />
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      ) : null}
    </form>
  );
}
