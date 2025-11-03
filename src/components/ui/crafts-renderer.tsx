import CornerBox from "./corner-box";
import { CodeIcon } from "./icons";

export function CraftsRenderer({
  title,
  codeLink,
  children,
  className,
}: {
  title: string;
  codeLink: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <CornerBox className={className}>
      <div className="flex items-center justify-between border-b border-neutral-200 py-2">
        <h2 className="text-lg font-medium">{title}</h2>

        <a
          href={codeLink}
          className="flex gap-1 items-center bg-stone-100 px-2 py-1 rounded-md text-sm"
        >
          <CodeIcon className="w-5 h-5" />
          <span>Code</span>
        </a>
      </div>
      <div className="py-6">{children}</div>
    </CornerBox>
  );
}
