// app/layout.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapLoader from '@/app/lib/bootstrap-loader';
import Navbar from './lib/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-black'>
        <BootstrapLoader />
        {/* <Navbar></Navbar> */}
        {children}
      </body>
    </html>
  );
}
