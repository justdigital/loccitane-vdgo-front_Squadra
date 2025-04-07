import React from 'react';
import Image from 'next/image';
import css from './style.module.scss';
import ISectionHeader from '@/interfaces/section-header';

interface HeaderProps {
  sectionData: ISectionHeader
}

const Header: React.FC<HeaderProps> = ({sectionData}) => {

  return (
    <div id='header' className={`${css['header-container']}`}>
      <div className={`container relative flex flex-row md:justify-center items-end justify-between`}>
        <Image src={sectionData.logoImagesUrls.desktop} className={css['logo-locci']} width={221} height={50} alt={sectionData.logoImageTitle} />

        <div className={`${css['icon-buttons']}`}>
          <ul className='flex space-between items-center'>
            <li className={`${css['login']}`}>
              <a href={sectionData.loginLink} target="_blank" className='flex items-center gap-2'>
                <span className={`${css['login-text']}`}>
                  <span>{sectionData.loginLinkTitle?.substring(0, 2)}</span>{sectionData.loginLinkTitle?.substring(2)}
                </span>
                {/* <LoginIcon /> */}
                <Image src={sectionData.loginLinkIconUrl} alt="Whatsapp" width={34} height={34} />
              </a>
              </li>
            {/* <li className="whatsapp"><a href={''} target="_blank"><Image src="/assets/images/icons/whatsapp.svg" alt="Whatsapp" width={37} height={37} /></a></li> */}
            {/* <li className={css.chat}><a href={''} target="_blank"><Image src="/assets/images/icons/chat.svg" alt="Chat" width={24} height={24} /></a></li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;