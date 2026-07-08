import PropTypes from "prop-types"

const TaskSummary = ({ totalTasks, activeTasks, completedTasks }) => {
  return (
    <section className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-5 text-center shadow-sm">
            <h2 className="text-3xl font-bold text-slate-800">
                {totalTasks}
            </h2>

            <p className="mt-2 text-slate-500">
                Total Tasks
            </p>
        </div>

        <div className="rounded-xl bg-white p-5 text-center shadow-sm">
            <h2 className="text-3xl font-bold text-blue-600">
                {activeTasks}
            </h2>

            <p className="mt-2 text-slate-500">
                Active Tasks
            </p>
        </div>

        <div className="rounded-xl bg-white p-5 text-center shadow-sm">
            <h2 className="text-3xl font-bold text-green-600">
                {completedTasks}
            </h2>

            <p className="mt-2 text-slate-500">
                Completed Tasks
            </p>
        </div>
    </section>
  )
}

TaskSummary.PropTypes = {
    totalTasks: PropTypes.number.isRequired,
    activeTasks: PropTypes.number.isRequired,
    completedTasks: PropTypes.number.isRequired,
};

export default TaskSummary