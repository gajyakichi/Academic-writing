#!/bin/bash

# 研究ノートサマリー生成スクリプト
# すべての研究ノートを統合して時系列のサマリーを生成

set -e

NOTES_DIR="research_notes"
OUTPUT_FILE="$NOTES_DIR/SUMMARY.md"

echo "========================================"
echo "📚 研究ノートサマリー生成中..."
echo "========================================"

if [ ! -d "$NOTES_DIR" ]; then
    echo "❌ エラー: $NOTES_DIR ディレクトリが見つかりません"
    exit 1
fi

# ノートファイルの数をカウント
NOTE_COUNT=$(find "$NOTES_DIR" -name "*.md" -not -name "SUMMARY.md" -not -name "README.md" | wc -l | tr -d ' ')

if [ "$NOTE_COUNT" -eq 0 ]; then
    echo "❌ エラー: 研究ノートが見つかりません"
    exit 1
fi

# サマリーファイル作成
cat > "$OUTPUT_FILE" << EOF
# Research Notes Summary

**プロジェクト**: Metabolism vs SCD  
**生成日時**: $(date +"%Y-%m-%d %H:%M:%S")  
**総ノート数**: $NOTE_COUNT

---

## 📅 タイムライン

EOF

# すべてのノートを日付順に処理
find "$NOTES_DIR" -name "*.md" -not -name "SUMMARY.md" -not -name "README.md" | sort -r | while read -r note_file; do
    echo "処理中: $(basename "$note_file")"
    
    # ノートの日付を抽出
    NOTE_DATE=$(basename "$note_file" .md)
    
    # ノートの内容を追加
    echo "### $NOTE_DATE" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    # 今日の目標セクションを抽出
    sed -n '/## 🎯 今日の目標/,/## ✅ 実施した作業/p' "$note_file" | grep -v "^##" | grep -v "^<!--" | grep -v "^$" | head -5 >> "$OUTPUT_FILE" 2>/dev/null || echo "（記録なし）" >> "$OUTPUT_FILE"
    
    echo "" >> "$OUTPUT_FILE"
    
    # Git活動履歴を抽出
    echo "**活動:**" >> "$OUTPUT_FILE"
    sed -n '/### Git活動履歴/,/### 変更されたファイル/p' "$note_file" | grep "^-" | head -5 >> "$OUTPUT_FILE" 2>/dev/null || echo "- （記録なし）" >> "$OUTPUT_FILE"
    
    echo "" >> "$OUTPUT_FILE"
    echo "---" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
done

# 統計情報を追加
cat >> "$OUTPUT_FILE" << EOF

## 📊 統計情報

- **総研究日数**: $NOTE_COUNT 日
- **最初の記録**: $(find "$NOTES_DIR" -name "*.md" -not -name "SUMMARY.md" -not -name "README.md" | sort | head -1 | xargs basename .md)
- **最新の記録**: $(find "$NOTES_DIR" -name "*.md" -not -name "SUMMARY.md" -not -name "README.md" | sort -r | head -1 | xargs basename .md)

## 🔗 個別ノート

EOF

# 個別ノートへのリンク
find "$NOTES_DIR" -name "*.md" -not -name "SUMMARY.md" -not -name "README.md" | sort -r | while read -r note_file; do
    NOTE_NAME=$(basename "$note_file" .md)
    echo "- [$NOTE_NAME]($NOTE_NAME.md)" >> "$OUTPUT_FILE"
done

echo ""
echo "✅ サマリーを生成しました: $OUTPUT_FILE"
echo ""
