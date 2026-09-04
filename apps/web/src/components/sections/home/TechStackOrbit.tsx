"use client";

import React from "react";
import clientData from "../../../../../../client.json";

export interface OrbitNodeItem {
  name: string;
  ring?: "center" | "inner" | "middle" | "outer" | string;
  iconType?: "svg" | "image" | string;
  svgCode?: string;
  iconUrl?: string | null;
  color?: string;
  url?: string;
}

export interface TechStackOrbitProps {
  items?: OrbitNodeItem[];
  centerLogoUrl?: string | null;
}

const DEFAULT_ORBIT_ITEMS: OrbitNodeItem[] = (clientData.orbitItems as OrbitNodeItem[]) || [
  { name: clientData.business.name, ring: "center", color: "#FF3DA5" },
  { name: "IVF Treatment", ring: "inner", color: "#FF3DA5" },
  { name: "IUI Insemination", ring: "inner", color: "#1A0B3C" },
  { name: "ICSI Procedure", ring: "inner", color: "#8A7CA8" },
];

export function renderOrbitIconNode(
  item: OrbitNodeItem,
  fallbackLogoUrl?: string | null,
  isCenter: boolean = false
) {
  const isImageMode = item.iconType === "image";
  const isSvgMode = item.iconType === "svg" || !item.iconType;

  // Render Image upload if image mode selected or iconUrl present without svgCode
  if ((isImageMode && item.iconUrl) || (!isSvgMode && item.iconUrl)) {
    return (
      <img
        src={item.iconUrl}
        alt={item.name}
        className={
          isCenter
            ? "w-full h-full object-contain max-w-full max-h-full"
            : "w-5 h-5 sm:w-6 sm:h-6 object-contain rounded-sm"
        }
      />
    );
  }

  // Render SVG code if SVG mode selected or svgCode present
  if (item.svgCode && item.svgCode.trim().length > 0 && isSvgMode) {
    return (
      <span
        className={
          isCenter
            ? "w-full h-full flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full object-contain"
            : "w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full"
        }
        dangerouslySetInnerHTML={{ __html: item.svgCode }}
      />
    );
  }

  // Fallback Image
  const imageSource = item.iconUrl || fallbackLogoUrl;
  if (imageSource) {
    return (
      <img
        src={imageSource}
        alt={item.name}
        className={
          isCenter
            ? "w-full h-full object-contain max-w-full max-h-full"
            : "w-5 h-5 sm:w-6 sm:h-6 object-contain rounded-sm"
        }
      />
    );
  }

  const letter = (item.name || "J").charAt(0).toUpperCase();
  const hexColor = item.color || "#FF3DA5";

  return (
    <span
      className={
        isCenter
          ? "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-sans font-bold text-lg sm:text-xl md:text-2xl shadow-md"
          : "w-5 h-5 sm:w-6 sm:h-6 rounded-button flex items-center justify-center text-white font-sans font-bold text-xs sm:text-sm shadow-xs"
      }
      style={{ backgroundColor: hexColor }}
    >
      {letter}
    </span>
  );
}

export function TechStackOrbit({ items = [], centerLogoUrl }: TechStackOrbitProps) {
  const activeItems = items.length > 0 ? items : DEFAULT_ORBIT_ITEMS;

  const centerItemCandidate = activeItems.find(
    (it) => (it.ring || "").toLowerCase() === "center"
  );
  const centerItem: OrbitNodeItem = centerItemCandidate || {
    name: clientData.business.name,
    ring: "center",
    iconUrl: centerLogoUrl,
    color: "#FF3DA5",
  };

  const ringNodes = activeItems.filter(
    (it) => it !== centerItemCandidate && (it.ring || "").toLowerCase() !== "center"
  );

  const innerNodes = ringNodes.filter((it) => (it.ring || "").toLowerCase() === "inner");
  const middleNodes = ringNodes.filter((it) => (it.ring || "").toLowerCase() === "middle");
  const outerNodes = ringNodes.filter((it) => (it.ring || "").toLowerCase() === "outer");
  const unassignedNodes = ringNodes.filter(
    (it) => !["inner", "middle", "outer"].includes((it.ring || "").toLowerCase())
  );

  const orbitRings: OrbitNodeItem[][] = [[], [], []];

  if (innerNodes.length > 0 || middleNodes.length > 0 || outerNodes.length > 0) {
    orbitRings[0] = [...innerNodes];
    orbitRings[1] = [...middleNodes];
    orbitRings[2] = [...outerNodes];

    unassignedNodes.forEach((node, idx) => {
      orbitRings[idx % 3].push(node);
    });
  } else {
    const itemsPerRing = Math.ceil(ringNodes.length / 3) || 1;
    orbitRings[0] = ringNodes.slice(0, itemsPerRing);
    orbitRings[1] = ringNodes.slice(itemsPerRing, itemsPerRing * 2);
    orbitRings[2] = ringNodes.slice(itemsPerRing * 2);
  }

  const orbitCount = 3;

  return (
    <div className="tech-orbit-container relative w-full max-w-[22rem] sm:max-w-[28rem] lg:max-w-[35rem] xl:max-w-[41rem] 2xl:max-w-[45rem] h-[22rem] sm:h-[28rem] lg:h-[35rem] xl:h-[41rem] 2xl:h-[45rem] flex items-center justify-center overflow-hidden mx-auto lg:ml-auto lg:mr-0 select-none">
      <div className="relative w-[21rem] sm:w-[27rem] lg:w-[34rem] xl:w-[40rem] 2xl:w-[44rem] h-[21rem] sm:h-[27rem] lg:h-[34rem] xl:h-[40rem] 2xl:h-[44rem] flex items-center justify-center shrink-0">
        
        <div className="relative group z-30 cursor-pointer">
          {centerItem.url ? (
            <a
              href={centerItem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-surface border border-border shadow-md flex items-center justify-center transition-transform hover:scale-110 p-2 sm:p-2.5 overflow-hidden"
            >
              {renderOrbitIconNode(centerItem, centerLogoUrl, true)}
            </a>
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-surface border border-border shadow-md flex items-center justify-center transition-transform hover:scale-110 p-2 sm:p-2.5 overflow-hidden">
              {renderOrbitIconNode(centerItem, centerLogoUrl, true)}
            </div>
          )}

          <div className="absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 scale-90 group-hover:scale-100 bg-primary text-white text-xs font-sans font-bold px-3 py-1.5 rounded-button shadow-md whitespace-nowrap">
            {centerItem.name}
          </div>
        </div>

        {[...Array(orbitCount)].map((_, orbitIdx) => {
          const nodesInRing = orbitRings[orbitIdx] || [];
          if (nodesInRing.length === 0) return null;

          const angleStep = (2 * Math.PI) / nodesInRing.length;

          return (
            <div
              key={orbitIdx}
              className="absolute rounded-full border border-dashed border-border"
              style={{
                width: `calc(var(--orbit-base) + var(--orbit-gap) * ${orbitIdx + 1})`,
                height: `calc(var(--orbit-base) + var(--orbit-gap) * ${orbitIdx + 1})`,
                animation: `spin ${16 + orbitIdx * 8}s linear infinite`,
              }}
            >
              {nodesInRing.map((cfg, iconIdx) => {
                const angle = iconIdx * angleStep;
                const x = 50 + 50 * Math.cos(angle);
                const y = 50 + 50 * Math.sin(angle);

                return (
                  <div
                    key={iconIdx}
                    className="absolute group transition-transform hover:z-40"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {cfg.url ? (
                      <a
                        href={cfg.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-surface rounded-full p-2 sm:p-2.5 border border-border shadow-xs flex items-center justify-center transition-all duration-200 hover:scale-115 cursor-pointer"
                        aria-label={cfg.name}
                      >
                        {renderOrbitIconNode(cfg, null, false)}
                      </a>
                    ) : (
                      <div
                        className="bg-surface rounded-full p-2 sm:p-2.5 border border-border shadow-xs flex items-center justify-center transition-all duration-200 hover:scale-115 cursor-pointer"
                        aria-label={cfg.name}
                      >
                        {renderOrbitIconNode(cfg, null, false)}
                      </div>
                    )}

                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 scale-90 group-hover:scale-100 bg-primary text-white text-[11px] font-sans font-semibold px-2.5 py-1 rounded-button shadow-md whitespace-nowrap">
                      {cfg.name}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <style>{`
        .tech-orbit-container {
          --orbit-base: 8.5rem;
          --orbit-gap: 5.6rem;
        }
        @media (min-width: 1024px) {
          .tech-orbit-container {
            --orbit-base: 9.0rem;
            --orbit-gap: 7.2rem;
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default TechStackOrbit;
