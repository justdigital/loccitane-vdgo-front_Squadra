import IRemoteData from "@/interfaces/remote-data";
import ISectionBanner from "@/interfaces/section-banner";
import ISectionHeader from "@/interfaces/section-header";
import ISectionLargeVideo from "@/interfaces/section-video";
import ISectionVerticalRectangularCard from "@/interfaces/section-vertical-rectangular-card";
import ISectionBannerEmpreender from "@/interfaces/section-banner-empreender";
import ISectionTestimonials from "@/interfaces/section-testimonials";
import ISectionFooter from "@/interfaces/section-footer";
import ISectionHorizontalCards from "@/interfaces/section-horizontal-cards";
import ISectionAccordion from "@/interfaces/section-accordion";
import ISectionTermsAndConditions from "@/interfaces/section-terms-and-conditions";
export default class DrupalService {

  private baseApiUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL;

  constructor(private endpoint: string) {
    
  }

  fetchData = async (): Promise<IRemoteData> => {
    const response = await fetch(`${this.baseApiUrl}${this.endpoint}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Basic ${process.env.NEXT_PUBLIC_DRUPAL_AUTH}`
      }
    })

    const data = await response.json();
    // console.log('await response.json(2)', data)
    
    return {
      sections: this.getSections(data?.sections || [])
    }
  }

  getSections = (sections: any[]) : any[] => {
    // console.log('sections', sections);

    return sections.map((section: any) => {
      switch (section.type) {
        case 'banner':
          return {
            type: section.type,
            text: section.text,
            imagesUrls: {
              desktop: section.image_url_desktop,
              mobile: section.image_url_mobile
            }
          } as ISectionBanner;

        case 'section_header':
          return {
            type: section.type,
            logoImageTitle: section.link_title,
            logoLinkUrl: section.link_url,
            logoImagesUrls: {
              desktop: section.image_url_desktop,
              mobile: section.image_url_mobile
            },
            loginLink: section.logo_item[0].link_url,
            loginLinkIconUrl: section.logo_item[0].image_url,
            loginLinkTitle: section.logo_item[0].link_title,
          } as ISectionHeader;

        case 'secao_card_retangular_horizontal':
          return {
            type: section.type,
            title: section.text,
            subtitle: section.text_description,
            cardItems: section.card_item.map((item: any) => ({
              cardTypeImage: item.card_type === "1",
              text: item.text,
              linkUrl: item.link_url,
              linkTitle: item.link_title,
              iconUrl: item.image_icone_url,
              videosUrls: {
                urlDesktop: item.video_url_desktop,
                urlMobile: item.video_url_mobile,
                altText: item.text_transcription || '',
              },
              imagesUrls: {
                desktop: item.image_url_desktop,
                mobile: item.image_url_mobile
              }
            }))
          } as ISectionHorizontalCards;

        case 'video':
          return {
            type: section.type,
            text: section.text,
            textTranscription: section.text_transcription,
            videosUrls: {
              urlDesktop: section.video_url_desktop,
              urlMobile: section.video_url_mobile,
              altText: section.text_transcription || '',
              posterImage: section.poster_image || ''
            }
          } as ISectionLargeVideo;

        case 'vertical_rectangular_card_sectio':
          return {
            type: section.type,
            text: section.text,
            imagesUrls: {
              desktop: section.image_url_desktop,
              mobile: section.image_url_mobile
            },
            cardItems: section.card_item.map((item: any) => ({
              text: item.text,
              iconUrl: item.image_icone_url,
              linkUrl: item.link_url,
              linkTitle: item.link_title,
              imagesUrls: {
                desktop: item.image_url_desktop,
                mobile: item.image_url_mobile
              }
            })),
            buttonLink: section.link_url,
            buttonLinkTitle: section.link_title,
          } as ISectionVerticalRectangularCard;

        case 'newsletter':
          return {
            type: section.type,
            text: section.text,
            imagesUrls: {
              desktop: section.image_url_desktop,
              mobile: section.image_url_mobile
            },
            buttonLink: section.link_url,
            buttonLinkTitle: section.link_title,
          } as ISectionBannerEmpreender;

        case 'comentarios':
            return {
              type: section.type,
              text: section.text,
              cardItems: section.card_item.map((item: any) => ({
                text: item.text,
                qualification: item.qualification,
                textName: item.text_name,
                textDate: item.text_date,
                imagesUrls: {
                  desktop: item.image_url,
                  mobile: item.image_url_mobile
                }
              })),
            } as ISectionTestimonials;
        
          case 'section_footer':
            return {
              type: section.type,
              textDescription: section.text_description,
              imagesUrls: {
                desktop: section.image_url_desktop,
                mobile: section.image_url_mobile
              },
              cardItems: section.card_item.map((item: any) => ({
                text: item.text,
                linkTitle: item.link_title,
                imagesUrls: {
                  desktop: item.image_url_desktop,
                  mobile: item.image_url_mobile
                },
                buttonLink: item.link_url,
                buttonLinkTitle: item.link_title,
              })),
              buttonLink: section.link_url,
              buttonLinkTitle: section.link_title,
            } as ISectionFooter;

          case 'accordion':
            return {
              type: section.type,
              text: section.text,
              accordionItem: section.accordion_item.map((item: any) => ({
                title: item.title,
                text: item.text,
              }))
            } as ISectionAccordion;

          case 'section_terms_and_conditions':
            return {
              type: section.type,
              text: section.text,
            } as ISectionTermsAndConditions;

        }
    }).filter(Boolean);
  }
}  