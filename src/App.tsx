import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProjectArchive } from "./components/ProjectArchive";
import { SignalSection } from "./components/SignalSection";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProjectArchive />
        <About />
        <SignalSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
