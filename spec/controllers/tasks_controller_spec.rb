require "rails_helper"

RSpec.describe TasksController, type: :controller do
  let!(:task_completed_test) { create(:task, title: "test completed task 1", completed: true) }
  let!(:task_completed_sample) { create(:task, title: "sample completed task 2", completed: true) }
  let!(:task_incompleted_test) { create(:task, title: "test incompleted task 1") }
  let!(:task_incompleted_sample) { create(:task, title: "sample incompleted task 2") }

  describe "GET #index" do
    subject { get :index, format: :json, params: params }

    RSpec.shared_examples "index共通" do
      it "HTTPステータスがokであること" do
        expect(response).to have_http_status(:ok)
      end

      it "条件に一致したtasksが返ること" do
        json = JSON.parse(response.body)
        expect(json.length).to eq output_count
        expect(json.pluck("title")).to eq output_title
      end
    end

    context "検索なし・filterなし" do
      let(:params) {}
      let(:output_count) { 4 }
      let(:output_title) { [
        task_completed_test.title,
        task_completed_sample.title,
        task_incompleted_test.title,
        task_incompleted_sample.title,
      ] }
      before { subject }
      it_behaves_like "index共通"
    end

    context "検索あり" do
      let(:params) { { search: "test" } }
      let(:output_count) { 2 }
      let(:output_title) { [
        task_completed_test.title,
        task_incompleted_test.title,
      ] }
      before { subject }
      it_behaves_like "index共通"
    end

    context "filterあり" do
      context "filter完了済" do
        let(:params) { { completed: "completed" } }
        let(:output_count) { 2 }
        let(:output_title) { [
          task_completed_test.title,
          task_completed_sample.title,
        ] }
        before { subject }
        it_behaves_like "index共通"
      end

      context "filter未完了" do
        let(:params) { { completed: "incompleted" } }
        let(:output_count) { 2 }
        let(:output_title) { [
          task_incompleted_test.title,
          task_incompleted_sample.title,
        ] }
        before { subject }
        it_behaves_like "index共通"
      end
    end

    context "検索あり・filterあり" do
      let(:params) { { search: "test", completed: "incompleted" } }
      let(:output_count) { 1 }
      let(:output_title) { [
        task_incompleted_test.title,
      ] }
      before { subject }
      it_behaves_like "index共通"
    end
  end

  describe "POST #create" do
    # TODO
  end

  describe "PATCH/PUT #update" do
    # TODO
  end

  describe "DELETE #destroy" do
    # TODO
end
