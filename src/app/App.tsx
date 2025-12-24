import { FirstPage } from '@/pages/FirstPage';
import { SecondPage } from '@/pages/SecondPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { PutBidPage } from '@/pages/PutBidPage';
import { WorkStagesPage } from '@/pages/WorkStagesPage';
import { WorksPage } from '@/pages/WorksPage';
import { OurClientsPage } from '@/pages/OurClientsPage';
import { AboutCompanyPage } from '@/pages/AboutCompanyPage';
import { ClientWordsPage } from '@/pages/ClientWordsPage';
import { BanksPage } from '@/pages/BanksPage';
import { NavigationBar } from '@/widgets/NavigationBar';

function App() {
  return (
    <>
      <div className={'app'}>
        <FirstPage />
        <SecondPage />
        <GalleryPage />
        <PutBidPage />
        <WorkStagesPage />
        <WorksPage />
        <OurClientsPage />
        <ClientWordsPage />
        <BanksPage />
        <AboutCompanyPage />
        <NavigationBar position='bottom' />
      </div>
    </>
  );
}

export default App;
