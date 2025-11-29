import CornerBox from "./components/corner-box";
import { Section } from "./components/crafts-renderer";
import { CardReveal } from "./components/crafts/card-reveal";
import { CarouselWidget } from "./components/crafts/carousel-widget";
import { FabShare } from "./components/crafts/fabshare";
import AnimatedPalindromeChecker from "./components/crafts/is-palindrome";
import StockProfitVisualizer from "./components/crafts/kadanes-algo";
import RemoveDuplicatesVisual from "./components/crafts/remove-duplicate";
import SlidingWindowVisualizer from "./components/crafts/sliding-window";
import { TabMotion } from "./components/crafts/tab-motion";
import { GithubIcon, LinkedinIcon } from "./components/ui/icons";

const craftLink = (filename: string) =>
  `https://github.com/immanu10/crafts/blob/main/src/components/crafts/${filename}.tsx`;

const uiCrafts = [
  {
    title: "Share Button",
    link: craftLink("fabshare"),
    component: <FabShare />,
  },
  {
    title: "Carousel Widget",
    link: craftLink("carousel-widget"),
    component: <CarouselWidget />,
  },
  {
    title: "Card Reveal",
    link: craftLink("card-reveal"),
    component: <CardReveal />,
  },
  {
    title: "Tab Motion",
    link: craftLink("tab-motion"),
    component: <TabMotion />,
  },
];
function App() {
  return (
    <div className="h-screen ">
      <div className="max-w-3xl mx-auto p-4">
        <nav className="">
          <CornerBox className="flex items-center justify-between ">
            <h1 className="text-2xl text-slate-800 font-semibold">
              Crafts
              <span className="block text-xs text-neutral-500">
                by immanu10
              </span>
            </h1>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/immanu10/crafts/"
                className="p-2 hover:bg-neutral-100 rounded-md transition-all"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/immanu10"
                className="p-2 hover:bg-neutral-100 rounded-md"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </CornerBox>
        </nav>
        <Section title="Interactive UI" items={uiCrafts} />
        <div className="my-16 border-t border-gray-200" />
        <Section
          title="DSA in UI"
          items={[
            {
              title: "Two Pointers: Palindrome Checker",
              subtext:
                "Type 1: Oposite ends (e.g., pair sum in sorted array, palindrome checking)",
              link: craftLink("is-palindrome"),
              component: <AnimatedPalindromeChecker />,
            },
            {
              title: "Two Pointers:  Remove duplicate",
              subtext:
                "Type 2: Fast and slow (e.g., detect cycles, removing duplicates)",
              link: craftLink("remove-duplicate"),
              component: <RemoveDuplicatesVisual />,
            },
            {
              title: "Sliding Window: Max Sum Subarray of Size K",
              link: craftLink("sliding-window"),
              component: <SlidingWindowVisualizer />,
            },
            {
              title: "Kadane's Algorithm",
              link: craftLink("kadanes-algo"),
              component: <StockProfitVisualizer />,
            },
          ]}
        />
        <CornerBox className="mt-6 h-64 flex items-center justify-center mask-b-from-0">
          <p className="text-2xl text-center">Work in Progress</p>
        </CornerBox>
      </div>
    </div>
  );
}

export default App;
