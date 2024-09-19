import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TaskSearchForm from "./TaskSearchForm";

const mockSearchQuery = "";
const mockOnTaskSearchSet = jest.fn();
const mockOnSearchTask = jest.fn();

const defaultProps = {
  searchQuery: mockSearchQuery,
  onTaskSearchSet: mockOnTaskSearchSet,
  onSearchTask: mockOnSearchTask,
};

const renderTaskSearchForm = (customProps = {}) => {
  const props = { ...defaultProps, ...customProps };
  return render(<TaskSearchForm { ...props } />);
};

describe("TaskSearchForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("表示", () => {
    describe("初期表示", () => {
      it("表示される要素が正しいこと", () => {
        renderTaskSearchForm();
        const searchInput = screen.getByTestId("test-input-search");
        const searchButton = screen.getByRole("button", { name: "Search" });

        expect(searchInput).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();
      });
    });
  });

  describe("入力", () => {
    describe("検索", () => {
      it("mockOnTaskSearchSet が呼びだされること", () => {
        renderTaskSearchForm();
        const searchInput = screen.getByTestId("test-input-search");
        fireEvent.change(searchInput, { target: { value: "search task" } });
        expect(mockOnTaskSearchSet).toHaveBeenCalledTimes(1);
        expect(mockOnTaskSearchSet).toHaveBeenCalledWith("search task");
      });
    });
  });

  describe("ボタンクリック", () => {
    describe("Search", () => {
      it("mockOnSearchTask が呼びだされること", () => {
        renderTaskSearchForm();
        const searchButton = screen.getByRole("button", { name: "Search" });
        fireEvent.click(searchButton);
        expect(mockOnSearchTask).toHaveBeenCalledTimes(1);
      });
    });
  });
});
