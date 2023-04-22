import './globals.css';
import { Raleway } from 'next/font/google';
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' });
import UserContextProvider from './context/userContext';

export const metadata = {
  title: 'Taste-it',
  description: 'Manage all your tasting events in one place',
};

export default function RootLayout({ children }) {
  return (
    <html
      className={`${raleway.variable} font-tst bg-tst-bg text-pri`}
      lang='en'
    >
      <body>
        <UserContextProvider>{children}</UserContextProvider>
      </body>
    </html>
  );
}
