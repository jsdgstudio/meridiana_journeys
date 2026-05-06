interface RichTextProps {
  html: string;
  className?: string;
}

export function RichText({ html, className = "" }: RichTextProps) {
  return (
    <div
      className={[
        "prose prose-lg max-w-none",
        "prose-headings:font-display prose-headings:font-light prose-headings:tracking-tight",
        "prose-p:font-sans prose-p:leading-relaxed prose-p:text-base",
        "prose-blockquote:font-display prose-blockquote:text-2xl prose-blockquote:font-light prose-blockquote:italic prose-blockquote:not-italic",
        "prose-a:text-terracota prose-a:no-underline hover:prose-a:opacity-70",
        "prose-strong:font-medium",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
