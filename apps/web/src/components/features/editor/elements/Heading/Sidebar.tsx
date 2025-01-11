import { EditorElementType } from "../../libs/types";
import Typography from "../../components/edit-element/Typography";
import Padding from "../../components/edit-element/Padding";
import Margin from "../../components/edit-element/Margin";
import Border from "../../components/edit-element/Border";
import BorderRadius from "../../components/edit-element/BorderRadius";

export default function Sidebar({ element }: { element: EditorElementType }) {
  return (
    <>
      <Typography element={element} />

      <Padding element={element} />

      <Margin element={element} />

      <Border element={element} />

      <BorderRadius element={element} />
    </>
  );
}
