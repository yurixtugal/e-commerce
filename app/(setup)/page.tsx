
import { currentProfile } from "@/lib/current-profile"
import initialProfile from "@/lib/initial-profile";
import { redirectToSignIn, useUser } from "@clerk/nextjs"

export default async function setUp() {

  const user = await initialProfile();

  

  return (
    <div>Hola {user.name} crea un store pe papu</div>
  )
}
