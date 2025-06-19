import { useEffect, useState } from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

const images = [
  "src/assets/img1.png",
  "src/assets/img2.png",
  "src/assets/img3.png"
];

const ImageSwitcher = () => {
  const [index, setIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <img src={images[index]} alt="" className={`${isMobile ? "w-[312px] h-[336px]" : "h-[512px] w-[432px]"}`} />
    </div>
  );
};

export default ImageSwitcher;
