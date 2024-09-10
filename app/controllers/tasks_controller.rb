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

  def update
    task = Task.find(params[:id])
    unless task.update(task_params)
      return render json: task.errors, status: unprocessable_entity
    end
    render json: task
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    head :no_content
  end

  private

  def task_params
    params.require(:task).permit(:title)
  end
end
