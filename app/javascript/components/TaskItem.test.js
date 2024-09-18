import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskItem from "./TaskItem";

const mockTask = {
  id: 1,
  title: "test task",
  completed: false,
  due_date: "2024-09-18",
};

const mockEditTaskData = {
  title: "test task",
  dueDate: "2024-09-18",
};

const mockOnTaskDataEdit = jest.fn();
const mockOnToggleComplete = jest.fn();
const mockOnSave = jest.fn();
const mockOnCancel = jest.fn();
const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

const defaultProps = {
  task: mockTask,
  isEditing: false,
  editTaskData: mockEditTaskData,
  onTaskDataEdit: mockOnTaskDataEdit,
  onToggleComplete: mockOnToggleComplete,
  onSave: mockOnSave,
  onCancel: mockOnCancel,
  onEdit: mockOnEdit,
  onDelete: mockOnDelete,
};

const renderTaskItem = (customProps = {}) => {
  const props = { ...defaultProps, ...customProps };
  return render(<TaskItem { ...props } />);
};

describe("TaskItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("表示", () => {
    describe("初期表示", () => {
      it("表示される要素が正しいこと", () => {
        renderTaskItem();
        const titleInput = screen.getByText("test task");
        const dateInput = screen.getByDisplayValue("2024-09-18");
        const editButton = screen.getByRole("button", { name: "Edit" });
        const deleteButton = screen.getByRole("button", { name: "Delete" });

        expect(screen.getByRole("checkbox")).not.toHaveAttribute("disabled");
        expect(titleInput).toBeInTheDocument();
        expect(dateInput).toBeInTheDocument();
        expect(editButton).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
      });
    });

    describe("編集モード", () => {
      it("表示される要素が正しいこと", () => {
        renderTaskItem({ isEditing: true });
        const titleInput = screen.getByDisplayValue("test task");
        const dateInput = screen.getByDisplayValue("2024-09-18");
        const saveButton = screen.getByRole("button", { name: "Save" });
        const cancelButton = screen.getByRole("button", { name: "Cancel" });

        expect(screen.getByRole("checkbox")).toHaveAttribute("disabled");
        expect(titleInput).toBeInTheDocument();
        expect(dateInput).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
      });
    });

    describe("完了済", () => {
      it("タイトルに取り消し線が適用されること", () => {
        renderTaskItem({ task: { ...mockTask, completed: true } });
        const titleText = screen.getByText("test task");
        expect(titleText).toHaveClass("text-decoration-line-through");
      });
    });
  });

  describe("入力", () => {
    describe("タイトル", () => {
      it("mockOnTaskDataEdit が呼びだされること", () => {
        renderTaskItem({ isEditing: true });
        const titleInput = screen.getByDisplayValue("test task");
        fireEvent.change(titleInput, { target: { value: "update" } });
        expect(mockOnTaskDataEdit).toHaveBeenCalledTimes(1);
        expect(mockOnTaskDataEdit).toHaveBeenCalledWith("title", "update");
      });
    });

    describe("期日", () => {
      it("mockOnTaskDataEdit が呼びだされること", () => {
        renderTaskItem({ isEditing: true });
        const dateInput = screen.getByDisplayValue("2024-09-18");
        fireEvent.change(dateInput, { target: { value: "2024-09-19" } });
        expect(mockOnTaskDataEdit).toHaveBeenCalledTimes(1);
        expect(mockOnTaskDataEdit).toHaveBeenCalledWith("dueDate", "2024-09-19");
      });
    });

    describe("チェックボックス", () => {
      it("mockOnToggleComplete が呼びだされること", () => {
        renderTaskItem();
        const checkboxInput = screen.getByRole("checkbox");
        fireEvent.click(checkboxInput);
        expect(mockOnToggleComplete).toHaveBeenCalledTimes(1);
        expect(mockOnToggleComplete).toHaveBeenCalledWith(mockTask);
      });
    });
  });

  describe("ボタンクリック", () => {
    describe("Save", () => {
      it("mockOnSave が呼びだされること", () => {
        renderTaskItem({ isEditing: true });
        const saveButton = screen.getByRole("button", { name: "Save" });
        fireEvent.click(saveButton);
        expect(mockOnSave).toHaveBeenCalledTimes(1);
      });
    });

    describe("Cancel", () => {
      it("mockOnCancel が呼びだされること", () => {
        renderTaskItem({ isEditing: true });
        const cancelButton = screen.getByRole("button", { name: "Cancel" });
        fireEvent.click(cancelButton);
        expect(mockOnCancel).toHaveBeenCalledTimes(1);
      });
    });

    describe("Edit", () => {
      it("mockOnEdit が呼びだされること", () => {
        renderTaskItem();
        const editButton = screen.getByRole("button", { name: "Edit" });
        fireEvent.click(editButton);
        expect(mockOnEdit).toHaveBeenCalledTimes(1);
        expect(mockOnEdit).toHaveBeenCalledWith(mockTask);
      });
    });

    describe("Delete", () => {
      it("mockOnDelete が呼びだされること", () => {
        renderTaskItem();
        const deleteButton = screen.getByRole("button", { name: "Delete" });
        fireEvent.click(deleteButton);
        expect(mockOnDelete).toHaveBeenCalledTimes(1);
        expect(mockOnDelete).toHaveBeenCalledWith(mockTask.id);
      });
    });
  });
});
