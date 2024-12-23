import { Provider as EditorProvider } from "jotai";
import Image from "next/image";
import {
  SaveButton,
  ToggleComponentsSidebar,
  ToggleSettingsSidebar,
} from "./components/editor-ui/btns";
import ComponentsSidebar from "./components/ComponentsSidebar";
import SettingsSidebar from "./components/SettingsSidebar";
import EditorBody from "./EditorBody";
import Link from "next/link";
import SetDataInJotai from "./components/SetDataInJotai";
import ViewElementJsonData from "./components/ViewElementJsonData";
import { PostForEditType } from "@/lib/types";
import PostTitle from "./components/PostTitle";

export default async function Editor({ post }: { post: PostForEditType }) {
  return (
    <EditorProvider>
      <SetDataInJotai post={post} />

      <main className="flex h-screen max-h-screen flex-col overflow-hidden">
        <section className="flex h-16 w-full items-center justify-between gap-2 border-b">
          <div className="flex items-center gap-2">
            <Link
              href={`/sp-admin/posts?post_type=${post.postType}`}
              className="grid size-16 place-content-center bg-foreground"
            >
              <Image
                src="/sp-logo.png"
                alt="SuperPress Logo"
                width={40}
                height={40}
              />
            </Link>
            <ToggleComponentsSidebar />
          </div>

          <PostTitle />

          <div className="flex items-center gap-2 pr-2">
            <ViewElementJsonData />
            <ToggleSettingsSidebar />
            <SaveButton />
          </div>
        </section>

        <section className="flex h-[calc(100vh-4rem)] flex-1">
          <ComponentsSidebar />

          <EditorBody />

          <SettingsSidebar />
        </section>
      </main>
    </EditorProvider>
  );
}
