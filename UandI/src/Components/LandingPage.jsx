import { useState, useEffect } from 'react';
import MainAnimation from '../assets/Animations/MainAnimation.json';
import Lottie from 'lottie-react';
import LoginPage from './LoginPage';
import '@fontsource/montserrat';
import FooterComponent from './Footer';
function LandingPage() {
  const [displayAnimation, setDisplayAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayAnimation(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {displayAnimation ? (
        <div className="flex justify-center items-center w-full h-full">
          <Lottie animationData={MainAnimation} className="h-full w-full" />
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <header className="w-full bg-[#cb0100] text-white py-4 text-center">
            <div style={{ fontFamily: 'Montserrat' }} className="text-3xl font-bold">
              U&I Learning Management System
            </div>
          </header>
          <main className="flex flex-col flex-1 justify-center items-center">
            <div className="text-center mt-4 w-full max-w-sm">
              <LoginPage />
            </div>
          </main>
          <footer className='mt-28'>
            <FooterComponent/>
          </footer>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
