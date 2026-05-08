interface SectionWrapperProps {
  children: React.ReactNode;
  theme?: "dark" | "verde" | "light" | "page";
  className?: string;
  as?: "section" | "div" | "article";
}

const themeStyles: Record<
  NonNullable<SectionWrapperProps["theme"]>,
  { bg: string; text: string }
> = {
  dark: {
    bg: "bg-gradient-section",
    text: "text-marfil",
  },
  verde: {
    bg: "bg-gradient-section-inv",
    text: "text-marfil",
  },
  light: {
    bg: "bg-marfil",
    text: "text-negro",
  },
  page: {
    bg: "bg-blanco",
    text: "text-negro",
  },
};

export function SectionWrapper({
  children,
  theme = "page",
  className = "",
  as: Tag = "section",
}: SectionWrapperProps) {
  const { bg, text } = themeStyles[theme];
  return (
    <Tag className={`w-full py-20 lg:py-32 ${bg} ${text} ${className}`}>
      {children}
    </Tag>
  );
}
