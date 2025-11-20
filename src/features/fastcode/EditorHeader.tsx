interface EditorHeaderProps {
  filename: string
}

const EditorHeader = ({ filename }: EditorHeaderProps) => (
  <div className="flex items-center justify-between rounded-t-2xl border border-slate-800/80 bg-[#181818] px-4 py-3">
    <div className="flex items-center gap-2">
      <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
      <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
      <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
      <span className="ml-3 text-xs uppercase tracking-[0.3em] text-slate-500">
        Fast Code
      </span>
    </div>
    <div className="font-mono text-sm text-slate-300">{filename}</div>
    <div className="flex items-center gap-3 text-[11px] text-slate-500">
      <span>UTF-8</span>
      <span>LF</span>
      <span>Spaces: 2</span>
    </div>
  </div>
)

export default EditorHeader


