import CornerBox from "./components/ui/corner-box";
import { CraftsRenderer } from "./components/ui/crafts-renderer";
import { FabShare } from "./components/ui/crafts/fabshare";
import { GithubIcon, LinkedinIcon } from "./components/ui/icons";

function App() {
  return (
    <div className="h-screen ">
      <div className="max-w-3xl mx-auto p-4">
        <nav className="sticky top-0  bg-white z-1">
          <CornerBox className="flex items-center justify-between ">
            <h1 className="text-4xl text-slate-800 font-semibold">
              Crafts
              <span className="block text-base text-neutral-500">
                by immanu10
              </span>
            </h1>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/immanu10/ui"
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
          title="Share on hover"
          codeLink="https:github.com/immanu10/ui"
          className="mt-4"
        >
          <FabShare />
        </CraftsRenderer>
        <CornerBox className="mt-6 h-64 flex items-center justify-center mask-b-from-0">
          <p className="text-2xl text-center">Work in Progress</p>
        </CornerBox>
      </div>
    </div>
  );
}

export default App;
