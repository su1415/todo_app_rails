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
