

const EmptyState = () => {
  return (
    <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center">
        <h2 className="mb-2 text-2xl font-semibold text-slate-700">
            No Tasks Yet
        </h2>

        <p className="text-slate-500">
            Add your first task to get started.
        </p>
    </div>
  )
}

export default EmptyState