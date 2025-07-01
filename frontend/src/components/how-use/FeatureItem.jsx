import Image from "next/image";

export default function FeatureItem({ icon, alt, title, description }) {
    return (
      <div className="featureItemBlock">
        <div className="feature_img">
          <Image src={icon} alt={alt} width={300} height={80} className="feature_img"/>
        </div>
        <h3 className="featureItemTitle">{title}</h3>
        <p className="featureItemDescription">{description}</p>
      </div>
    );
}