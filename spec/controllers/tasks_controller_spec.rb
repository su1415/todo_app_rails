require "rails_helper"

RSpec.describe TasksController, type: :controller do
  let!(:task_completed_test) { create(:task, title: "test completed task 1", due_date: Date.today + 1.days, completed: true) }
  let!(:task_completed_sample) { create(:task, title: "sample completed task 2", due_date: Date.today + 2.days, completed: true) }
  let!(:task_incompleted_test) { create(:task, title: "test incompleted task 1", due_date: Date.today + 3.days) }
  let!(:task_incompleted_sample) { create(:task, title: "sample incompleted task 2", due_date: Date.today + 4.days) }

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
    let(:params) { { search: "test", completed: "incompleted" } }
    let(:new_task) { { title: "test new task", due_date: Date.today } }
    before { get :index, format: :json, params: params }
    subject { post :create, format: :json, params: { task: new_task } }

    context "登録が正常に完了" do
      it "taskが登録されること" do
        expect{ subject }.to change(Task, :count).by(1)
      end

      it "HTTPステータスがcreatedであること" do
        subject
        expect(response).to have_http_status(:created)
      end

      it "条件に一致したtasksが返ること" do
        subject
        json = JSON.parse(response.body)
        expect(json.length).to eq(2)
        expect(json.pluck("title")).to eq ["test new task", task_incompleted_test.title]
      end
    end

    context "登録がエラーで中断" do
      before do
        allow_any_instance_of(Task).to receive(:save).and_return(false)
      end

      it "HTTPステータスがunprocessable_entityであること" do
        subject
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH/PUT #update" do
    let(:params) { { search: "test" } }
    before { get :index, format: :json, params: params }
    subject { patch :update, format: :json, params: { id: task_completed_test.id, task: { title: "test update task" } } }

    context "更新が正常に完了" do
      it "taskが更新されること" do
        subject
        expect(task_completed_test.reload.title).to eq "test update task"
      end

      it "HTTPステータスがokであること" do
        subject
        expect(response).to have_http_status(:ok)
      end

      it "条件に一致したtasksが返ること" do
        subject
        json = JSON.parse(response.body)
        expect(json.length).to eq(2)
        expect(json.pluck("title")).to eq [task_completed_test.reload.title, task_incompleted_test.title]
      end
    end

    context "更新がエラーで中断" do
      before do
        allow_any_instance_of(Task).to receive(:save).and_return(false)
      end

      it "HTTPステータスがunprocessable_entityであること" do
        subject
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE #destroy" do
    # TODO
  end
end
