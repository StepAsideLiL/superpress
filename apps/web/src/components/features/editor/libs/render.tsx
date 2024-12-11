import React from "react";
import { EditorElement } from "./store";
import EditableElement from "../components/editor-ui/EditableElement";

export const renderHtml = (elements: EditorElement[]): React.ReactNode => {
  return elements.map((element) => {
    const { id, type, content, style, className } = element;

    // If content is a string, render it as text
    if (typeof content === "string") {
      return React.createElement(type, { key: id, style, className }, content);
    }

    // If content is an array, recursively render children
    if (Array.isArray(content)) {
      return React.createElement(
        type,
        { key: id, style, className },
        renderHtml(content) // Recursively render children
      );
    }

    return null;
  });
};

export const renderHtmlForEditor = (
  elements: EditorElement[]
): React.ReactNode => {
  return elements.map((element) => {
    const { id, type, content, style, className } = element;

    // If content is a string, render it as text
    if (typeof content === "string") {
      // return React.createElement(type, { key: id, style, className }, content);
      return (
        <EditableElement key={id} id={element.id}>
          <div className="flex flex-col gap-2">
            {React.createElement(type, { key: id, style, className }, content)}
          </div>
        </EditableElement>
      );
    }

    // If content is an array, recursively render children
    if (Array.isArray(content)) {
      // return React.createElement(
      //   type,
      //   { key: id, style, className },
      //   renderHtmlForEditor(content) // Recursively render children
      // );
      return (
        <EditableElement key={id} id={element.id}>
          <div className="flex flex-col gap-2">
            {React.createElement(
              type,
              { key: id, style, className },
              renderHtmlForEditor(content)
            )}
          </div>
        </EditableElement>
      );
    }

    return null;
  });
};
