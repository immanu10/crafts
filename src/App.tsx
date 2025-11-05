import CornerBox from "./components/corner-box";
import { CraftsRenderer } from "./components/crafts-renderer";
import { CardReveal } from "./components/crafts/card-reveal";
import { CarouselWidget } from "./components/crafts/carousel-widget";
import { FabShare } from "./components/crafts/fabshare";
import { GithubIcon, LinkedinIcon } from "./components/ui/icons";

const craftLink = (filename: string) =>
  `https://github.com/immanu10/crafts/blob/main/src/components/crafts/${filename}.tsx`;

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
        <CraftsRenderer
          title="Share Button"
          codeLink={craftLink("fabshare")}
          className="mt-4"
        >
          <FabShare />
        </CraftsRenderer>
        <CraftsRenderer
          title="Carousel Widget"
          codeLink={craftLink("carousel-widget")}
          className="mt-4"
        >
          <CarouselWidget />
        </CraftsRenderer>
        <CraftsRenderer
          title="Card Reveal"
          codeLink={craftLink("card-reveal")}
          className="mt-4"
        >
          <CardReveal />
        </CraftsRenderer>
        <CornerBox className="mt-6 h-64 flex items-center justify-center mask-b-from-0">
          <p className="text-2xl text-center">Work in Progress</p>
        </CornerBox>
      </div>
    </div>
  );
}

export default App;
