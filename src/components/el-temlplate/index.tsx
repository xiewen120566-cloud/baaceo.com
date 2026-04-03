"use client";
import { forwardRef, useEffect } from "react";

interface AdTemplateProps {
  id: string;
  className?: string;
  adUnitPath?: string;
  sizes?: [number, number] | Array<[number, number]>;
  "data-ad-client"?: string;
  "data-ad-slot"?: string;
  "data-ad-format"?: string;
  "data-full-width-responsive"?: boolean | string;
  "data-ad-channel"?: string;
  style?: React.CSSProperties;
  channelId?: string;
}

const ElTemplate = forwardRef<HTMLDivElement, AdTemplateProps>(function AdTemplate(props, ref) {
  const { id, className, adUnitPath, sizes, style } = props;

  useEffect(() => {
    const w = window as unknown as {
      googletag?: { cmd: Array<() => void> } & Record<string, unknown>;
      __gptDefinedSlots?: Record<string, boolean>;
      __gptServicesEnabled?: boolean;
    };

    w.googletag = w.googletag || { cmd: [] };
    w.googletag.cmd.push(() => {
      const googletag = w.googletag as any;
      w.__gptDefinedSlots = w.__gptDefinedSlots || {};
      if (!w.__gptDefinedSlots[id]) {
        const slot = googletag.defineSlot(
          adUnitPath ?? "/23319049762/ad-2",
          sizes ?? [320, 100],
          id
        );
        if (slot) {
          slot.addService(googletag.pubads());
        }
        w.__gptDefinedSlots[id] = true;
      }

      if (!w.__gptServicesEnabled) {
        const pubads = googletag.pubads();
        if (pubads && typeof pubads.enableSingleRequest === "function") {
          pubads.enableSingleRequest();
        }
        if (pubads && typeof pubads.collapseEmptyDivs === "function") {
          pubads.collapseEmptyDivs(true);
        }
        googletag.enableServices();
        w.__gptServicesEnabled = true;
      }

      googletag.display(id);
    });
  }, [adUnitPath, id, sizes]);

  return (
    <div className="ad-placeholder" style={{ textAlign: "center", paddingBlock: 12, minHeight: 90 }}>
      <div
        id={id}
        ref={ref}
        className={["gpt-slot", className].filter(Boolean).join(" ")}
        style={style}
      />
    </div>
  );
});

export default ElTemplate;
