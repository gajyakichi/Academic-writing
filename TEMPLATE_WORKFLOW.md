# テンプレート更新ワークフロー

このガイドでは、個別研究を進めながらテンプレート機能のみを Academic-writing リポジトリに反映する方法を説明します。

## 🎯 目標

- ✅ 個別研究内容は `origin` (Metabolism_vs_SCD) にのみ push
- ✅ テンプレート機能は `template` (Academic-writing) に push
- ✅ 両方を効率的に管理

## 📋 リモート構成

```bash
origin   -> https://github.com/gajyakichi/Metabolism_vs_SCD.git (個別研究)
template -> https://github.com/gajyakichi/Academic-writing.git (テンプレート)
```

## 🔄 日常の研究作業（個別研究リポジトリ）

### 通常の研究作業とコミット

```bash
# 研究内容の編集・追加
# ... 論文執筆、データ追加、研究ノート作成など ...

# 個別研究リポジトリにコミット＆プッシュ
git add .
git commit -m "研究ノート追加: 実験結果の分析"
git push origin main
```

## ⚙️ テンプレート機能の更新フロー

### Step 1: 機能追加の開発

現在の研究フォルダで機能を開発・テストします。

```bash
# 例: index.htmlにTODO機能を追加
# ... 開発とテスト ...
```

### Step 2: テンプレート用ブランチの作成

```bash
# テンプレート用の新しいブランチを作成
git checkout -b template-feature
```

### Step 3: .gitignore の適用

```bash
# テンプレート用の.gitignoreを適用
cp .gitignore.template .gitignore

# 研究固有ファイルを除外して、テンプレート機能のみステージング
git add index.html
git add research_notes/html/index.html
git add scripts/
git add README.md
git add BEGINNER_GUIDE.md
git add .gitignore

# 確認: 研究固有ファイルが含まれていないことをチェック
git status
```

### Step 4: テンプレートリポジトリにプッシュ

```bash
# テンプレート機能のコミット
git commit -m "機能追加: TODO & メモ機能をindex.htmlに追加"

# テンプレートリポジトリにプッシュ
git push template template-feature:main

# または、プルリクエストを作成する場合
git push template template-feature
```

### Step 5: 元のブランチに戻る

```bash
# メインブランチに戻る
git checkout main

# テンプレート用ブランチを削除（任意）
git branch -d template-feature

# 元の.gitignoreに戻す（個別研究用）
git checkout .gitignore
```

## 📝 簡略化スクリプト

以下のスクリプトを使うと、テンプレートへのプッシュが簡単になります。

### `scripts/push_to_template.sh`

```bash
#!/bin/bash

echo "🎯 テンプレートリポジトリへの更新を開始..."

# 現在のブランチを保存
CURRENT_BRANCH=$(git branch --show-current)

# テンプレート用ブランチを作成
git checkout -b template-update-$(date +%Y%m%d-%H%M%S)

# テンプレート用.gitignoreを適用
cp .gitignore.template .gitignore

# テンプレートに含めるファイルを選択的にステージング
echo "📁 テンプレート機能をステージング..."
git add index.html
git add research_notes/html/index.html
git add scripts/*.sh
git add README.md
git add BEGINNER_GUIDE.md
git add CSV_TO_TABLE_GUIDE.md
git add TABLES_GUIDE.md
git add .gitignore

# 確認
echo ""
echo "📋 以下のファイルがテンプレートにプッシュされます:"
git status --short

echo ""
read -p "続行しますか？ (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # コミットメッセージの入力
    echo "コミットメッセージを入力してください:"
    read -r COMMIT_MSG

    git commit -m "$COMMIT_MSG"

    # テンプレートリポジトリにプッシュ
    git push template HEAD:main

    echo "✅ テンプレートリポジトリに更新をプッシュしました！"
else
    echo "❌ キャンセルしました"
fi

# 元のブランチに戻る
git checkout "$CURRENT_BRANCH"

# テンプレート用ブランチを削除
git branch -D template-update-*

echo "✅ 元のブランチに戻りました"
```

## 🎨 個別研究用の.gitignore

個別研究リポジトリ用の`.gitignore`も作成しておくと便利です：

```gitignore
# LaTeX一時ファイル
*.aux
*.log
*.bbl
*.blg
*.out
*.toc
*.synctex.gz

# システムファイル
.DS_Store

# エディタ設定
.vscode/
.idea/
```

## 📊 ファイル管理の原則

### テンプレートに含めるもの ✅

- `index.html` (テンプレート機能)
- `research_notes/html/index.html` (UI 機能)
- `scripts/*.sh` (自動化スクリプト)
- `README.md`, ガイドファイル
- サンプルファイル (例: `sample.csv`)

### テンプレートに含めないもの ❌

- `*.tex` (個別研究の論文)
- `manuscript.md` (個別研究の原稿)
- `research_notes/**/*.md` (研究ノート内容)
- `tables/*.csv` (研究データ)
- `figures/*` (研究の図)
- `references.bib` (個別研究の参考文献)

## 🔄 新しい研究プロジェクトの開始

テンプレートから新しい研究を始める場合：

```bash
# テンプレートをクローン
git clone https://github.com/gajyakichi/Academic-writing.git NewResearch

cd NewResearch

# 新しい研究用リモートを追加
git remote rename origin template
git remote add origin https://github.com/gajyakichi/NewResearch.git

# プッシュ
git push origin main
```

## 💡 ヒント

1. **定期的な同期**: テンプレートの更新を個別研究に取り込む

   ```bash
   git fetch template
   git merge template/main
   ```

2. **機能追加時**: 常にテンプレート化を意識する

   - `[研究名]` のようなプレースホルダーを使用
   - ハードコードされた研究固有情報を避ける

3. **テスト**: テンプレートにプッシュする前に、別の研究フォルダでテスト
