#!/bin/bash

# 研究ノート自動作成スクリプト
# Gitコミット履歴から活動を抽出し、日次ノートを生成

set -e

NOTES_DIR="research_notes"
TODAY=$(date +%Y-%m-%d)
NOTE_FILE="$NOTES_DIR/${TODAY}.md"

echo "========================================"
echo "📝 研究ノート生成中..."
echo "日付: $TODAY"
echo "========================================"

# ノートディレクトリの作成
mkdir -p "$NOTES_DIR"

# 既存のノートがある場合は確認
if [ -f "$NOTE_FILE" ]; then
    echo "⚠️  今日のノートは既に存在します: $NOTE_FILE"
    echo "上書きしますか？ (y/n)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "キャンセルしました。"
        exit 0
    fi
fi

# 今日のGitコミットを取得
TODAY_COMMITS=$(git log --since="00:00:00" --until="23:59:59" --pretty=format:"- %s (%h)" 2>/dev/null || echo "")

# 今日変更されたファイル
CHANGED_FILES=$(git diff --name-only HEAD@{1day}..HEAD 2>/dev/null | head -10 || echo "")

# ノート作成
cat > "$NOTE_FILE" << EOF
# Research Note - $TODAY

## 📅 日付
$TODAY

## 🎯 今日の目標
<!-- ここに今日の目標を記入 -->


## ✅ 実施した作業

### Git活動履歴
EOF

if [ -n "$TODAY_COMMITS" ]; then
    echo "$TODAY_COMMITS" >> "$NOTE_FILE"
else
    echo "- （コミット履歴なし）" >> "$NOTE_FILE"
fi

cat >> "$NOTE_FILE" << EOF

### 変更されたファイル
EOF

if [ -n "$CHANGED_FILES" ]; then
    echo "$CHANGED_FILES" | sed 's/^/- /' >> "$NOTE_FILE"
else
    echo "- （変更なし）" >> "$NOTE_FILE"
fi

cat >> "$NOTE_FILE" << EOF

### 手動メモ
<!-- ここに詳細なメモを記入 -->


## 📊 データ・解析
<!-- データ収集、解析結果などを記入 -->


## 💡 アイデア・気づき
<!-- 研究中に得た気づきやアイデアを記入 -->


## 📚 参考文献・リソース
<!-- 今日読んだ論文やリソースを記入 -->


## ⚠️ 問題点・課題
<!-- 直面した問題や今後の課題を記入 -->


## 📝 次回やること
<!-- 次回の作業予定を記入 -->


---
*自動生成: $(date +"%Y-%m-%d %H:%M:%S")*
EOF

echo ""
echo "✅ 研究ノートを生成しました: $NOTE_FILE"
echo ""
echo "次のステップ:"
echo "1. ノートを編集: code $NOTE_FILE"
echo "2. または: vim $NOTE_FILE"
echo ""
