import Image from "next/image";

interface Logo {
  height: number; // e.g., 100 (px)
}

export default function Logo({ height }: Logo) {
  const logoHeight = height; // Logo height in px
  const logoWidth = logoHeight * (180 / 60); // Assuming original logo is 180x60

  const textSize = height * 1.3; // Adjust as needed for proportionality

  return (
    <section className="flex items-center gap-" style={{ height }}>
      <Image src="/logo.png" alt="Logo" width={logoWidth} height={logoHeight} />
      <h1 style={{ fontSize: `${textSize}px` }}>
        SEA <span className="text-orange-400">Cat</span>ering
      </h1>
    </section>
  );
}
