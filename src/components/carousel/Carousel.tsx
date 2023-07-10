import { Carousel } from "antd";
import Image from "next/image";
import styles from "./Carousel.module.css";
import "../../../public/assets/HP1.jpeg";

type CarouselProps = {
  width: number;
  height: number;
};

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const ImgCarousel = (props: CarouselProps) => {
  return (
    <Carousel>
      <div>
        <Image
          style={contentStyle}
          src="/assets/OIP.png"
          width={props.width}
          height={props.height}
          alt="Carousel 1"
        />
      </div>
      <div>
        <Image
          style={contentStyle}
          src="/assets/OIP.png"
          width={props.width}
          height={props.height}
          alt="Carousel 2"
        />
      </div>
      <div>
        <Image
          style={contentStyle}
          src="/assets/OIP.png"
          width={props.width}
          height={props.height}
          alt="Carousel 3"
        />
      </div>
      <div>
        <Image
          style={contentStyle}
          src="/assets/OIP.png"
          width={props.width}
          height={props.height}
          alt="Carousel 4"
        />
      </div>
    </Carousel>
  );
};

export default ImgCarousel;
