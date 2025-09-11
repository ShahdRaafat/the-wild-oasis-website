import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};
async function Page() {
  const session = await auth();
  const firstName = session.user.name.split(" ").at(0);
  return (
    <h2 className="font-semibold text-accent-400 text-2xl mb-7">
      Welcome, {firstName}
    </h2>
  );
}

export default Page;
