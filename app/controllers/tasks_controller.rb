class TasksController < ApplicationController
  def index
    tasks = Task.all
    render json: tasks
  end

  def create
    task = Task.new(task_params)
    unless task.save
      return render json: task.errors, status: :unprocessable_entity
    end
    render json: task, status: :created
  end

  private

  def task_params
    params.require(:task).permit(:title)
  end
end
