FactoryBot.define do
  factory :task do
    title { "Test Task" }
    due_date { Date.today + 1.week }
    completed { false }
  end
end
