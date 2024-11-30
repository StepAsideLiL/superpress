import GenerateFakePostsForm from "./_parts/GenerateFakePostsForm";
import GenerateFakeUserForm from "./_parts/GenerateFakeUserForm";

export default function Page() {
  return (
    <div className="space-y-6">
      <section className="flex items-center gap-2">
        <h1 className="text-2xl">Dev</h1>
      </section>

      <section className="rounded border p-5">
        <h1 className="text-foreground/80">Generate Fake posts and pages</h1>
        <GenerateFakePostsForm />
      </section>

      <section className="rounded border p-5">
        <h1 className="text-foreground/80">Generate Fake Users</h1>
        <GenerateFakeUserForm />
      </section>
    </div>
  );
}
