'use client';

import { MDXEditorMethods } from '@mdxeditor/editor';
import React, { Suspense } from 'react';

import { ForwardRefEditor } from './forward-ref-editor';

const markdown = `
Hello **world**!

# dsadaij
# dsjaidjsi
`;

export default function Home() {
  const ref = React.useRef<MDXEditorMethods>(null);
  return (
    <div className="p-8">
      <p>
        This is a bare-bones unstyled MDX editor without any plugins and no toolbar. Check the
        EditorComponent.tsx file for the code.
      </p>
      <p>
        To enable more features, add the respective plugins to your instance - see{' '}
        <a className="text-blue-600" href="https://mdxeditor.dev/editor/docs/getting-started">
          the docs
        </a>{' '}
        for more details.
      </p>
      <br />
      <div style={{ border: '1px solid black' }}>
        <Suspense fallback={null}>
          <ForwardRefEditor markdown={markdown} ref={ref} />
        </Suspense>
      </div>
    </div>
  );
}
