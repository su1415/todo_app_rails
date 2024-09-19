class TasksController < ApplicationController
  def index
    if params[:search] && !params[:search].nil?
      session[:search] = params[:search]
    end
    if params[:completed].present?
      session[:completed] = params[:completed]
    end
    tasks = filtered_tasks
    render_tasks_json(tasks)
  end

  def create
    task = Task.new(task_params)
    unless task.save
      return render json: task.errors, status: :unprocessable_entity
    end
    tasks = filtered_tasks
    render_tasks_json(tasks, status: :created)
  end

  def update
    task = Task.find(params[:id])
    unless task.update(task_params)
      return render json: task.errors, status: :unprocessable_entity
    end
    tasks = filtered_tasks
    render_tasks_json(tasks)
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    head :no_content
  end

  private

  def task_params
    params.require(:task).permit(:title, :due_date, :completed)
  end

  def filtered_tasks
    tasks = Task.order_by_due_date
    if session[:search].present?
      tasks = tasks.where("title LIKE ?", "%#{session[:search]}%")
    end
    if session[:completed].present?
      if session[:completed] == "completed"
        tasks = tasks.where(completed: true);
      end
      if session[:completed] == "incompleted"
        tasks = tasks.where(completed: false);
      end
    end
    tasks
  end

  def render_tasks_json(tasks, status: :ok)
    render json: {
      tasks: tasks,
      search_query: session[:search] || "",
      completed_filter: session[:completed] || "all",
    }, status: status
  end
end
