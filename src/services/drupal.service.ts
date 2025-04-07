import IRemoteData from "@/interfaces/remote-data";
import ISectionBanner from "@/interfaces/section-banner";
import ISectionHeader from "@/interfaces/section-header";
import ISectionLargeVideo from "@/interfaces/section-video";
import ISectionVerticalRectangularCard from "@/interfaces/section-vertical-rectangular-card";
import ISectionBannerEmpreender from "@/interfaces/section-banner-empreender";
import ISectionComentarios from "@/interfaces/section-comentarios";
import ISectionFooter from "@/interfaces/section-footer";
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

        case 'video':
            return {
              type: section.type,
              text: section.text,
              textTranscription: section.text_transcription,
              videosUrls: {
                urlDesktop: section.video_url_desktop,
                urlMobile: section.video_url_mobile,
                altText: section.alt_text || '',
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
            } as ISectionComentarios;
        
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
                }
              })),
              buttonLink: section.link_url,
              buttonLinkTitle: section.link_title,
            } as ISectionFooter;

        }
    }).filter(Boolean);
  }
}  