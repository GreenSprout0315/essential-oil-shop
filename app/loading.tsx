export default function Loading() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-[#C9A84C] rounded-full animate-spin" />
        <p className="text-sm text-gray-400 tracking-wider">読み込み中...</p>
      </div>
    </div>
  );
}
