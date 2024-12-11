// app/dashboard/page.tsx
import SignOutButton from "../../components/UI/Auth/ProviderButtons/SignOutButton";
import Register from "../../components/UI/Auth/Register";
import Header from "../../components/UI/Header/Header";
import { getServerSession } from "next-auth/next";
import { authOptions } from '../../lib/auth';
import { redirect } from 'next/navigation';
import { GetServerSideProps } from 'next';
import DashboardHeading from "../../components/UI/Headings/DashboardHeading";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <main className="dashboard-container">
        <Header />
        <section className="dashboard-main">
          <DashboardHeading title="Dashboard" className="mt-40" />
        </section>
      </main>
    </>
  );

} 



