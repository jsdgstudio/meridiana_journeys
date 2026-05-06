type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps {
  as: HeadingLevel;
  children: React.ReactNode;
  className?: string;
  italic?: boolean;
}

const levelStyles: Record<HeadingLevel, string> = {
  h1: "font-display text-4xl font-light leading-tight tracking-tight",
  h2: "font-display text-3xl font-light leading-tight tracking-tight",
  h3: "font-display text-2xl font-normal leading-snug",
  h4: "font-display text-xl font-normal leading-snug",
};

export function Heading({ as: Tag, children, className = "", italic = false }: HeadingProps) {
  return (
    <Tag
      className={`${levelStyles[Tag]}${italic ? " italic" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
