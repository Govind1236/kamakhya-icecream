import Header from "./components/Header";
import SensoryHero from "./components/SensoryHero";
import FlavorMenu from "./components/FlavorMenu";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SvgDefs from "./components/SvgDefs";
import { FlavorProvider } from "./lib/FlavorContext";

function App({ initialData = null }) {
  return (
    <FlavorProvider>
      {/* DOM UI layer on top. */}
      <div className="relative z-10">
        <SvgDefs />
        <Header />
        <main id="home">
          <SensoryHero />
          <FlavorMenu initialFlavors={initialData?.flavors ?? []} />
          <AboutUs initialAbout={initialData?.about ?? null} />
          <Contact initialContact={initialData?.contact ?? null} />
        </main>
        <Footer initialSocial={initialData?.social ?? []} initialContact={initialData?.contact ?? null} />
      </div>
    </FlavorProvider>
  );
}

export default App;