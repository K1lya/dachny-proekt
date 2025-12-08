import { FirstPage } from '@/pages/FirstPage';
import { SecondPage } from '@/pages/SecondPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { PutBidPage } from '@/pages/PutBidPage';
import { WorkStagesPage } from '@/pages/WorkStagesPage';
import { WorksPage } from '@/pages/WorksPage';

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
      </div>
    </>
  );
}

export default App;
