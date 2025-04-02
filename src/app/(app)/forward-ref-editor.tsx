'use client';

// ForwardRefEditor.tsx
import { type MDXEditorMethods, type MDXEditorProps } from '@mdxeditor/editor';
import dynamic from 'next/dynamic';
import { forwardRef } from 'react';

import '@mdxeditor/editor/style.css';

import styles from './styles/ui.module.css';

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import('./markdown-editor'), {
  // Make sure we turn SSR off
  ssr: false,
});

export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => (
  <Editor {...props} editorRef={ref} />
));

// TS complains without the following line
ForwardRefEditor.displayName = 'ForwardRefEditor';
