import { Separator } from "@/components/ui/separator";
import SetupAdminForm from "./_parts/SetupAdminForm";

export default function Page() {
  return (
    <main className="container mx-auto py-4">
      <div className="mx-auto max-w-2xl space-y-3 border p-4">
        <div className="space-y-2">
          <h1 className="text-2xl">Welcome</h1>
          <Separator orientation="horizontal" />
          <p className="text-muted-foreground/80">
            Welcome to SuperPress. This is the very first visit on this site.
            You have to set up some imformation before you can start working.
          </p>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl">Site and Admin Information</h1>
          <Separator orientation="horizontal" />
          <p className="text-muted-foreground/80">
            Fill up the form below to set up your site and admin account.
          </p>
        </div>

        <SetupAdminForm />
      </div>
    </main>
  );
}
