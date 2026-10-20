import { useEffect, useState } from "react";
import { SAMPLE_PHONE_TEL, site } from "../config";
import { defaultWhatsAppText, telHref, whatsappHref } from "../contact";
import { ChatIcon, PhoneIcon } from "./Icons";

const YEAR = new Date().getFullYear();

const LINKS = [
  ["Services", "#services"],
  ["Pricing", "#pricing"],
  ["How it works", "#how"],
  ["Book", "#book"],
  ["Contact", "#contact"],
];

function WhatsAppLink({ className, children, text, label }) {
  return (
    <a className={className} href={whatsappHref(text ?? defaultWhatsAppText())} aria-label={label}>
      {children}
    </a>
  );
}

export function SampleBanner() {
  if (site.phoneTel !== SAMPLE_PHONE_TEL) return null;
  return (
    <p className="sample-banner" role="status">
      Sample number is showing. Edit <code>src/config.js</code> with your brand, city, and mobile before you publish.
    </p>
  );
}

export function Header() {
  return (
    <header className="header">
      <div className="wrap header-inner">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true">
            AAA
          </span>
          <span>
            <strong>{site.brand}</strong>
            <span className="brand-tag">{site.tagline}</span>
          </span>
        </a>
        <nav className="nav" aria-label="Primary">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="btn btn-navy" href={telHref()} aria-label={`Call ${site.phoneDisplay}`}>
            <PhoneIcon />
            <span className="btn-label">Call</span>
            <span className="btn-number">{site.phoneDisplay}</span>
          </a>
          <WhatsAppLink className="btn btn-wa" label="WhatsApp">
            <ChatIcon />
            <span className="btn-label">WhatsApp</span>
          </WhatsAppLink>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-brand">{site.brand}</p>
          <p>{site.tagline}</p>
        </div>
        <div>
          <p className="footer-label">Call</p>
          <a href={telHref()}>{site.phoneDisplay}</a>
          <p className="footer-label">WhatsApp</p>
          <WhatsAppLink className="footer-inline">{site.whatsappDisplay}</WhatsAppLink>
        </div>
        <div>
          <p className="footer-label">Service area</p>
          <p>{site.serviceArea}</p>
          <p className="footer-label">Hours</p>
          <p>{site.hours}</p>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>© {YEAR} {site.brand}. Call driver booking for {site.city}.</p>
      </div>
    </footer>
  );
}

export function MobileBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    function onFocusIn(event) {
      const tag = event.target?.tagName;
      setHidden(tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT");
    }
    function onFocusOut() {
      setHidden(false);
    }
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className="mobile-bar">
      <a className="btn btn-navy" href={telHref()}>
        <PhoneIcon />
        Call
      </a>
      <WhatsAppLink className="btn btn-wa">
        <ChatIcon />
        WhatsApp
      </WhatsAppLink>
    </div>
  );
}

export function WhatsAppFab() {
  return (
    <WhatsAppLink className="btn btn-wa wa-fab">
      <ChatIcon />
      WhatsApp
    </WhatsAppLink>
  );
}
