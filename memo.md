# 操作メモ

## 環境設定

### vscode のターミナルで以下を実行

```
$ rails new todo_app_rails --database=postgresql --javascript=esbuild
```

### config/database.yml の変更

```
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  username: myappuser   # 追加 PostgreSQLユーザーを作成していない場合は作成する
  password: mypassword  # 追加
  host: localhost       # 追加

development:
  <<: *default
  database: todo_app_rails_development
```

### データベースの作成

```
$ rails db:create
```

### Reactのインストール

```
$ yarn add react react-dom
```

### Reactコンポーネントの作成

```
$ mkdir app/javascript/components
$ touch app/javascript/components/TaskList.jsx
```

app/javascript/components/TaskList.jsx
```
import React from "react";

const TaskList = () => {
  return (
    <div>
      <h1>Task List</h1>
      <p>Here is where your tasks will appear.</p>
    </div>
  );
};

export default TaskList;
```

### package.jsonのスクリプト修正

package.json
--loader:.js=jsxオプションを追加
```
{
  "scripts": {
    "build": "esbuild app/javascript/*.* --bundle --sourcemap --format=esm --outdir=app/assets/builds --public-path=/assets --loader:.js=jsx"
  }
}
```

### ReactコンポーネントをRailsでレンダリング

app/javascript/application.js
```
import React from "react";
import ReactDOM from "react-dom/client";  // 新しいcreateRoot APIを使うために変更
import TaskList from "./components/TaskList.jsx";

document.addEventListener("DOMContentLoaded", () => {
  const element = document.getElementById("task-list");
  if (element) {
    const root = ReactDOM.createRoot(element);  // createRootを使う
    root.render(<TaskList />);  // こちらでレンダリング
  }
});
```

### 確認用のビューとコントローラを作成

```
$ rails generate controller Home index
```

app/views/home/index.html.erb
```
<div id="task-list"></div>
```

config/routes.rb
```
Rails.application.routes.draw do
  root "home#index"  # ルートパスでHomeコントローラーのindexアクションを使用
  get "home/index"
end
```

### アセットをプリコンパイル

```
$ rails assets:precompile
```

### サーバーの起動

```
$ rails server
```

### 動作確認

```
http://localhost:3000 にアクセスして確認
```


## その他

### プリコンパイルでエラーが出る場合の対応策の一部

Railsキャッシュのクリア
```
$ rails tmp:cache:clear
```

下記ファイルの削除
```
app\assets\builds\application.js
app\assets\builds\application.css
app\assets\builds\application.js.map
app\assets\builds\application.css.map
```

### Bootstrap のインストール

```
yarn add bootstrap
```

### バックエンド（Rails）テストの準備

Gemfile
```
group :development, :test do
  gem 'rspec-rails'
  gem 'factory_bot_rails'
end
```

```
$ rails generate rspec:install
      create  .rspec
       exist  spec
      create  spec/spec_helper.rb
      create  spec/rails_helper.rb
```

spec/rails_helper.rb
```
RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end
```

### フロントエンド（React）テストの準備

```
$ yarn add --dev jest @testing-library/react @testing-library/jest-dom @babel/preset-env @babel/preset-react
$ yarn add --dev jest-environment-jsdom
$ yarn add --dev @testing-library/dom
```

jest.config.js
```
module.exports = {
  testEnvironment: 'jsdom', // jsdomを使用してブラウザのような環境をシミュレート
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // setupファイルを指定
  moduleFileExtensions: ['js', 'jsx'], // テスト対象の拡張子
  transform: {
    '^.+\\.jsx?$': 'babel-jest' // JSXをbabelでトランスパイル
  },
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'], // テストファイルのパターン
};
```

.babelrc
```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

jest.setup.js
```
import '@testing-library/jest-dom'; // Jest DOMのアサーションを使えるようにする
```

package.json
```
{
  "scripts": {
    "test": "jest"
  }
}
```

テストの実行
```
$ yarn test
```
