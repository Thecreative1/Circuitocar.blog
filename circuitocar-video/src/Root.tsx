import {Composition} from "remotion";
import {CarShowcase} from "./HelloWorld/CarShowcase";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="CarShowcase"
        component={CarShowcase}
        durationInFrames={490}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          imageSrc: "https://omeustand.pt/viaturas/224/7724383789_omeustand_foto.webp",
          brand: "Opel",
          year: "2009",
          model: "GT Roadster",
          subtitle: "Série Limitada Mundial",
          mileage: "143.016 km",
          edition: "Série Limitada Mundial",
          specs: [
            { value: "264 cv", label: "Potência" },
            { value: "RWD", label: "Tração Traseira" },
            { value: "<7.000", label: "Unidades no Mundo" },
          ],
          price: "20.995€",
          warranty: "18m garantia",
          badgeText: "Apenas 1 disponível no stand!",
          ctaText: "circuitocar.blog",
        }}
      />
    </>
  );
};