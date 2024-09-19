import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TaskFilterForm from "./TaskFilterForm";

const mockCompletedFilter = "all";
const mockOnCompletedFilterSet = jest.fn();

const defaultProps = {
  completedFilter: mockCompletedFilter,
  onCompletedFilterSet: mockOnCompletedFilterSet,
};

const renderTaskFilterForm = (customProps = {}) => {
  const props = { ...defaultProps, ...customProps };
  return render(<TaskFilterForm { ...props } />);
};

describe("TaskFilterForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("表示", () => {
    describe("初期表示", () => {
      it("表示される要素が正しいこと", () => {
        renderTaskFilterForm();
        const allRadioInput = screen.getByRole("radio", { name: "All" });
        const completedRadioInput = screen.getByRole("radio", { name: "Completed" });
        const incompletedRadioInput = screen.getByRole("radio", { name: "Incompleted" });

        expect(allRadioInput).toBeInTheDocument();
        expect(completedRadioInput).toBeInTheDocument();
        expect(incompletedRadioInput).toBeInTheDocument();
      });
    });

    describe("active表示", () => {
      it("All がactiveであること", () => {
        renderTaskFilterForm();
        const allLabel = screen.getByText("All");
        const completedLabel = screen.getByText("Completed");
        const incompletedLabel = screen.getByText("Incompleted");

        expect(allLabel).toHaveClass("active");
        expect(completedLabel).not.toHaveClass("active");
        expect(incompletedLabel).not.toHaveClass("active");
      });

      it("Completed がactiveであること", () => {
        renderTaskFilterForm({ completedFilter: "completed" });
        const allLabel = screen.getByText("All");
        const completedLabel = screen.getByText("Completed");
        const incompletedLabel = screen.getByText("Incompleted");

        expect(allLabel).not.toHaveClass("active");
        expect(completedLabel).toHaveClass("active");
        expect(incompletedLabel).not.toHaveClass("active");
      });

      it("Incompleted がactiveであること", () => {
        renderTaskFilterForm({ completedFilter: "incompleted" });
        const allLabel = screen.getByText("All");
        const completedLabel = screen.getByText("Completed");
        const incompletedLabel = screen.getByText("Incompleted");

        expect(allLabel).not.toHaveClass("active");
        expect(completedLabel).not.toHaveClass("active");
        expect(incompletedLabel).toHaveClass("active");
      });
    });
  });

  describe("ラジオボタンクリック", () => {
    describe("All", () => {
      it("mockOnCompletedFilterSet が呼びだされること", () => {
        renderTaskFilterForm({ completedFilter: "completed" });
        const allRadioInput = screen.getByRole("radio", { name: "All" });
        fireEvent.click(allRadioInput);
        expect(mockOnCompletedFilterSet).toHaveBeenCalledTimes(1);
      });
    });

    describe("Completed", () => {
      it("mockOnCompletedFilterSet が呼びだされること", () => {
        renderTaskFilterForm();
        const allRadioInput = screen.getByRole("radio", { name: "Completed" });
        fireEvent.click(allRadioInput);
        expect(mockOnCompletedFilterSet).toHaveBeenCalledTimes(1);
      });
    });

    describe("Incompleted", () => {
      it("mockOnCompletedFilterSet が呼びだされること", () => {
        renderTaskFilterForm();
        const allRadioInput = screen.getByRole("radio", { name: "Incompleted" });
        fireEvent.click(allRadioInput);
        expect(mockOnCompletedFilterSet).toHaveBeenCalledTimes(1);
      });
    });
  });
});
