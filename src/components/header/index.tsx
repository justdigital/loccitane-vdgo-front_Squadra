import React from 'react';
import Image from 'next/image';
import css from './style.module.scss';
import LoginIcon from '@mui/icons-material/Login';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className={`container flex flex-row md:justify-center items-center md:items-end justify-between ${css.container}`}>
      <Image src="/assets/images/mock/logo-loccitane.svg" className={css['logo-locci']} width={221} height={50} alt="Loccitane" />

      <div className={`${css['icon-buttons']}`}>
        <ul className='flex space-between items-center'>
          <li className={`${css['login']}`}>
            <a href={''} target="_blank" className='flex items-center gap-2'>
              <span className={`${css['login-text']}`}>
                <span>Lo</span>gin
              </span>
              <LoginIcon />
              {/* <Image src="/assets/images/icons/whatsapp.svg" alt="Whatsapp" width={37} height={37} /> */}
            </a>
            </li>
          {/* <li className="whatsapp"><a href={''} target="_blank"><Image src="/assets/images/icons/whatsapp.svg" alt="Whatsapp" width={37} height={37} /></a></li> */}
          {/* <li className={css.chat}><a href={''} target="_blank"><Image src="/assets/images/icons/chat.svg" alt="Chat" width={24} height={24} /></a></li> */}
        </ul>
      </div>
    </div>
  );
};

export default Header;