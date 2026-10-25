import * as React from "react";

export function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export function TwitterIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* Recognizable SVG Logos for Tech Stacks */
export function ReactLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="0" r="2.05" fill="#06b6d4" />
      <g stroke="#06b6d4" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function NextjsLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="90" cy="90" r="90" fill="currentColor" className="text-slate-800" />
      <path
        d="M149.508 157.438L69.147 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.134 149.508 157.438Z"
        fill="currentColor"
        className="text-white"
      />
      <path d="M115.892 54H128V125.97H115.892V54Z" fill="currentColor" className="text-white" />
    </svg>
  );
}

export function TypeScriptLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path
        d="M11.7 13.6h-2.5v5.4H7.5v-5.4H5v-1.6h6.7v1.6zm4.8 1.4c0-.7-.3-1.2-.8-1.5-.5-.4-1.2-.6-2-.8-.6-.2-1-.4-1.2-.6-.2-.2-.3-.5-.3-.8 0-.4.2-.7.5-.9.3-.2.8-.3 1.3-.3.5 0 1 .1 1.4.3.4.2.6.5.7.9l1.4-.9c-.3-.5-.7-.9-1.3-1.2-.6-.3-1.4-.5-2.2-.5-.9 0-1.7.2-2.3.7-.6.5-.9 1.1-.9 1.8 0 .6.2 1.1.7 1.4.5.4 1.1.7 1.9.9.7.2 1.1.4 1.3.6.2.2.3.5.3.8 0 .4-.2.7-.6 1-.4.2-.9.4-1.5.4-.7 0-1.3-.2-1.8-.5-.5-.4-.8-.9-1-1.5l-1.5.7c.3.9.8 1.7 1.5 2.2.7.5 1.7.8 2.8.8 1.1 0 2.1-.3 2.8-.8.8-.5 1.1-1.3 1.1-2.2z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function NodeLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 2.5L3.5 9.7V24.3L16 31.5L28.5 24.3V9.7L16 2.5Z"
        stroke="#10b981"
        strokeWidth="2"
        fill="#022c22"
      />
      <path
        d="M11.5 21V13.5L16 16V23.5L11.5 21Z"
        fill="#10b981"
      />
      <path
        d="M20.5 13.5V21L16 23.5V16L20.5 13.5Z"
        fill="#34d399"
      />
    </svg>
  );
}

export function TailwindLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z"
        fill="#06b6d4"
      />
    </svg>
  );
}

export function MongoLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 1.5C12 1.5 5.5 8 5.5 14C5.5 17.5899 8.41015 20.5 12 20.5C15.5899 20.5 18.5 17.5899 18.5 14C18.5 8 12 1.5 12 1.5Z"
        fill="#10b981"
      />
      <path
        d="M12 1.5V22.5C11.8 22.5 11.2 21.5 10.8 21.1C9 19.3 8 16.8 8 14C8 9.5 12 3.5 12 1.5Z"
        fill="#059669"
      />
    </svg>
  );
}

export function DockerLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 3h2v2h-2V3zm-3 0h2v2h-2V3zm6 0h2v2h-2V3zm-9 3h2v2H7V6zm3 0h2v2h-2V6zm3 0h2v2h-2V6zm3 0h2v2h-2V6zm-9 3h2v2H7V9zm3 0h2v2h-2V9zm3 0h2v2h-2V9zm3 0h2v2h-2V9zm3 0h2v2h-2V9zm3.5 3c-.5-.4-1.3-.4-1.8 0-.4.3-.6.8-.7 1.3-.9-.2-2.1.2-2.7.9H2.5c-.3 0-.5.2-.5.5 0 2.2.8 4.2 2.2 5.7C5.9 21.9 8.3 23 11 23c6.1 0 10.9-4.2 11.8-9.9.5 0 1-.2 1.2-.6.3-.5.2-1.1-.1-1.5-.2-.3-.5-.4-.9-.4-.5 0-1 .2-1.3.4-.1-.5-.2-1-.7-1zm-2 2c.3 0 .5.2.5.5s-.2.5-.5.5-.5-.2-.5-.5.2-.5.5-.5z"
        fill="#0284c7"
      />
    </svg>
  );
}

export function PostgresLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
        fill="#336791"
      />
    </svg>
  );
}

export function RedisLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.5 8.5L12 3.5L2.5 8.5L12 13.5L21.5 8.5Z"
        fill="#dc2626"
      />
      <path
        d="M2.5 11.5L12 16.5L21.5 11.5V13.5L12 18.5L2.5 13.5V11.5Z"
        fill="#b91c1c"
      />
      <path
        d="M2.5 16.5L12 21.5L21.5 16.5V18.5L12 23.5L2.5 18.5V16.5Z"
        fill="#991b1b"
      />
    </svg>
  );
}

export function ExpressLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#1e293b" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="bold"
        fontSize="12"
        fill="#f1f5f9"
      >
        ex
      </text>
    </svg>
  );
}
