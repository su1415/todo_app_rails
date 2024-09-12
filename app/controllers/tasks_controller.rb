class TasksController < ApplicationController
  def index
    tasks = Task.order_by_due_date
    if params[:search].present?
      tasks = tasks.where("title LIKE ?", "%#{params[:search]}%")
    end
    if params[:completed].present?
      tasks = tasks.where(completed: ActiveModel::Type::Boolean.new.cast(params[:completed]))
    end
    render json: tasks
  end

  def create
    task = Task.new(task_params)
    unless task.save
      return render json: task.errors, status: :unprocessable_entity
    end
    tasks = Task.order_by_due_date
    render json: tasks, status: :created
  end

  def update
    task = Task.find(params[:id])
    unless task.update(task_params)
      return render json: task.errors, status: :unprocessable_entity
    end
    tasks = Task.order_by_due_date
    render json: tasks
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
end
