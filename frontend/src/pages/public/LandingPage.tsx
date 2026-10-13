import FAQ from "../../components/landing/FAQ"
import HeroSection from "../../components/landing/HeroSection"
import HistoricalSuccess from "../../components/landing/HistoricalSuccess"
import InstallAppButton from "../../components/landing/InstallAppButton"
import MobileAppMarquee from "../../components/landing/MobileAppMarquee"
import Performance from "../../components/landing/Performance"
import PublicSignal from "../../components/landing/PublicSignal"
import Purpose from "../../components/landing/Purpose"
import UsefulInfo from "../../components/landing/UsefulInfo"

const LandingPage = () => {
  return (
    <main>
      <MobileAppMarquee/>
      <HeroSection/>
      <InstallAppButton/>
      <HistoricalSuccess/>
      <Purpose/>
      <PublicSignal/>
      <UsefulInfo/>
      <Performance/>
      <FAQ/>
    </main>
  )
}

export default LandingPage