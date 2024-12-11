import Login from "../../components/UI/Auth/Login";

import SignOutButton from "../../components/UI/Auth/ProviderButtons/SignOutButton";
import Register from "../../components/UI/Auth/Register";
import Header from "../../components/UI/Header/Header";
import { getServerSession } from "next-auth/next";
import { authOptions } from '../../lib/auth';
import { redirect } from 'next/navigation';
import { GetServerSideProps } from 'next';

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return (
    <>
      <Login />
    </>
  );
}

