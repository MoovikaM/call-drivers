import { site } from "./config";

export function digits(value) {
  return String(value ?? "").replace(/\D/g, "");
}

export function normalizeMobile(value) {
  let next = digits(value);
  if (next.length === 12 && next.startsWith("91")) next = next.slice(2);
  if (next.length === 11 && next.startsWith("0")) next = next.slice(1);
  return next;
}

export function isValidIndianMobile(value) {
  return /^[6-9]\d{9}$/.test(normalizeMobile(value));
}

export function formatMobile(value) {
  const mobile = normalizeMobile(value);
  if (mobile.length !== 10) return String(value ?? "").trim();
  return `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}`;
}

export function telHref() {
  const raw = String(site.phoneTel).trim();
  if (raw.startsWith("+")) return `tel:+${digits(raw)}`;
  return `tel:${digits(raw)}`;
}

export function whatsappHref(text) {
  const number = digits(site.whatsappNumber);
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function defaultWhatsAppText() {
  return `Hi, I need a call driver in ${site.city}. Pickup: [location]. Date/time: [when]. Trip type: local/outstation.`;
}

export function formatWhen(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function buildBookingMessage(form) {
  const lines = [
    `Hi, I need a call driver in ${site.city}.`,
    form.name.trim() && `Name: ${form.name.trim()}`,
    form.mobile.trim() && `Mobile: ${formatMobile(form.mobile)}`,
    form.pickup.trim() && `Pickup: ${form.pickup.trim()}`,
    form.drop.trim() && `Drop: ${form.drop.trim()}`,
    form.datetime && `Date/time: ${formatWhen(form.datetime)}`,
    form.tripType && `Trip type: ${form.tripType}`,
    form.duration && `Duration: ${form.duration}`,
    form.car && `Car: ${form.car}`,
    form.notes.trim() && `Notes: ${form.notes.trim()}`,
    "Please confirm driver availability and pricing.",
  ];
  return lines.filter(Boolean).join("\n");
}
