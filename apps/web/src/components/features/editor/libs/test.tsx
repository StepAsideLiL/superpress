import React from "react";
import { atom, useAtom } from "jotai";

export type ElementType =
  | "h1"
  | "h2"
  | "h3"
  | "p"
  | "div"
  | "span"
  | "button"
  | "li";

export type EditorElement = {
  id: string;
  type: ElementType;
  content: string | EditorElement[];
  style?: React.CSSProperties;
  className?: string;
};

// Sample data
const sampleDataAtom = atom<EditorElement[]>([
  {
    id: "1",
    type: "div",
    content: [
      {
        id: "1.1",
        type: "h1",
        content: "Welcome to the Page Builder",
        style: { color: "blue", fontSize: "24px" },
      },
      {
        id: "1.2",
        type: "p",
        content: "This is a sample paragraph within a div container.",
        style: { color: "gray", lineHeight: "1.5" },
      },
      {
        id: "1.3",
        type: "button",
        content: "Click Me",
        style: { backgroundColor: "green", color: "white", padding: "10px" },
        className: "custom-button",
      },
    ],
    style: { padding: "20px", border: "1px solid #ddd" },
  },
]);

// Atom to store the selected element ID
const selectedElementIdAtom = atom<string | null>(null);

// Derived atom to find the selected element
const selectedElementAtom = atom(
  (get) => {
    const data = get(sampleDataAtom);
    const selectedId = get(selectedElementIdAtom);
    if (!selectedId) return null;

    const findElement = (elements: EditorElement[]): EditorElement | null => {
      for (const element of elements) {
        if (element.id === selectedId) return element;
        if (Array.isArray(element.content)) {
          const childResult = findElement(element.content as EditorElement[]);
          if (childResult) return childResult;
        }
      }
      return null;
    };

    return findElement(data);
  },
  (get, set, updatedElement: EditorElement) => {
    const data = get(sampleDataAtom);

    const updateElement = (elements: EditorElement[]): EditorElement[] => {
      return elements.map((el) => {
        if (el.id === updatedElement.id) {
          return updatedElement;
        }

        if (Array.isArray(el.content)) {
          return {
            ...el,
            content: updateElement(el.content as EditorElement[]),
          };
        }

        return el;
      });
    };

    const updatedData = updateElement(data);
    set(sampleDataAtom, updatedData);
  }
);

const Editor = () => {
  const [sampleData, setSampleData] = useAtom(sampleDataAtom);
  const [selectedElementId, setSelectedElementId] = useAtom(
    selectedElementIdAtom
  );
  const [selectedElement, setSelectedElement] = useAtom(selectedElementAtom);

  const handleSelect = (id: string) => {
    setSelectedElementId(id);
  };

  const handleChange = (newContent: string) => {
    if (selectedElement) {
      setSelectedElement({
        ...selectedElement,
        content: newContent,
      });
    }
  };

  return (
    <div>
      <h1>Editor</h1>
      <div>
        <h2>Elements</h2>
        {sampleData.map((element) => (
          <div key={element.id}>
            <button onClick={() => handleSelect(element.id)}>
              Select {element.type} (ID: {element.id})
            </button>
          </div>
        ))}
      </div>
      {selectedElement && (
        <div>
          <h2>Edit Element</h2>
          <p>
            Editing {selectedElement.type} (ID: {selectedElement.id})
          </p>
          <textarea
            value={selectedElement.content as string}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default Editor;
