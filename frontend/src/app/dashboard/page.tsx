import Dashboard from "@/components/Dashboard";

const Page = async () => {
  // const { getUser } = getKindeServerSession()

  // const user = await getUser()

  // if (!user || !user.email) redirect('/auth-callback?origin=dashboard')


  // const dbUser = await db.user.findFirst({
  //   where: {
  //     id: user.id,
  //   },
  // })

  // if (!dbUser) redirect('/auth-callback?origin=dashboard')

  return (
    <Dashboard />
  );
}

export default Page;
