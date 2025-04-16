import React from 'react';

interface SectionsTitleProps {
  title: React.ReactNode | string;
  subtitle?: React.ReactNode | string;
  leftAligned?: boolean;
}

const SectionsTitle: React.FC<SectionsTitleProps> = ({ title, subtitle, leftAligned = false }) => {

  return (
    <div>
      {title && (
        <div dangerouslySetInnerHTML={{ __html: title }} />
      )}

      <hr className={`w-[65px] h-[3px] ${!leftAligned ? 'mx-auto' : ''} my-[22px] bg-[#C02031]`} />

      {subtitle && (
        <div dangerouslySetInnerHTML={{ __html: subtitle }} />
      )}
    </div>
  );
};

export default SectionsTitle;