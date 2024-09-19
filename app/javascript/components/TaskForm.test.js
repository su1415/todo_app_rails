import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TaskForm from "./TaskForm";

const mockTaskData = {
  title: "",
  dueDate: "",
};

const mockOnTaskDataAdd = jest.fn();
const mockOnAddTask = jest.fn();

const defaultProps = {
  taskData: mockTaskData,
  onTaskDataAdd: mockOnTaskDataAdd,
  onAddTask: mockOnAddTask,
};

const renderTaskForm = (customProps = {}) => {
  const props = { ...defaultProps, ...customProps };
  return render(<TaskForm { ...props } />);
};

describe("TaskForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("表示", () => {
    describe("初期表示", () => {
      it("表示される要素が正しいこと", () => {
        renderTaskForm();
        const titleInput = screen.getByTestId("test-input-title");
        const dateInput = screen.getByTestId("test-input-due-date");
        const addButton = screen.getByRole("button", { name: "Add" });

        expect(titleInput).toBeInTheDocument();
        expect(dateInput).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
      });
    });
  });

  describe("入力", () => {
    describe("タイトル", () => {
      it("mockOnTaskDataAdd が呼びだされること", () => {
        renderTaskForm();
        const titleInput = screen.getByTestId("test-input-title");
        fireEvent.change(titleInput, { target: { value: "new task" } });
        expect(mockOnTaskDataAdd).toHaveBeenCalledTimes(1);
        expect(mockOnTaskDataAdd).toHaveBeenCalledWith("title", "new task");
      });
    });

    describe("期日", () => {
      it("mockOnTaskDataAdd が呼びだされること", () => {
        renderTaskForm();
        const dateInput = screen.getByTestId("test-input-due-date");
        fireEvent.change(dateInput, { target: { value: "2024-09-19" } });
        expect(mockOnTaskDataAdd).toHaveBeenCalledTimes(1);
        expect(mockOnTaskDataAdd).toHaveBeenCalledWith("dueDate", "2024-09-19");
      });
    });
  });

  describe("ボタンクリック", () => {
    describe("Add", () => {
      it("mockOnAddTask が呼びだされること", () => {
        renderTaskForm();
        const addButton = screen.getByRole("button", { name: "Add" });
        fireEvent.click(addButton);
        expect(mockOnAddTask).toHaveBeenCalledTimes(1);
      });
    });
  });
});
