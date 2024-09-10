# 操作メモ

## 環境設定

### vscode のターミナルで以下を実行

```
$ rails new task_manager_app --database=postgresql --javascript=esbuild
```

<details><summary>ログ</summary>

```
$ rails new task_manager_app --database=postgresql --javascript=esbuild
      create
      create  README.md
      create  Rakefile
      create  .node-version
      create  .ruby-version
      create  config.ru
      create  .gitignore
      create  .gitattributes
      create  Gemfile
         run  git init from "."
Initialized empty Git repository in C:/Users/guestuser/workspace/task_manager_app/.git/
      create  app
      create  app/assets/config/manifest.js
      create  app/assets/stylesheets/application.css
      create  app/channels/application_cable/channel.rb
      create  app/channels/application_cable/connection.rb
      create  app/controllers/application_controller.rb
      create  app/helpers/application_helper.rb
      create  app/jobs/application_job.rb
      create  app/mailers/application_mailer.rb
      create  app/models/application_record.rb
      create  app/views/layouts/application.html.erb
      create  app/views/layouts/mailer.html.erb
      create  app/views/layouts/mailer.text.erb
      create  app/assets/images
      create  app/assets/images/.keep
      create  app/controllers/concerns/.keep
      create  app/models/concerns/.keep
      create  bin
      create  bin/rails
      create  bin/rake
      create  bin/setup
      create  Dockerfile
      create  .dockerignore
      create  bin/docker-entrypoint
      create  config
      create  config/routes.rb
      create  config/application.rb
      create  config/environment.rb
      create  config/cable.yml
      create  config/puma.rb
      create  config/storage.yml
      create  config/environments
      create  config/environments/development.rb
      create  config/environments/production.rb
      create  config/environments/test.rb
      create  config/initializers
      create  config/initializers/assets.rb
      create  config/initializers/content_security_policy.rb
      create  config/initializers/cors.rb
      create  config/initializers/filter_parameter_logging.rb
      create  config/initializers/inflections.rb
      create  config/initializers/new_framework_defaults_7_1.rb
      create  config/initializers/permissions_policy.rb
      create  config/locales
      create  config/locales/en.yml
      create  config/master.key
      append  .gitignore
      create  config/boot.rb
      create  config/database.yml
      create  db
      create  db/seeds.rb
      create  lib
      create  lib/tasks
      create  lib/tasks/.keep
      create  lib/assets
      create  lib/assets/.keep
      create  log
      create  log/.keep
      create  public
      create  public/404.html
      create  public/422.html
      create  public/500.html
      create  public/apple-touch-icon-precomposed.png
      create  public/apple-touch-icon.png
      create  public/favicon.ico
      create  public/robots.txt
      create  tmp
      create  tmp/.keep
      create  tmp/pids
      create  tmp/pids/.keep
      create  tmp/cache
      create  tmp/cache/assets
      create  vendor
      create  vendor/.keep
      create  test/fixtures/files
      create  test/fixtures/files/.keep
      create  test/controllers
      create  test/controllers/.keep
      create  test/mailers
      create  test/mailers/.keep
      create  test/models
      create  test/models/.keep
      create  test/helpers
      create  test/helpers/.keep
      create  test/integration
      create  test/integration/.keep
      create  test/channels/application_cable/connection_test.rb
      create  test/test_helper.rb
      create  test/system
      create  test/system/.keep
      create  test/application_system_test_case.rb
      create  storage
      create  storage/.keep
      create  tmp/storage
      create  tmp/storage/.keep
      remove  config/initializers/cors.rb
      remove  config/initializers/new_framework_defaults_7_1.rb
         run  bundle install
Fetching gem metadata from https://rubygems.org/...........
Resolving dependencies...
Bundle complete! 14 Gemfile dependencies, 83 gems now installed.
Use `bundle info [gemname]` to see where a bundled gem is installed.
         run  bundle lock --add-platform=x86_64-linux
Fetching gem metadata from https://rubygems.org/.........
Resolving dependencies...
Writing lockfile to C:/Users/guestuser/workspace/task_manager_app/Gemfile.lock
         run  bundle binstubs bundler
       rails  javascript:install:esbuild
       apply  C:/Ruby33-x64/lib/ruby/gems/3.3.0/gems/jsbundling-rails-1.3.1/lib/install/esbuild/install.rb
       apply    C:/Ruby33-x64/lib/ruby/gems/3.3.0/gems/jsbundling-rails-1.3.1/lib/install/install.rb
    Compile into app/assets/builds
      create      app/assets/builds
      create      app/assets/builds/.keep
      append      app/assets/config/manifest.js
      append      .gitignore
      append      .gitignore
    Add JavaScript include tag in application layout
      insert      app/views/layouts/application.html.erb
    Create default entrypoint in app/javascript/application.js
      create      app/javascript
      create      app/javascript/application.js
    Add default package.json
      create      package.json
    Add bin/dev to start foreman
      create      bin/dev
       apply    C:/Ruby33-x64/lib/ruby/gems/3.3.0/gems/jsbundling-rails-1.3.1/lib/install/install_procfile.rb
    Add default Procfile.dev
      create      Procfile.dev
    Ensure foreman is installed
         run      gem install foreman from "."
Successfully installed foreman-0.88.1
Parsing documentation for foreman-0.88.1
Done installing documentation for foreman after 1 seconds
1 gem installed
  Install esbuild
         run    yarn add --dev esbuild from "."
yarn add v1.22.22
info No lockfile found.
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 2 new dependencies.
info Direct dependencies
└─ esbuild@0.23.1
info All dependencies
├─ @esbuild/win32-x64@0.23.1
└─ esbuild@0.23.1
Done in 2.88s.
  Add build script
         run    npm pkg set scripts.build="esbuild app/javascript/*.* --bundle --sourcemap --format=esm --outdir=app/assets/builds --public-path=/assets" from "."
         run    yarn build from "."
yarn run v1.22.22
$ esbuild app/javascript/*.* --bundle --sourcemap --format=esm --outdir=app/assets/builds --public-path=/assets

  app\assets\builds\application.js      48b
  app\assets\builds\application.js.map  93b

Done in 0.32s.
         run  bundle install
Bundle complete! 14 Gemfile dependencies, 83 gems now installed.
Use `bundle info [gemname]` to see where a bundled gem is installed.
       rails  turbo:install stimulus:install
       apply  C:/Ruby33-x64/lib/ruby/gems/3.3.0/gems/turbo-rails-2.0.6/lib/install/turbo_with_node.rb
  Import Turbo
      append    app/javascript/application.js
  Install Turbo
         run    yarn add @hotwired/turbo-rails from "."
yarn add v1.22.22
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 3 new dependencies.
info Direct dependencies
└─ @hotwired/turbo-rails@8.0.5
info All dependencies
├─ @hotwired/turbo-rails@8.0.5
├─ @hotwired/turbo@8.0.5
└─ @rails/actioncable@7.2.100
Done in 1.50s.
         run  bundle install
Bundle complete! 14 Gemfile dependencies, 83 gems now installed.
Use `bundle info [gemname]` to see where a bundled gem is installed.
Run turbo:install:redis to switch on Redis and use it in development for turbo streams
       apply  C:/Ruby33-x64/lib/ruby/gems/3.3.0/gems/stimulus-rails-1.3.4/lib/install/stimulus_with_node.rb
  Create controllers directory
      create    app/javascript/controllers
      create    app/javascript/controllers/index.js
      create    app/javascript/controllers/application.js
      create    app/javascript/controllers/hello_controller.js
  Import Stimulus controllers
      append    app/javascript/application.js
  Install Stimulus
         run    yarn add @hotwired/stimulus from "."
yarn add v1.22.22
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 1 new dependency.
info Direct dependencies
└─ @hotwired/stimulus@3.2.2
info All dependencies
└─ @hotwired/stimulus@3.2.2
Done in 1.30s.
         run  bundle install
Bundle complete! 14 Gemfile dependencies, 83 gems now installed.
Use `bundle info [gemname]` to see where a bundled gem is installed.
```

</details>

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
  database: task_manager_app_development
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
import TaskList from "./components/TaskList.js";

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

ログ
```
$ rails generate controller Home index
      create  app/controllers/home_controller.rb
       route  get 'home/index'
      invoke  erb
      create    app/views/home
      create    app/views/home/index.html.erb
      invoke  test_unit
      create    test/controllers/home_controller_test.rb
      invoke  helper
      create    app/helpers/home_helper.rb
      invoke    test_unit
```

</details>

app/views/home/index.html.erb の変更
```
<div id="task-list"></div>
```

config/routes.rb の変更
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

### 再起動

```
$ rails tmp:cache:clear
$ rails assets:precompile
$ rails server
```

プリコンパイルでエラーが出る場合は以下のファイルを削除してから再度実施
```
app\assets\builds\application.js
app\assets\builds\application.css
app\assets\builds\application.js.map
app\assets\builds\application.css.map
```
