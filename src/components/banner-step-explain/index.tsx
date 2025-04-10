import ISectionBannerStepExplain from "@/interfaces/section-banner-step-explain";
import css from "./styles.module.scss";
const BannerStepExplain = (props: {
    sectionData: ISectionBannerStepExplain
}) => {
    const { sectionData } = props;

  return (
    <div className="banner-step-explain pb-[40px] bg-[#f7e4d2] flex flex-col lg:flex-row justify-start items-center">
        <div className="lg:w-5/12 w-full">
            <img src={sectionData.imagesUrls.desktop} alt="image-banner" className="w-full h-auto"/>
        </div>
        <div className="lg:w-5/12 w-full relative">
            <div className="flex flex-col absolute justify-center items-center lg:items-start m-auto w-[85vw] lg:w-auto h-[50vh] lg:h-auto top-[-46vh] left-[10vw] lg:top-0 mb-4 lg:relative lg:left-[-32px] border-[3px] border-[#C02031]">
                <div className={`${css['banner-text-content']} p-[0px_14px_18px] mt-auto lg:p-9 bg-white w-full`} dangerouslySetInnerHTML={{ __html: sectionData.text }} />
            </div>
            <div className="px-4 pt-[3rem] lg:px-0 lg:pt-0 flex flex-row justify-end gap-4">
                {sectionData.cardItems.map((item) => (
                    <div key={item.id + item.text} className="lg:w-40 flex flex-col gap-4">
                        <div>
                            <img src={item.imageUrl} alt="image-card"/>
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