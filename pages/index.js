import dynamic from 'next/dynamic';
const MainPage = dynamic(() => import("../components/MainPage/MainPage"));

import { motion } from "framer-motion";
import { routerAnimation } from "../utils/animations";


export default function Home() {
  return (
    <motion.div
      variants={routerAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <MainPage />
    </motion.div>
  );
}
