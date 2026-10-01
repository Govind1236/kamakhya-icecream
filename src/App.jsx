import Header from "./components/Header";
import AvocadoHero from "./components/AvocadoHero";
import FlavorMenu from "./components/FlavorMenu";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SvgDefs from "./components/SvgDefs";

function App({ initialData = null }) {
  return (
    <div className="relative z-10">
      <SvgDefs />
      <Header initialContact={initialData?.contact ?? null} />
      <main id="home">
        <AvocadoHero initialFlavors={initialData?.flavors ?? []} initialContact={initialData?.contact ?? null} />
        <FlavorMenu initialFlavors={initialData?.flavors ?? []} />
        <AboutUs initialAbout={initialData?.about ?? null} initialCards={initialData?.aboutCards ?? []} />
        <Contact initialContact={initialData?.contact ?? null} />
      </main>
      <Footer initialSocial={initialData?.social ?? []} initialContact={initialData?.contact ?? null} />
    </div>
  );
}

export default App;