interface ContainerProps {
  children: React.ReactNode;
  size?: "default" | "narrow" | "wide";
  className?: string;
}

const sizeStyles = {
  narrow: "max-w-2xl",
  default: "max-w-6xl",
  wide: "max-w-screen-2xl",
};

export function Container({
  children,
  size = "default",
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-6 md:px-10 lg:px-16 ${sizeStyles[size]} ${className}`}
    >
      {children}
    </div>
  );
}
