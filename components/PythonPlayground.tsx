'use client';

import { useState, useEffect } from 'react';
import { PythonProvider, usePython } from 'react-py';
import Editor from '@monaco-editor/react';

function Runner({ initialCode }: { initialCode: string }) {
  const [code, setCode] = useState(initialCode);
  const [editorHeight, setEditorHeight] = useState(260);
  const { runPython, stdout, stderr, isLoading, isRunning } = usePython();
  const minHeight = 260;
  const maxHeight = 520;

  return (
    <div className="border border-fd-border rounded-xl overflow-hidden my-4 shadow-lg">
      <Editor
        height={`${editorHeight}px`}
        defaultLanguage="python"
        value={code}
        onChange={(v) => setCode(v ?? '')}
        theme="vs-dark"
        onMount={(editor) => {
          const updateHeight = () => {
            const contentHeight = Math.ceil(editor.getContentHeight());
            const nextHeight = Math.min(maxHeight, Math.max(minHeight, contentHeight + 16));
            setEditorHeight((prev) => (prev === nextHeight ? prev : nextHeight));
          };
          updateHeight();
          editor.onDidContentSizeChange(updateHeight);
        }}
        options={{
          minimap: { enabled: false },
          fontSize: 15,
          lineHeight: 22,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          renderLineHighlight: 'line',
          padding: { top: 12 },
          scrollbar: { vertical: 'auto', horizontal: 'auto' },
        }}
      />
      <div className="flex items-center gap-2 px-3 py-2.5 bg-zinc-800 border-t border-fd-border">
        <button
          type="button"
          onClick={() => runPython(code)}
          disabled={isLoading || isRunning}
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg text-base font-semibold shadow-md shadow-emerald-900/40 ring-1 ring-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? '加载中...' : isRunning ? '运行中...' : '▶ 运行'}
        </button>
      </div>
      {(stdout || stderr) && (
        <pre className="p-3 bg-black/90 text-green-400 text-sm overflow-auto max-h-48 font-mono border-t border-fd-border">
          {stdout}
          {stderr && <span className="text-red-400">{stderr}</span>}
        </pre>
      )}
    </div>
  );
}

export function PythonPlayground({ code }: { code?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="border border-fd-border rounded-xl overflow-hidden my-4 shadow-lg h-[260px] min-h-[260px] flex items-center justify-center bg-zinc-900/50 text-fd-muted-foreground text-sm">
        加载代码编辑器中…
      </div>
    );
  }

  return (
    <PythonProvider>
      <Runner initialCode={code ?? ''} />
    </PythonProvider>
  );
}
