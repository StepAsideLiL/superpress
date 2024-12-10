import { Provider as EditorProvider } from "jotai";
import Image from "next/image";
import fetch from "@/lib/fetchers";
import {
  SaveButton,
  ToggleComponentsSidebar,
  ToggleSettingsSidebar,
} from "./ui/btns";
import ComponentsSidebar from "./ui/ComponentsSidebar";
import SettingsSidebar from "./ui/SettingsSidebar";

export default async function Editor({ postId }: { postId: string }) {
  const post = await fetch.post.getPostsForEdit(postId);

  if (!post) {
    return (
      <main>
        <div className="p-10">
          <h1 className="text-center text-xl text-muted-foreground">
            Post not found.
          </h1>
        </div>
      </main>
    );
  }

  return (
    <EditorProvider>
      <main className="flex h-screen max-h-screen flex-col overflow-hidden">
        <section className="flex h-16 w-full items-center justify-between gap-2 border-b">
          <div className="flex items-center gap-2">
            <div className="grid size-16 place-content-center bg-foreground">
              <Image
                src="/sp-logo.png"
                alt="SuperPress Logo"
                width={40}
                height={40}
              />
            </div>
            <ToggleComponentsSidebar />
          </div>

          <div className="w-96 rounded bg-muted px-2 py-1 text-sm text-muted-foreground">
            <h2 className="text-center">
              {post.title.length < 30
                ? post.title
                : `${post.title.slice(0, 30)}...`}{" "}
              &bull; <span className="capitalize">{post.post_type}</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 pr-2">
            <ToggleSettingsSidebar />
            <SaveButton />
          </div>
        </section>

        <section className="flex-1 overflow-hidden">
          <div className="flex h-full">
            <ComponentsSidebar />

            <section className="flex-1 overflow-auto">
              <div>Main Editor</div>
            </section>

            <SettingsSidebar />
          </div>
        </section>
      </main>
    </EditorProvider>
  );
}