import Header from '@/components/nav/Header';

// @ts-ignore
const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="py-3">{children}</main>
    </div>
  );
};

export default MainLayout;
