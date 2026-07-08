

const EmptyState = ({ title, message }) => {
  return (
    <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center">
        <h2 className="mb-2 text-2xl font-semibold text-slate-700">
            {title}
        </h2>

        <p className="text-slate-500">
            {message}
        </p>
    </div>
  )
}

export default EmptyState