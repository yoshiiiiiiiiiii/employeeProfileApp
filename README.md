# 社員プロフィール閲覧アプリケーション

社員プロフィール閲覧アプリケーションを作成。<br>
各社員情報を登録して社員番号、社員ID、名前、趣味の閲覧が可能。

## 環境

フロントエンド：React（Atomicデザインを採用。詳細は補足のURLを参照）、TypeScript<br>
バックエンド：SpringBoot、PostgreSQL、Maven<br>

## プロジェクト構成

profileApp<br>
　└src<br>
　　└main<br>
　　　├frontendapp（Reactの実装が格納されています。これがなくてもresourcesのstatic配下にビルドした資材を格納すれば動きます）<br>
　　　│├build（dev run buildコマンドを実行するとこのフォルダが作成される）<br>
　　　│├node_modules（使用するライブラリが格納されている。無視していい）<br>
　　　│├public<br>
　　　││└index.html（必要最小限のhtmlの内容が記載されている。内容はsrc配下で定義している）<br>
　　　│├src<br>
　　　││├components（Atomicデザインを採用した各コンポーネントを格納）<br>
　　　│││　├atoms<br>
　　　│││　├molecules<br>
　　　│││　├organisms<br>
　　　│││　├templates<br>
　　　│││　└pages<br>
　　　│││<br>
　　　││├contexts（Reduxの定義ファイルを格納している。Reduxの概念については補足のURLを参照）<br>
　　　│││　├actions<br>
　　　│││　├reducers<br>
　　　│││　└stores<br>
　　　│││<br>
　　　││├hooks（カスタムフック（Javaでいう関数のようなもの）を格納）<br>
　　　││├router（ページのルーティングを定義している。各ページの内容はcomponents配下のpagesフォルダに格納されているファイルを参照）<br>
　　　││├theme（アプリ全体共通で使用するCSSの定義をしている）<br>
　　　││├types（APIの型を定義したファイルを格納している）<br>
　　　││├App.tsx（routerフォルダ配下のRouter.tsxで定義しているルーティングを読み込んでいる）<br>
　　　││└index.tsx（index.htmlで定義したdivタグrootに直結したファイル。ここからApp.tsxの内容を見ている）<br>
　　　│├package.json（Reactの設定ファイル）<br>
　　　│└tsconfig.json（Typescriptの設定ファイル）<br>
　　　│<br>
　　　├java<br>
　　　│└profileApp<br>
　　　│　├common<br>
　　　│　├controller（コントローラークラスとDTOを格納）<br>
　　　│　├domain（Serviceクラスとエンティティを格納）<br>
　　　│　├repository（リポジトリクラスを格納）<br>
　　　│　└ProfileApplication.java（実行クラス）<br>
　　　│<br>
　　　└resources<br>
　　　　├static（Reactをビルドした資材を格納）<br>
　　　　├alpha.png<br>
　　　　├application.properties<br>
　　　　├data.sql（DDL）<br>
　　　　└schema.sql（DML）<br>

## 主な使用外部ライブラリ

【フロントエンド】<br>
・react-router-dom（ルーティングをするのに使用している）<br>
・axios（api送受信用ライブラリ。これを使用してバックエンドとデータの受け渡しを行っている）<br>
・chakra-ui（UIコンポーネントを提供しているライブラリ。デザインは主にこちらを使用している）<br>
・zod（フロントエンド側で入力フォームのバリデーションを行うために使用している）<br>

【バックエンド】<br>
・JPA（DB操作用ライブラリ）

## 事前準備と実行方法

①Javaの実行環境とPostgreSQLをインストールしてください。編集もしたい方はNode.jsもインストールしてください。<br>

②PostgreSQLのデータベース、ユーザ、各テーブルを作成してください。<br>
<span style="color: red;">※データベースの設定内容等はapplication.propertiesに定義しているので適宜編集してください</span><br>
<span style="color: red;">※DML、DDLはresources配下に格納しているので活用してください</span>

③アプリケーションを実行し、http://localhost:8080 に接続する<br>

## 補足

・自分でフロントエンドを編集したい場合、VSCodeを使用して編集するのがおすすめです。<br>
・編集後は、フロントエンドのルートプロジェクトに移動してnpm run build コマンドを入力してプロジェクトをビルドしてください。<br>
・build配下にビルドされた資材が作られるのでそれをresourcesのstatic配下に持ってきてMavenプロジェクトを起動してください<br>
・Atomicデザインの概念ついては以下を参照<br>
　https://zenn.dev/kazu1/articles/c395f18633275c<br>
・Redux（ページをまたいでデータの共有をする方法。Javaでいうコンテキストのようなもの）の概念については以下を参照<br>
　https://qiita.com/FarStep131/items/ad834facc57a443a9dc3<br>