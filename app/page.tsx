import Navbar from './ui/navbar';
import Hero from './ui/hero';
import Stats from './ui/stats';
import About from './ui/about';
import VisionMission from './ui/vision-mission';
import CoreValues from './ui/core-values';
import Services from './ui/services';
import Routes from './ui/routes';
import Pricing from './ui/pricing';
import Team from './ui/team';
import Footer from './ui/footer';

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <VisionMission />
      <CoreValues />
      <Services />
      <Routes />
      <Pricing />
      <Team />
      <Footer />
    </main>
  );
}