import FeatureItem from "./FeatureItem";
import FadeInOnScroll from "../../components/FadeInOnScroll";

export default function HowToUse() {
  return (
    <FadeInOnScroll>
    <div className="howToUseContainer">
      <h2 className="faq-header">Little step to feeling whole again <span className="HowToUseLogo"></span>  </h2>
      <div className="howToUseFeatures">
        <FeatureItem 
          icon="/images/chatwithChatbot.jpg"
          alt="Seamless Journey" 
          title="Talk Freely, Heal Gently" 
          description="Whether you need a listening ear or just someone to talk to, our chatbot is here—always ready, always understanding. Share your thoughts without fear, without judgment." 
        />
        <FeatureItem 
          icon="/images/person.jpg"
          alt="Eco Friendly" 
          title="A Safe Space for Your Thoughts" 
          description="Feeling lonely? Shattered? Nowhere to share your thoughts?
Need a safe space to talk—without judgment, without fear?" 
        />
        <FeatureItem 
          icon="/images/connectWithPeople2.jpg"
          alt="Transparent Pricing" 
          title="Connect, Share, Heal" 
          description="Talk to someone who understands. Open up, share your thoughts, and find comfort in a conversation—because you're never truly alone" 
        />

      </div>
    </div>
    </FadeInOnScroll>
  );
}