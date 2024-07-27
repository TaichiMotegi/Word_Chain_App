import Link from "next/link";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <header className="bg-gray-700">
        <div className="mx-auto flex p-5 justify-center">
          <Link href="/" className="text-center text-xl text-white font-bold">
            <div>しりとりゲーム</div>
          </Link>
        </div>
      </header>
      <div className="flex flex-col h-screen bg-slate-50">
        <main>{children}</main>
        <footer className="absolute inset-x-0 bottom-0 py-3 flex items-center">
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
    </div>
  );
};
export default MainLayout;
