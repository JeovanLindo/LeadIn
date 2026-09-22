import Features from "./Components/Sections/Feature";
import Hero from "./Components/Sections/Hero";
import Plans from "./Components/Sections/Plans";
import Problem from "./Components/Sections/Problem";
import Product from "./Components/Sections/Product";
import TimelineHeader from "./Components/Sections/TimeLineHeader";
import WR from "./Components/Sections/Wr";
import ScrollClock from "./Components/ui/ScrollClock";
import { JourneyProvider } from "./context/JourneyContext";

function App() {
  return (
    <JourneyProvider>
      <ScrollClock />

      <header>
        <TimelineHeader />
      </header>

      <main>
        <Hero />

        <Problem />

        <Product />

        <Features />

        <WR />

        <Plans />
      </main>
    </JourneyProvider>
  );
}

export default App;