import HowToUse from "../components/how-use/HowToUse";
import LandingPage from "../components/LandingPage";
import FrequentlyAskedQ from "../components/faq/FrequentlyAskedQ";
import VolunteerCall from "../components/VolunteerCall"
// import Questionnaire from "../components/Questionnaire";
import RoadToHappiness from "../components/RoadToHappiness";

export default function Home() {
  return (
    <div className="">
      <LandingPage />
      <RoadToHappiness/>
      {/* <Questionnaire/> */}
      <HowToUse />
      <VolunteerCall/>
      <FrequentlyAskedQ />
    </div>
  );
}
