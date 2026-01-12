# Research Notes

このディレクトリには、日々の研究活動を記録するノートを保存します。

## 📝 使い方

### 1. 新しい研究ノートを作成

```bash
./create_note.sh
```

これにより、今日の日付のノート（例：`2026-01-12.md`）が自動生成されます。

**自動的に含まれる内容:**

- 今日の Git コミット履歴
- 変更されたファイル一覧
- メモ用のテンプレートセクション

### 2. ノートを編集

```bash
# VS Code
code research_notes/2026-01-12.md

# Vim
vim research_notes/2026-01-12.md
```

### 3. サマリーを生成

```bash
./generate_summary.sh
```

すべての no ノートを統合した `SUMMARY.md` が生成されます。

## 📋 ノートのテンプレート

各ノートには以下のセクションが含まれます：

- **🎯 今日の目標** - その日の目標
- **✅ 実施した作業** - Git 履歴と手動メモ
- **📊 データ・解析** - データ収集や解析結果
- **💡 アイデア・気づき** - 研究中の気づき
- **📚 参考文献・リソース** - 読んだ論文など
- **⚠️ 問題点・課題** - 直面した問題
- **📝 次回やること** - 次回の予定

## 💡 Tips

### 定期的にコミット

研究ノートも Git で管理して、バックアップを取りましょう：

```bash
git add research_notes/
git commit -m "研究ノート更新: $(date +%Y-%m-%d)"
git push
```

### 週次・月次レビュー

定期的にサマリーを生成して、進捗を確認：

```bash
./generate_summary.sh
open research_notes/SUMMARY.md
```

### 検索

すべてのノートから特定のキーワードを検索：

```bash
grep -r "キーワード" research_notes/
```

## 📁 ファイル構成

```
research_notes/
├── README.md           # このファイル
├── SUMMARY.md          # 自動生成されるサマリー
├── 2026-01-12.md       # 日次ノート
├── 2026-01-13.md
└── ...
```

## 🔄 ワークフロー例

### 研究開始時

```bash
# 今日のノートを作成
./create_note.sh

# ノートを開いて目標を記入
code research_notes/$(date +%Y-%m-%d).md
```

### 研究中

作業をしながら：

1. コミットメッセージを丁寧に書く
2. 重要な気づきをノートに追記

### 研究終了時

```bash
# ノートに今日のまとめを追記
# 次回の予定を記入

# ノートをコミット
git add research_notes/
git commit -m "研究ノート: $(date +%Y-%m-%d)"
git push
```

### 週末・月末

```bash
# サマリーを生成して振り返り
./generate_summary.sh
open research_notes/SUMMARY.md
```

---

**研究活動を記録して、進捗を可視化しましょう！** 📊✨
