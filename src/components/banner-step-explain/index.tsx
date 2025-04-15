"use client";

import ISectionBannerStepExplain from "@/interfaces/section-banner-step-explain";
import css from "./styles.module.scss";
import Image from "next/image";
import React from "react";
import useWindowWidth from "@/hooks/useWindowWidth";

const BannerStepExplain = (props: {
  sectionData: ISectionBannerStepExplain
}) => {
  const { sectionData } = props;
  const windowWidth = useWindowWidth() || 0;

  const whiteBoxWith = {
    1280: "50.5vw",
    1366: "47.5vw",
    1920: "36vw",
  }

  return (
    <div className="banner-step-explain pb-[40px] bg-[#F6F7F7] flex flex-col lg:flex-row justify-start items-center">
      <div className="lg:w-5/12 w-full">
        <Image src={sectionData.imagesUrls.desktop} alt="image-banner" width={375} height={320} className="w-full h-auto" />
      </div>
      <div className="lg:w-[53%] w-full relative"
        style={{
          width: 
            windowWidth < 1024 ? "auto"
              : windowWidth <= 1280 ? whiteBoxWith["1280"]
                : windowWidth <= 1366 ? whiteBoxWith["1366"]
                  : whiteBoxWith["1920"],
        }}>
        <div className="flex flex-col absolute justify-center items-center lg:items-start m-auto w-[85vw] lg:w-[107%] h-[50vh] lg:h-auto top-[-46vh] left-[10vw] lg:top-0 mb-4 lg:relative lg:left-[-40px] border-[3px] border-[#C02031]">
          <div className={`${css['banner-text-content']} p-[10px_14px_18px] mt-auto lg:p-9 bg-white w-full`} dangerouslySetInnerHTML={{ __html: sectionData.text }} />
        </div>
        <div className="px-4 pt-[3rem] lg:max-w-[47.5vw] lg:px-0 lg:pt-0 flex flex-row justify-end gap-12">
          {sectionData.cardItems.map((item) => (
            <div key={item.id + item.text} className="lg:w-36 flex flex-col gap-4">
              <div>
                <Image src={item.imageUrl} alt="image-card" width={62} height={44} />
              </div>
              <div dangerouslySetInnerHTML={{ __html: item.text }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BannerStepExplain;