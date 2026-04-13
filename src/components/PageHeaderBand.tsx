import Image from "next/image";
import type { ReactNode } from "react";

export function PageHeaderBand({
  imageSrc,
  children,
  overlayOpacity = 0.7,
}: {
  imageSrc: string;
  children: ReactNode;
  overlayOpacity?: number;
}) {
  return (
    <div className="relative overflow-hidden">
      <Image
        src={imageSrc}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        quality={80}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(10, 10, 11, ${overlayOpacity})` }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
