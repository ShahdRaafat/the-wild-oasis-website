import { auth } from "@/app/_lib/auth";
import NavigationClient from "./NavigationClient";

async function Navigation() {
  const session = await auth();
  return <NavigationClient session={session} />;
}
export default Navigation;
