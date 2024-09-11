class Task < ApplicationRecord
  scope :order_by_due_date, -> {
    order(Arel.sql("CASE WHEN due_date IS NULL THEN 1 ELSE 0 END, due_date ASC"))
  }
end
