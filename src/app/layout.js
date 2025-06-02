import "./globals.css";

export const metadata = {
  title: "BitTree",
  description: "One link to help you share everything you create",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className='antialiased'>
        {children}
      </body>
    </html>
  );
}
