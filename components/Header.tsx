"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { primaryNav, siteConfig, tourNav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1040px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const measure = () => {
      document.documentElement.style.setProperty("--header-h", `${header.offsetHeight}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open && !desktop);
    return () => document.body.classList.remove("menu-open");
  }, [open, desktop]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header" ref={headerRef}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="wrap header-inner">
        <Link href="/" className="brand">
          <img src="/logo-mark.png" alt="" width={800} height={476} />
          <span className="brand-text">
            <span className="brand-name">Rooted Path</span>
            <span className="brand-sub">Homes LLC</span>
          </span>
        </Link>
        <a className="header-phone" href={`tel:${siteConfig.phoneTel}`}>
          <PhoneIcon />
          <span>{siteConfig.phoneDisplay}</span>
        </a>
        <Link
          href={tourNav.href}
          className="btn btn-copper btn-tour"
          aria-current={pathname === tourNav.href ? "page" : undefined}
        >
          <CalendarIcon />
          {tourNav.label}
        </Link>
        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="nav-toggle-label">
            {open ? "Close" : "Menu"}
          </span>
        </button>
        <nav id={menuId} className={`primary-nav${open ? " is-open" : ""}`} aria-label="Primary">
          <ul>
            {primaryNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={active ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7.2 3.6c.4-.4 1-.5 1.5-.3l2.2.9c.5.2.8.7.8 1.2l-.3 2.3a1.2 1.2 0 0 1-.7 1l-1.3.6a12.6 12.6 0 0 0 5.9 5.9l.6-1.3c.2-.4.6-.7 1-.7l2.3-.3c.5 0 1 .3 1.2.8l.9 2.2c.2.5.1 1.1-.3 1.5l-1.5 1.5c-.4.4-1 .6-1.6.5C10.8 18.6 5.4 13.2 4.6 6.7c-.1-.6.1-1.2.5-1.6l2.1-1.5Z"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 3.5v4M16 3.5v4M3.5 10h17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
