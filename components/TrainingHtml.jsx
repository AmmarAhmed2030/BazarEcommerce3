import React from 'react';
import parse from 'html-react-parser';
export default function TrainingHtml({ content }) {
  return <article className="text-lg">{parse(content)}</article>;
}
