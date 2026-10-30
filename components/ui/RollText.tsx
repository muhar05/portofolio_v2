import type { CSSProperties } from "react";

interface RollTextProps {
  text: string;
  gap?: string;
}

export default function RollText({ text, gap = "0em" }: RollTextProps) {
  const chars = Array.from(text);

  return (
    <span className="roll-text" style={{ "--roll-gap": gap } as CSSProperties}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex items-center">
        {chars.map((char, index) =>
          char === " " ? (
            <span key={`space-${index}`} className="roll-text__space" />
          ) : (
            <span
              key={`${char}-${index}`}
              className="roll-text__cell"
              style={{ "--roll-index": index } as CSSProperties}
            >
              <span className="roll-text__glyph">{char}</span>
              <span className="roll-text__glyph" aria-hidden="true">
                {char}
              </span>
            </span>
          )
        )}
      </span>
    </span>
  );
}
