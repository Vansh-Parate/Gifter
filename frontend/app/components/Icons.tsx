/**
 * Reusable SVG Icons Component
 * Lucide-style icons for the AI Gift Finder
 */

interface IconProps {
    className?: string;
}

export const GiftIcon = ({ className = "w-4 h-4" }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <path d="M12 5v14M2 12h20" />
        <path d="M12 5a3 3 0 1 1 3-3c0 1.657-3 3-3 3Z" />
        <path d="M12 5a3 3 0 1 0-3-3c0 1.657 3 3 3 3Z" />
    </svg>
);

export const UserCircleIcon = ({ className = "w-4 h-4" }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="8" r="4" />
        <path d="M6 20a6 6 0 0 1 12 0" />
        <circle cx="12" cy="12" r="10" />
    </svg>
);

export const WandIcon = ({ className = "w-4 h-4" }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M15 4V2M15 8v-2M11 6H9M21 6h-2M18.364 7.636l-1.414-1.414M18.364 4.364l-1.414 1.414M3 21l7.5-7.5" />
        <path d="m10.5 13.5 2 2" />
    </svg>
);

export const SparklesIcon = ({ className = "w-4 h-4" }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 3v4M14.5 4.5l-3 3M9.5 4.5l3 3" />
        <path d="M5 15l1.5-3L8 15l-1.5 3L5 15Z" />
        <path d="M17 14l1-2 1 2-1 2-1-2Z" />
    </svg>
);

export const CompassIcon = ({ className = "w-4 h-4" }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10" />
        <polygon points="16 8 14.5 14.5 8 16 9.5 9.5 16 8" />
    </svg>
);

export const RefreshIcon = ({ className = "w-4 h-4" }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 2v6h6" />
        <path d="M21 22v-6h-6" />
        <path d="M3 10a9 9 0 0 1 15.5-6.5L21 8" />
        <path d="M21 14a9 9 0 0 1-15.5 6.5L3 16" />
    </svg>
);

export const PackageIcon = ({ className = "w-4 h-4" }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m7.5 4.27 4.5 2.7 4.5-2.7" />
        <path d="M3 7l9 5 9-5" />
        <path d="M4 6.8v10.4L12 22l8-4.8V6.8" />
    </svg>
);

export const BookIcon = ({ className = "w-4 h-4" }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 20V4" />
        <path d="M19 20a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3" />
        <path d="M19 4a3 3 0 0 0-3 3H7a3 3 0 0 0-3-3" />
    </svg>
);

export const PlushIcon = ({ className = "w-4 h-4" }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M13 16a3 3 0 1 1-6 0c0-1.657 1.343-3 3-3s3 1.343 3 3Z" />
        <path d="M9 7V4a2 2 0 0 0-4 0v3" />
        <path d="M15 7V4a2 2 0 0 1 4 0v3" />
        <path d="M7 10a5 5 0 0 1 10 0v2a5 5 0 0 1-10 0v-2Z" />
    </svg>
);

export const DollarIcon = ({ className = "w-4 h-4" }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M7 12h8a2 2 0 0 0 0-4H9a2 2 0 0 1 0-4h7" />
        <path d="M11 20V4" />
        <circle cx="12" cy="12" r="9" />
    </svg>
);

export const LightbulbIcon = ({ className = "w-4 h-4" }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 0-4 12.74V16h8v-1.26A7 7 0 0 0 12 2Z" />
    </svg>
);

export const PenIcon = ({ className = "w-4 h-4" }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 20h9" />
        <path d="M16.5 3.5 20.5 7.5 8 20H4v-4L16.5 3.5Z" />
    </svg>
);

export const ShieldCheckIcon = ({ className = "w-4 h-4" }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

export const CopyIcon = ({ className = "w-4 h-4" }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
);

export const CheckIcon = ({ className = "w-4 h-4" }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export const SearchIcon = ({ className = "w-4 h-4" }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
    </svg>
);

// Icon mapping for dynamic gift category icons
export const getCategoryIcon = (index: number) => {
    const icons = [PackageIcon, BookIcon, PlushIcon];
    return icons[index % icons.length];
};

// Icon badge colors
export const getCategoryBadgeClass = (index: number) => {
    const classes = ["icon-badge-amber", "icon-badge-sky", "icon-badge-rose"];
    return classes[index % classes.length];
};
