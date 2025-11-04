import { Footer } from "../UI/Footer"
import { Header } from "../UI/Header"
import { Outlet } from "react-router-dom"

export const AppLayout =()=>{
    return (
         <div className="min-h-screen flex flex-col bg-[#CFBABA] dark:bg[#CFBABA]">
      <Header />
        <Outlet />
      <Footer />
    </div>
    )
}

// className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900"
// VITE_BG=E4D2D2
//VITE_BG2 = CFBABA
//VITE_BBG=AB7272
//VITE_BBG_HOVER=834E4E
//VITE_HEADING_TEXT=100A0A
//VITE_TEXT=2D1B1B