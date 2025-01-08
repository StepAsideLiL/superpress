import React from "react";
import { EditorElementType } from "./types";

export const renderHtml = (elements: EditorElementType[]): React.ReactNode => {
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
