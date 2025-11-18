import "../styles/globals.scss";
import { ThemeProvider } from '../contexts/ThemeContext';
import { Geist, Geist_Mono } from 'next/font/google';

const geist = Geist({
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
})


export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <div className={geist.className}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
