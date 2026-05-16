import tripadvisor from "@/assets/tripadvisor.png";
import { SITE } from "@/constants/site";

export function TripadvisorIcon() {
  return (
    <div className="flex items-center">
      <a
        href={SITE.tripadvisor}
        target="_blank"
        rel="noopener noreferrer"
        className="relative h-10 w-10 group"
      >
        <img
          src="https://cdn.trustindex.io/assets/platform/Tripadvisor/icon.svg"
          alt="Tripadvisor"
          className="absolute inset-0 h-10 w-10 transition-opacity duration-300 group-hover:opacity-0"
        />
        <img
          src={tripadvisor}
          alt="Tripadvisor"
          className="absolute inset-0 h-10 w-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </a>
    </div>
  );
}
