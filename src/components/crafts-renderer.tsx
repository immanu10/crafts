import CornerBox from "./corner-box";
import { CodeIcon } from "./ui/icons";

function CraftsRenderer({
  title,
  codeLink,
  subtext,
  children,
}: {
  title: string;
  codeLink: string;
  subtext?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-neutral-200 py-2">
        <h2 className="text-md font-medium text-neutral-500">{title}</h2>

        <a
          href={codeLink}
          className="flex gap-1 items-center bg-stone-100 px-2 py-1 rounded-md text-sm"
        >
          <CodeIcon className="w-5 h-5" />
          <span>Code</span>
        </a>
      </div>
      {subtext && <p className="text-sm text-neutral-500 mt-4">{subtext}</p>}
      <div className="py-6">{children}</div>
    </>
  );
}
export function Section({
  title,
  items,
}: {
  title: string;
  items: {
    title: string;
    subtext?: string;
    link: string;
    component: React.ReactNode;
  }[];
}) {
  return (
    <>
      <CornerBox
        className="mt-6 font-semibold text-lg"
        showBorders={{ bottom: false, left: true, right: true, top: true }}
      >
        {title}
      </CornerBox>
      {items.map((item, index) => (
        <CornerBox
          key={item.title}
          showBorders={{
            top: true,
            left: true,
            right: true,
            bottom: index === items.length - 1, // Only last has bottom border
          }}
        >
          <CraftsRenderer
            title={item.title}
            codeLink={item.link}
            subtext={item.subtext}
          >
            {item.component}
          </CraftsRenderer>
        </CornerBox>
      ))}
    </>
  );
}
