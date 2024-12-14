import React from "react";
import { EditorElement } from "./store";
import EditableElement from "../components/EditableElement";

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
      if (type === "li") {
        return React.createElement(
          type,
          { key: id, style, className },
          content
        );
      }

      return (
        <EditableElement key={id} element={element}>
          {React.createElement(type, { key: id, style, className }, content)}
        </EditableElement>
      );
    }

    // If content is an array, recursively render children
    if (Array.isArray(content)) {
      if (type === "li") {
        return React.createElement(
          type,
          { key: id, style, className },
          renderHtmlForEditor(content)
        );
      }

      return (
        <EditableElement key={id} element={element}>
          {React.createElement(
            type,
            { key: id, style, className },
            renderHtmlForEditor(content)
          )}
        </EditableElement>
      );
    }

    return null;
  });
};
