import Link from "next/link";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <header>
        <div className="mx-auto flex p-5 justify-center">
          <Link
            href="/"
            className="text-center text-xl text-gray-600 font-bold"
          >
            <div>しりとりゲーム</div>
          </Link>
        </div>
      </header>
      <div className="flex h-screen">
        <main className="bg-slate-50 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};
export default MainLayout;
