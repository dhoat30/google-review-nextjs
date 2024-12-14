// app/dashboard/page.tsx

import Header from "../../components/UI/Header/Header";
import DashboardHeading from "../../components/UI/Headings/DashboardHeading";
import BusinessCards from '../../components/UI/BusinessCards/BusinessCards';

export default async function Page() {

  return (
    <>
      <main className="dashboard-container">
        <Header />
        <section className="dashboard-main ">
          <DashboardHeading title="Dashboard" className="mt-40" />
          <div className="max-width-xl mt-40">
           <BusinessCards /> 
          </div> 
        </section>
      </main>
    </>
  );

} 



