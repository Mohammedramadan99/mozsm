import { Inter } from '@next/font/google'
import dynamic from 'next/dynamic';
const MainPage = dynamic(() => import("../components/MainPage/MainPage"));


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <MainPage />
    </>
  );
}
