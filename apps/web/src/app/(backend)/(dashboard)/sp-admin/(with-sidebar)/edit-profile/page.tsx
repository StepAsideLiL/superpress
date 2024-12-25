import fetch from "@/lib/fetchers";
import ProfileEditForm from "./_parts/ProfileEditForm";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const userId = (await searchParams).id;

  const user = await fetch.user.getUserProfileForEditByAdmin(userId);

  if (!user) {
    return <h1 className="text-center">User not found.</h1>;
  }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl">Edit Profile: {user.username}</h1>
      </section>

      <section>
        <ProfileEditForm user={user} />
      </section>
    </div>
  );
}
