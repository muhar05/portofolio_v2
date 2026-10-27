interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-5 w-5" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 36 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 26V6L14 17L24 6V26"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="30" cy="26" r="2.2" fill="var(--accent)" />
    </svg>
  );
}
