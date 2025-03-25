import IRemoteData from "@/interfaces/remote-data";
import ISectionBanner from "@/interfaces/section-banner";
import ISectionHeader from "@/interfaces/section-header";
import axios from "axios";


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
      }
    }).filter(Boolean);
  }
}