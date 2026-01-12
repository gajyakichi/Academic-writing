# Scripts ディレクトリ

このディレクトリには、論文執筆と研究管理に使用するスクリプトを格納します。

## 📝 コンパイルスクリプト

### 論文のコンパイル

```bash
# 日本語版論文
./scripts/compile_J.sh

# 英語版論文
./scripts/compile.sh

# 研究計画書
./scripts/compile_proposal.sh
```

## 🌐 翻訳スクリプト

```bash
# 日本語→英語の自動翻訳
./scripts/translate.sh
```

## 📊 表作成スクリプト

```bash
# CSV/ExcelからLaTeX表へ変換
./scripts/csv_to_latex.py <入力ファイル> -c "タイトル" -l "ラベル"

# 例
./scripts/csv_to_latex.py tables/data.csv -c "患者の基本特性" -l "tab:baseline"
```

## 📄 Markdown 変換

```bash
# MarkdownからLaTeXへ変換
./scripts/md_to_latex.sh
```

## 📝 研究ノート管理

### 日次ノート作成

```bash
# 今日のノートを自動生成
./scripts/create_note.sh
```

### サマリー生成

```bash
# すべてのノートを統合
./scripts/generate_summary.sh
```

### カレンダービュー生成

```bash
# HTMLカレンダービューを生成
./scripts/export_calendar_view.sh

# ブラウザで開く
open research_notes/html/index.html
```

## 🔧 使い方のヒント

### エイリアスの設定（オプション）

頻繁に使うコマンドにエイリアスを設定すると便利です：

```bash
# ~/.zshrc または ~/.bashrc に追加
alias cj='./scripts/compile_J.sh'
alias ce='./scripts/compile.sh'
alias trans='./scripts/translate.sh'
alias note='./scripts/create_note.sh'
```

設定後：

```bash
source ~/.zshrc  # または source ~/.bashrc

# 簡単に実行
cj      # 日本語版コンパイル
ce      # 英語版コンパイル
trans   # 翻訳
note    # ノート作成
```

### プロジェクトルートから実行

スクリプトはプロジェクトルートディレクトリから実行してください：

```bash
cd ~/Documents/Metabolism_vs_SCD
./scripts/compile_J.sh
```

## 📋 スクリプト一覧

| スクリプト                | 用途                 | 出力                             |
| ------------------------- | -------------------- | -------------------------------- |
| `compile_J.sh`            | 日本語論文コンパイル | `main_J.pdf`                     |
| `compile.sh`              | 英語論文コンパイル   | `main.pdf`                       |
| `compile_proposal.sh`     | 研究計画書コンパイル | `proposal_J.pdf`                 |
| `translate.sh`            | 日英翻訳             | `main.tex`                       |
| `csv_to_latex.py`         | CSV→LaTeX 変換       | LaTeX コード                     |
| `md_to_latex.sh`          | Markdown→LaTeX 変換  | `manuscript_from_md.tex`         |
| `create_note.sh`          | 研究ノート作成       | `research_notes/<日付>.md`       |
| `generate_summary.sh`     | ノートサマリー生成   | `research_notes/SUMMARY.md`      |
| `export_calendar_view.sh` | カレンダービュー生成 | `research_notes/html/index.html` |

## 🆘 トラブルシューティング

### 実行権限エラー

```bash
# スクリプトに実行権限を付与
chmod +x scripts/*.sh scripts/*.py
```

### パスエラー

スクリプトは必ずプロジェクトルートから実行してください：

```bash
# ✅ 正しい
cd ~/Documents/Metabolism_vs_SCD
./scripts/compile_J.sh

# ❌ 間違い（scriptsディレクトリ内から実行）
cd scripts
./compile_J.sh
```
