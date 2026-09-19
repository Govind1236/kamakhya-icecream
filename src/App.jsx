import Header from "./components/Header";
import Hero from "./components/Hero";
import FlavorMenu from "./components/FlavorMenu";
import AboutUs from "./components/AboutUs";
import VisitUs from "./components/VisitUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SvgDefs from "./components/SvgDefs";

function App() {
  return (
    <>
      <SvgDefs />
      <Header />
      <main id="home">
        <Hero />
        <FlavorMenu />
        <AboutUs />
        <VisitUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;