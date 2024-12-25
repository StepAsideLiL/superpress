import fetch from "@/lib/fetchers";
import ProfileUpdateForm from "./_parts/ProfileUpdateForm";

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
          <ProfileUpdateForm user={user} />
        )}
      </section>
    </div>
  );
}
