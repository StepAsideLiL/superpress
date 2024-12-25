import fetch from "@/lib/fetchers";
import ProfileEditForm from "./_parts/ProfileEditForm";

export default async function Page() {
  const user = await fetch.user.getCurrentUserProfile();

  return (
    <div className="space-y-6">
      <section className="flex items-center gap-2">
        <h1 className="text-2xl">Profile</h1>
      </section>

      <section>
        {!user ? (
          <h1 className="text-center">User not found.</h1>
        ) : (
          <ProfileEditForm user={user} />
        )}
      </section>
    </div>
  );
}
