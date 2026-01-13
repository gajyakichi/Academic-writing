# 複数デバイスでの使い方

このプロジェクトは **Git ベース**で複数デバイス間で同期できます。

---

## 🚀 初回セットアップ（新しいデバイス）

### 1. リポジトリをクローン

```bash
git clone <your-repo-url>
cd Metabolism_vs_SCD
```

### 2. 依存関係の確認

- **LaTeX**: pLaTeX または LuaLaTeX
- **Node.js**: v14 以上（研究ノートのカレンダービュー生成用）
- **Python 3**: ローカルサーバー用（オプション）

### 3. すぐに使える

```bash
# LaTeX コンパイル（日本語版）
./scripts/compile_J.sh

# 研究ノートのカレンダービュー生成
npm run notes:export

# カレンダーを開く
npm run notes:serve
# → http://localhost:8000/index.html
```

---

## 📝 日常の作業フロー

### デバイス A で作業開始

```bash
# 最新の変更を取得
git pull

# 作業（論文執筆、研究ノート作成など）

# カレンダービューを更新
npm run notes:export

# 変更をコミット
git add .
git commit -m "論文のIntroduction修正、研究ノート追加"
git push
```

### デバイス B で続きを作業

```bash
# 最新の変更を取得
git pull

# 作業を続ける

# 作業後、同様にプッシュ
git add .
git commit -m "Methods セクション追加"
git push
```

---

## 🔄 スムーズな同期のコツ

### ✅ 良い習慣

1. **作業開始時に `git pull`**  
   最新の状態から始める

2. **こまめにコミット**  
   論理的な単位でコミット（1 日 1 回ではなく、1 作業ごと）

3. **作業終了時に `git push`**  
   他のデバイスから見えるようにする

4. **コンフリクトを避ける**  
   同じファイルを複数デバイスで同時編集しない

### ⚠️ 注意点

- **生成ファイルはコミットしない**

  - `*.pdf`, `*.aux`, `notes_data.js`, `research_notes/html/index.html` など
  - `.gitignore` で除外済み

- **コンフリクトが起きたら**
  ```bash
  # 手動でマージ
  git pull
  # エディタでコンフリクトを解決
  git add <resolved-files>
  git commit
  git push
  ```

---

## 🛠️ 推奨ツール

### エディタ

- **VS Code** + LaTeX Workshop 拡張機能
  - LaTeX コンパイルが統合
  - Git 操作も簡単

### ターミナル

```bash
# エイリアスを設定すると便利
alias latex-compile='./scripts/compile_J.sh'
alias notes-export='npm run notes:export'
alias notes-serve='npm run notes:serve'
```

---

## 📂 ファイル構成（複数デバイスで共有されるもの）

```
✅ 共有される（Git管理）:
- *.tex (テンプレート以外は .gitignore で除外)
- references.bib (サンプル以外は除外)
- scripts/**/*
- research_notes/*.md (README以外は除外)
- WRITING_GUIDELINES.md
- package.json

❌ 共有されない（生成ファイル）:
- *.pdf
- *.aux, *.log, *.bbl
- research_notes/html/notes_data.js
- research_notes/html/index.html
```

---

## 🚨 トラブルシューティング

### Q: `npm run notes:export` でエラーが出る

```bash
# Node.js がインストールされているか確認
node --version

# package.json があるか確認
ls package.json
```

### Q: LaTeX コンパイルエラー

```bash
# pLaTeX がインストールされているか確認
platex --version

# 日本語版をコンパイル
./scripts/compile_J.sh
```

### Q: Git プッシュ時に認証エラー

```bash
# SSH キーまたは Personal Access Token を設定
# GitHub の場合: Settings → Developer settings → Personal access tokens
```

---

## 💡 高度な使い方

### 別のブランチで実験的な変更

```bash
# 新しいブランチを作成
git checkout -b experimental-methods

# 実験的な変更を加える

# 良ければマージ
git checkout main
git merge experimental-methods
```

### リモートリポジトリの追加（バックアップ）

```bash
# GitHub と GitLab の両方にプッシュ
git remote add github <github-url>
git remote add gitlab <gitlab-url>

git push github main
git push gitlab main
```

---

## 📚 参考

- [Git 基本操作](https://git-scm.com/book/ja/v2)
- [LaTeX ワークフロー](./BEGINNER_GUIDE.md)
- [執筆ガイドライン](./WRITING_GUIDELINES.md)
