import { FirstPage } from '@/pages/FirstPage';
import { SecondPage } from '@/pages/SecondPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { PutBidPage } from '@/pages/PutBidPage';

function App() {
  return (
    <>
      <div className={'app'}>
        <FirstPage />
        <SecondPage />
        <GalleryPage />
        <PutBidPage />
      </div>
    </>
  );
}

export default App;
