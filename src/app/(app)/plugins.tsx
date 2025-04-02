import {
  AdmonitionDirectiveDescriptor,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  DirectiveDescriptor,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  KitchenSinkToolbar,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  SandpackConfig,
  sandpackPlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { LeafDirective } from 'mdast-util-directive';
import React from 'react';

// Default code snippet content
const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

export const virtuosoSampleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent,
    },
    {
      label: 'React',
      name: 'react',
      meta: 'live',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent,
    },
    {
      label: 'Virtuoso',
      name: 'virtuoso',
      meta: 'live virtuoso',
      sandpackTemplate: 'react-ts',
      sandpackTheme: 'light',
      snippetFileName: '/App.tsx',
      initialSnippetContent: defaultSnippetContent,
      dependencies: {
        'react-virtuoso': 'latest',
        '@ngneat/falso': 'latest',
      },
      //   files: {
      //     '/data.ts': dataCode
      //   }
    },
  ],
};

export async function expressImageUploadHandler(image: File) {
  const formData = new FormData();
  formData.append('image', image);
  const response = await fetch('/uploads/new', { method: 'POST', body: formData });
  const json = (await response.json()) as { url: string };
  return json.url;
}

interface YoutubeDirectiveNode extends LeafDirective {
  name: 'youtube';
  attributes: { id: string };
}

export const YoutubeDirectiveDescriptor: DirectiveDescriptor<YoutubeDirectiveNode> = {
  name: 'youtube',
  type: 'leafDirective',
  testNode(node) {
    return node.name === 'youtube';
  },
  attributes: ['id'],
  hasChildren: false,
  Editor: ({ mdastNode, lexicalNode, parentEditor }) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <button
          onClick={() => {
            parentEditor.update(() => {
              lexicalNode.selectNext();
              lexicalNode.remove();
            });
          }}
        >
          delete
        </button>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${mdastNode.attributes.id}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
    );
  },
};

// Reordered plugin array based on MDX Editor docs recommendations.
export const ALL_PLUGINS = [
  // Place markdown shortcuts first to ensure proper handling of toolbar clicks and keyboard events.
  markdownShortcutPlugin(),

  // Toolbar and view-related plugins.
  toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),

  // Code mirror for code block syntax highlighting.
  codeMirrorPlugin({
    codeBlockLanguages: {
      js: 'JavaScript',
      css: 'CSS',
      txt: 'Plain Text',
      tsx: 'TypeScript',
      '': 'Unspecified',
    },
  }),

  // Code block plugin with a default language.
  codeBlockPlugin({ defaultCodeBlockLanguage: 'jsx' }),

  // List, quote, and heading plugins.
  listsPlugin(),
  quotePlugin(),
  headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),

  // Link and dialog plugins.
  linkPlugin(),
  linkDialogPlugin(),

  // Image plugin.
  imagePlugin({
    imageAutocompleteSuggestions: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    imageUploadHandler: async () => Promise.resolve('https://picsum.photos/200/300'),
  }),

  // Table and thematic break plugins.
  tablePlugin(),
  thematicBreakPlugin(),

  // Frontmatter support.
  frontmatterPlugin(),

  // Sandpack integration for live code previews.
  sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),

  // Directives such as YouTube and admonitions.
  directivesPlugin({
    directiveDescriptors: [YoutubeDirectiveDescriptor, AdmonitionDirectiveDescriptor],
  }),

  // Diff source plugin for rich text diffing.
  diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
];
