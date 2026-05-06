type TextSize = "lg" | "base" | "sm" | "caption";

interface TextProps {
  children: React.ReactNode;
  size?: TextSize;
  className?: string;
  as?: "p" | "span" | "div";
  muted?: boolean;
}

const sizeStyles: Record<TextSize, string> = {
  lg: "text-md leading-relaxed",
  base: "text-base leading-relaxed",
  sm: "text-sm leading-normal",
  caption: "text-xs tracking-wide opacity-65",
};

export function Text({
  children,
  size = "base",
  className = "",
  as: Tag = "p",
  muted = false,
}: TextProps) {
  return (
    <Tag
      className={`font-sans ${sizeStyles[size]}${muted ? " opacity-65" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
