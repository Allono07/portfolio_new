import { Outlet, useLocation } from 'react-router-dom';
import { useKindle } from '../context/KindleContext.js';
import NavigationMenu from './NavigationMenu.js';
import PageTransition from './PageTransition.js';
import SiteFooter from './SiteFooter.js';
import SocialRail from './SocialRail.js';
import StatusBar from './StatusBar.js';

export default function KindleShell() {
  const location = useLocation();
  const { fontScale } = useKindle();
  const isReaderPage =
    location.pathname.startsWith('/blog/') && location.pathname !== '/blog';

  return (
    <div className="app-shell">
      <div className="kindle-screen" style={{ '--font-scale': fontScale }}>
        <StatusBar />
        {!isReaderPage && <NavigationMenu />}

        <main
          className={`screen-content ${isReaderPage ? 'reader-screen' : ''}`}
        >
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>

      <SocialRail />
      <SiteFooter />
    </div>
  );
}
