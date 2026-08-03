"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/** Entfernt den Cloudflare-Image-Resizing-Präfix → rohe R2-URL. Die lädt ohne
 *  Transform-Cold-Start zuverlässig (z. B. beim allerersten Aufruf einer frischen
 *  Domain, wenn mehrere große Transforms gleichzeitig angefragt werden). */
function rawR2(src: string): string {
  return src.replace(/\/cdn-cgi\/image\/[^/]+\//, "/");
}

/**
 * next/image mit onError-Fallback: Schlägt die transformierte CF-Image-URL fehl,
 * wird einmalig auf die untransformierte R2-URL umgeschaltet. So gibt es keine
 * kaputten Bilder im Ersteindruck, falls das Image-Resizing kurz hakt.
 * (Template-Seiten rendern eine statische src → kein Reset-Effekt nötig.)
 */
export function SafeImage({ src, alt, unoptimized, ...rest }: ImageProps) {
  const initial = typeof src === "string" ? src : "";
  const [current, setCurrent] = useState(initial);
  const [fellBack, setFellBack] = useState(false);

  return (
    <Image
      {...rest}
      alt={alt}
      src={current || src}
      // Roh-Fallback lädt direkt aus R2 → kein Transform nötig.
      unoptimized={unoptimized || fellBack}
      onError={() => {
        if (!fellBack && current.includes("/cdn-cgi/image/")) {
          setFellBack(true);
          setCurrent(rawR2(current));
        }
      }}
    />
  );
}
