import Link from "next/link";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-700">
        <div className="mx-auto flex p-5 justify-center">
          <Link href="/" className="text-center text-xl text-white font-bold">
            <div>しりとりソロプレイ！</div>
          </Link>
        </div>
      </header>
      <div className="flex-grow flex flex-col justify-center items-center">
        <main className="w-full flex flex-col justify-center items-center">
          {children}
        </main>
      </div>
      <footer className="w-full flex items-center justify-center p-4">
        <div className="w-full flex justify-center items-center">
          <span className="flex-1 text-end">©Word Chain App</span>
          <span className="px-5 text-center"> | </span>
          <span className="text-center">
            <Link href="https://developer.yahoo.co.jp/sitemap/">
              Web Services by Yahoo! JAPAN
            </Link>
          </span>
          <span className="px-5 text-center"> | </span>
          <span className="flex-1">
            <Link href="https://www.mediawiki.org/wiki/API:Main_page/ja">
              This application uses the MediaWiki API
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
