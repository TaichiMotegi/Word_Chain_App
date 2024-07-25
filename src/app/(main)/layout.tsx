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
      <div className="flex h-screen">
        <main className="bg-slate-50 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};
export default MainLayout;
