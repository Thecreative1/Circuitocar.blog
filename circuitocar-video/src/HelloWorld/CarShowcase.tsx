import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import React from "react";

type CarSpec = {
  value: string;
  label: string;
};

type CarShowcaseProps = {
  imageSrc: string;
  brand: string;
  year: string;
  model: string;
  subtitle: string;
  mileage: string;
  edition: string;
  specs: CarSpec[];
  price: string;
  warranty: string;
  badgeText: string;
  ctaText: string;
  accentColor?: string;
};

const AnimatedText: React.FC<{
  children: React.ReactNode;
  delay: number;
  direction?: "left" | "up";
  style?: React.CSSProperties;
}> = ({ children, delay, direction = "up", style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 160 } });
  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
  const transform = direction === "left"
    ? `translateX(${interpolate(progress, [0, 1], [-80, 0])}px)`
    : `translateY(${interpolate(progress, [0, 1], [50, 0])}px)`;
  return <div style={{ opacity, transform, ...style }}>{children}</div>;
};

const LightStreak: React.FC<{ delay: number; top: string; opacity: number }> = ({ delay, top, opacity }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const x = interpolate(progress, [0, 1], [-200, 1300]);
  return (
    <div style={{ position: "absolute", top, left: 0, width: "100%", height: 2, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: 0, left: x, width: 300, height: 2, background: "linear-gradient(to right, transparent, rgba(245,196,0,0.9), transparent)", filter: "blur(1px)", opacity }} />
    </div>
  );
};

const UrgencyBadge: React.FC<{ frame: number; fps: number; accent: string; text: string }> = ({ frame, fps, accent, text }) => {
  const scale = spring({ frame: frame - 200, fps, config: { damping: 8, stiffness: 200 }, from: 0, to: 1 });
  const opacity = interpolate(frame, [200, 215], [0, 1], { extrapolateRight: "clamp" });
  const pulse = 1 + Math.sin(frame * 0.2) * 0.04;
  return (
    <div style={{ opacity, transform: `scale(${scale * pulse})`, display: "flex", alignItems: "center", gap: 12, backgroundColor: "rgba(220,30,30,0.15)", border: `2px solid ${accent}`, borderRadius: 100, padding: "12px 28px", alignSelf: "flex-start", boxShadow: `0 0 20px ${accent}33` }}>
      <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }} />
      <p style={{ color: accent, fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: 1 }}>{text}</p>
    </div>
  );
};

export const CarShowcase: React.FC<CarShowcaseProps> = ({
  imageSrc,
  brand,
  year,
  model,
  subtitle,
  mileage,
  edition,
  specs,
  price,
  warranty,
  badgeText,
  ctaText,
  accentColor = "#F5C400",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgScale = interpolate(frame, [0, 270], [1.25, 1.0], { extrapolateRight: "clamp" });
  const imgOpacity = interpolate(frame, [0, 35], [0, 1], { extrapolateRight: "clamp" });
  const gradientOpacity = interpolate(frame, [40, 110], [0, 1], { extrapolateRight: "clamp" });
  const logoOpacity = interpolate(frame, [20, 45], [0, 1], { extrapolateRight: "clamp" });
  const lineW = interpolate(frame, [105, 140], [0, 100], { extrapolateRight: "clamp" });

  const spec1Scale = spring({ frame: frame - 135, fps, config: { damping: 12, stiffness: 180 }, from: 0, to: 1 });
  const spec2Scale = spring({ frame: frame - 150, fps, config: { damping: 12, stiffness: 180 }, from: 0, to: 1 });
  const spec3Scale = spring({ frame: frame - 165, fps, config: { damping: 12, stiffness: 180 }, from: 0, to: 1 });

  const priceOpacity = interpolate(frame, [178, 200], [0, 1], { extrapolateRight: "clamp" });
  const priceScale = spring({ frame: frame - 178, fps, config: { damping: 8, stiffness: 120 }, from: 0.5, to: 1 });

  const ctaOpacity = interpolate(frame, [230, 250], [0, 1], { extrapolateRight: "clamp" });
  const ctaScale = spring({ frame: frame - 230, fps, config: { damping: 10, stiffness: 160 }, from: 0.7, to: 1 });
  const ctaPulse = 1 + Math.sin(frame * 0.15) * 0.02;

  const infoY = interpolate(frame, [90, 135], [350, 0], { extrapolateRight: "clamp" });
  const infoOpacity = interpolate(frame, [90, 135], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>

      {/* Car */}
      <AbsoluteFill style={{ transform: `scale(${imgScale})`, transformOrigin: "50% 40%", opacity: imgOpacity }}>
        <img
          src={imageSrc}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
        />
      </AbsoluteFill>

      {/* Gradient */}
      <AbsoluteFill style={{ opacity: gradientOpacity, background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.97) 73%, #000 100%)" }} />

      {/* Light streaks */}
      <LightStreak delay={35} top="32%" opacity={0.8} />
      <LightStreak delay={55} top="33%" opacity={0.4} />
      <LightStreak delay={145} top="58%" opacity={0.6} />

      {/* Side accent */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 7, height: "100%", background: "linear-gradient(to bottom, transparent 0%, #F5C400 20%, #F5C400 80%, transparent 100%)", opacity: logoOpacity }} />

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px 64px 80px" }}>

        {/* Logo */}
        <div style={{ opacity: logoOpacity, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 5, height: 36, backgroundColor: "#F5C400", borderRadius: 3 }} />
          <p style={{ color: "white", fontSize: 30, fontWeight: 800, letterSpacing: 5, textTransform: "uppercase", margin: 0 }}>
            Circuito <span style={{ color: "#F5C400" }}>Car</span>
          </p>
        </div>

        {/* Bottom info */}
        <div style={{ opacity: infoOpacity, transform: `translateY(${infoY}px)`, display: "flex", flexDirection: "column", gap: 22 }}>

          <AnimatedText delay={95} direction="left">
            <p style={{ color: accentColor, fontSize: 24, fontWeight: 700, letterSpacing: 10, textTransform: "uppercase", margin: 0 }}>{brand} · {year}</p>
          </AnimatedText>

          <AnimatedText delay={108} direction="left">
            <h1 style={{ color: "white", fontSize: 108, fontWeight: 900, margin: 0, lineHeight: 0.88, letterSpacing: -2, textShadow: "0 4px 40px rgba(0,0,0,0.8)" }}>
              {model}
            </h1>
          </AnimatedText>

          <div style={{ height: 3, backgroundColor: "#F5C400", width: `${lineW}%`, borderRadius: 2, boxShadow: "0 0 16px rgba(245,196,0,0.7)" }} />

          <AnimatedText delay={120} direction="up">
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 26, margin: 0, letterSpacing: 2, fontWeight: 300 }}>{mileage} · {subtitle}</p>
          </AnimatedText>

          {/* Specs */}
          <div style={{ display: "flex", gap: 14 }}>
            {specs.map((spec, index) => (
              <div key={spec.label} style={{ transform: `scale(${specScales[index]})`, flex: 1, background: "linear-gradient(135deg, rgba(245,196,0,0.15), rgba(245,196,0,0.05))", border: `1px solid ${accentColor}80`, borderRadius: 18, padding: "20px 10px", textAlign: "center" }}>
                <p style={{ color: accentColor, fontSize: 36, fontWeight: 900, margin: 0 }}>{spec.value}</p>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 17, margin: "6px 0 0" }}>{spec.label}</p>
              </div>
            ))}
          </div>

          {/* Price */}
          <div style={{ opacity: priceOpacity, transform: `scale(${priceScale})`, transformOrigin: "left center", display: "flex", alignItems: "baseline", gap: 20 }}>
            <p style={{ color: "white", fontSize: 96, fontWeight: 900, margin: 0, lineHeight: 1, letterSpacing: -3 }}>{price}</p>
            <div style={{ backgroundColor: "rgba(245,196,0,0.2)", border: `1px solid ${accentColor}`, borderRadius: 50, padding: "6px 20px" }}>
              <p style={{ color: accentColor, fontSize: 20, fontWeight: 700, margin: 0 }}>✓ {warranty}</p>
            </div>
          </div>

          {/* Urgency */}
          <UrgencyBadge frame={frame} fps={fps} accent={accentColor} text={badgeText} />

          {/* CTA */}
          <div style={{ opacity: ctaOpacity, transform: `scale(${ctaScale * ctaPulse})`, background: `linear-gradient(135deg, ${accentColor}, #e6b800)`, borderRadius: 100, padding: "30px 0", textAlign: "center", boxShadow: `0 8px 40px ${accentColor}44` }}>
            <p style={{ color: "#000", fontWeight: 900, fontSize: 32, textTransform: "uppercase", letterSpacing: 6, margin: 0 }}>{ctaText}</p>
          </div>

        </div>
      </AbsoluteFill>

      {/* Audio */}
      <Audio src={staticFile("anton_vlasov-trailer-sport-stylish-16073.mp3")} volume={0.4} />
<Audio src={staticFile("dragon-studio-simple-whoosh-02-433006.mp3")} startFrom={88} volume={0.7} />
<Audio src={staticFile("bryansantosbreton-biodynamic-impact-braam-tonal-dark-184276.mp3")} startFrom={178} volume={0.9} />

    </AbsoluteFill>
  );
};