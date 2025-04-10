import Header from '@/components/header';
import Footer from '@/components/footer';
import LargeVideo from '@/components/large-video';
import VerticalRectangularCard from '@/components/vertical-rectangular-card';
import BannerEmpreender from '@/components/banner-empreender';
import Testimonials from '@/components/testimonials';
import HorizontalCardsSection from '@/components/horizontal-cards';
import Accordion from '@/components/accordion';
import LeadsFormBox from '@/components/leads-form-box';
import HorizontalVideosSection from '@/components/horizontal-videos';

export const getPageAvailableSections = (sections: any[]) => {

  const termsAndConditionsSection = sections.find((s) => s.type === 'section_terms_and_conditions');
  const footerSection = sections.find((s) => s.type === 'section_footer');
  const headerSection = sections.find((s) => s.type === 'section_header');
  
  return sections.map((section, index) => {
    switch (section.type) {
      case 'section_header':
        return <Header sectionData={section} key={index} />;
      case 'banner':
        return <LeadsFormBox 
          sectionData={section} 
          termsAndConditionsSectionData={termsAndConditionsSection} 
          headerSectionData={headerSection} 
          footerSectionData={footerSection} 
          key={index}
        />;
      case 'secao_card_retangular_horizontal':
        return <HorizontalCardsSection sectionData={section} key={index} />;
      case 'section_card_video_rectangular_v':
        return <HorizontalVideosSection sectionData={section} key={index} />;
      case 'section_footer':
        return <Footer sectionData={section} key={index} />;
      case 'video':
        return <LargeVideo sectionData={section} key={index} />;
      case 'vertical_rectangular_card_sectio':
        return <VerticalRectangularCard sectionData={section} key={index} />;
      case 'newsletter':
        return <BannerEmpreender sectionData={section} key={index} />;
      case 'comentarios':
        return <Testimonials sectionData={section} key={index} />;
      case 'accordion':
        return <Accordion sectionData={section} key={index} />;
    }
  });
}