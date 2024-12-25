import React from "react";
import NewUserForm from "./_parts/NewUserForm";

export default function Page() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl">Add New User</h1>
        <p>Create a new user account.</p>
      </section>

      <section>
        <NewUserForm />
      </section>
    </div>
  );
}
