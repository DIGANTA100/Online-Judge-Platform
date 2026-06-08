"use client";

import Editor, { type OnMount } from "@monaco-editor/react";
import { useMemo, useState } from "react";

const starterCode = `#include <bits/stdc++.h>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  vector<int> a(n);
  for (int &x : a) cin >> x;

  cout << "Accepted\\n";
  return 0;
}`;

type MonacoCodeEditorProps = {
  language?: "cpp" | "java" | "python" | "javascript" | "c";
  initialValue?: string;
  value?: string;
  fileName?: string;
  onChange?: (value: string) => void;
};

export function MonacoCodeEditor({
  language = "cpp",
  initialValue = starterCode,
  value,
  fileName,
  onChange
}: MonacoCodeEditorProps) {
  const [fontSize, setFontSize] = useState(14);
  const [internalValue, setInternalValue] = useState(initialValue);
  const editorValue = value ?? internalValue;

  const options = useMemo(
    () => ({
      fontSize,
      minimap: { enabled: false },
      fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace",
      fontLigatures: true,
      lineHeight: 22,
      padding: { top: 18, bottom: 18 },
      smoothScrolling: true,
      cursorBlinking: "phase" as const,
      automaticLayout: true,
      quickSuggestions: { other: true, comments: false, strings: true },
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnEnter: "on" as const,
      tabCompletion: "on" as const,
      wordBasedSuggestions: "currentDocument" as const
    }),
    [fontSize]
  );

  const handleMount: OnMount = (editor, monaco) => {
    monaco.editor.defineTheme("nimble-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "76f7d1", fontStyle: "bold" },
        { token: "string", foreground: "ffd36f" },
        { token: "number", foreground: "ff9f9f" }
      ],
      colors: {
        "editor.background": "#0b0f14",
        "editor.foreground": "#edf7f4",
        "editorLineNumber.foreground": "#4d5b68",
        "editorCursor.foreground": "#76f7d1",
        "editor.selectionBackground": "#35dfb533",
        "editor.lineHighlightBackground": "#ffffff08"
      }
    });
    monaco.editor.setTheme("nimble-dark");
    registerCompetitiveSnippets(monaco);
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      localStorage.setItem("nimble-editor-draft", editor.getValue());
    });
  };

  return (
    <div className="overflow-hidden rounded-md border border-white/10 bg-ink-900">
      <div className="flex min-h-12 flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.035] px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-white/72">
          <span className="h-3 w-3 rounded-full bg-coral-400" />
          <span className="h-3 w-3 rounded-full bg-amberline-400" />
          <span className="h-3 w-3 rounded-full bg-mint-400" />
          <span className="ml-2 font-mono text-xs uppercase tracking-normal text-white/52">
            {fileName ?? `main.${language === "cpp" ? "cpp" : language}`}
          </span>
        </div>
        <label className="flex items-center gap-2 text-xs text-white/62">
          Font
          <input
            aria-label="Editor font size"
            className="h-2 w-28 accent-mint-400"
            max={20}
            min={12}
            type="range"
            value={fontSize}
            onChange={(event) => setFontSize(Number(event.target.value))}
          />
        </label>
      </div>
      <div className="h-[520px]">
        <Editor
          defaultLanguage={language}
          language={language}
          onChange={(nextValue) => {
            const updatedValue = nextValue ?? "";
            setInternalValue(updatedValue);
            onChange?.(updatedValue);
          }}
          onMount={handleMount}
          options={options}
          theme="nimble-dark"
          value={editorValue}
        />
      </div>
    </div>
  );
}

function registerCompetitiveSnippets(monaco: Parameters<OnMount>[1]) {
  type MonacoPosition = { lineNumber: number; column: number };
  type MonacoModel = {
    getWordUntilPosition: (position: MonacoPosition) => {
      startColumn: number;
      endColumn: number;
    };
  };

  const snippetMap = {
    cpp: [
      {
        label: "fastio",
        insertText: "ios::sync_with_stdio(false);\\ncin.tie(nullptr);",
        documentation: "Fast C++ input/output setup"
      },
      {
        label: "forn",
        insertText: "for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\\n  ${0}\\n}",
        documentation: "Indexed for loop"
      }
    ],
    c: [
      {
        label: "forn",
        insertText: "for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\\n  ${0}\\n}",
        documentation: "Indexed for loop"
      }
    ],
    java: [
      {
        label: "main",
        insertText: "public class Main {\\n  public static void main(String[] args) throws Exception {\\n    ${0}\\n  }\\n}",
        documentation: "Java Main class"
      }
    ],
    python: [
      {
        label: "readints",
        insertText: "list(map(int, input().split()))",
        documentation: "Read a list of integers"
      }
    ],
    javascript: [
      {
        label: "readinput",
        insertText: "const input = require(\"fs\").readFileSync(0, \"utf8\").trim().split(/\\\\s+/);",
        documentation: "Read standard input in Node.js"
      }
    ]
  };

  Object.entries(snippetMap).forEach(([languageId, snippets]) => {
    monaco.languages.registerCompletionItemProvider(languageId, {
      provideCompletionItems: (model: MonacoModel, position: MonacoPosition) => {
        const word = model.getWordUntilPosition(position);

        return {
          suggestions: snippets.map((snippet) => ({
            label: snippet.label,
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: snippet.insertText,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: snippet.documentation,
            range: {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn
            }
          }))
        };
      }
    });
  });
}
