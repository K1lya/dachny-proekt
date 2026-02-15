import { SecondPage } from './SecondPage';
import { WorkStagesPage } from './WorkStagesPage';
import { WorksPage } from './WorksPage';
import { NavigationBar } from '../../widgets/NavigationBar';
import { FirstPage } from './FirstPage';
import { GalleryPage } from './GalleryPage';
import { PutBidPage } from './PutBidPage';
import { OurClientsPage } from './OurClientsPage';
import { ClientWordsPage } from './ClientWordsPage';
import { BanksPage } from './BanksPage';
import { AboutCompanyPage } from './AboutCompanyPage';

const Main = () => {
  return (
    <div className='app'>
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
  );
};

export default Main;
