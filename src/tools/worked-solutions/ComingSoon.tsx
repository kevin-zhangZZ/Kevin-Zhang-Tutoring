// Placeholder detail panel for questions that don't have a written solution yet.

export default function ComingSoon({ topic }: { topic: string }) {
  return (
    <div className="border-[1.5px] border-dashed border-gray-300 dark:border-gray-700 rounded-2xl px-7 py-9 text-center text-[13.5px] leading-relaxed text-gray-400 dark:text-gray-500">
      Written solution and video walkthrough coming soon for{' '}
      <span className="text-gray-500 dark:text-gray-400">{topic}</span>.
    </div>
  )
}
