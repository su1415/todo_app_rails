require "rails_helper"

RSpec.describe Task, type: :model do
  describe ".order_by_due_date" do
    it "期日の昇順にソートされること" do
      task1 = Task.create!(title: "Task 1", due_date: nil) # 期日なしのタスクは後ろに配置
      task2 = Task.create!(title: "Task 2", due_date: Date.today - 3.days)
      task3 = Task.create!(title: "Task 3", due_date: Date.today + 2.days)
      task4 = Task.create!(title: "Task 4", due_date: nil) # 期日なしのタスク同士は作成順に配置
      ordered_tasks = Task.order_by_due_date
      expect(ordered_tasks).to eq([task2, task3, task1, task4])
    end
  end
end
