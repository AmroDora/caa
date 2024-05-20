import Footer from "./Footer";
import Navbar from "./Navbar";

export default function RootLayout({ children }) {
  return (
        <div className="w-full">
          <Navbar/>
          {children}
          <Footer/>
        </div>
  );
}
