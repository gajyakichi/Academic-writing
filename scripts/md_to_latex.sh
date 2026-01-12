#!/bin/bash

# MarkdownからLaTeXへの変換スクリプト
# Pandocを使用してMarkdownファイルを部分的にLaTeXに変換

set -e

SOURCE_MD="manuscript.md"
TEMP_TEX="manuscript_from_md.tex"

echo "========================================="
echo "📝 MarkdownをLaTeXに変換中..."
echo "========================================="

# Pandocがインストールされているか確認
if ! command -v pandoc &> /dev/null; then
    echo "❌ エラー: pandoc がインストールされていません"
    echo ""
    echo "インストール方法:"
    echo "  macOS: brew install pandoc"
    echo "  Ubuntu: sudo apt-get install pandoc"
    echo ""
    exit 1
fi

# Markdownファイルの存在確認
if [ ! -f "$SOURCE_MD" ]; then
    echo "❌ エラー: $SOURCE_MD が見つかりません"
    exit 1
fi

# Pandocで変換
echo "🔄 変換中..."
pandoc "$SOURCE_MD" \
    -f markdown \
    -t latex \
    --bibliography=references.bib \
    --citeproc \
    -o "$TEMP_TEX"

echo "✅ 変換完了！"
echo "出力ファイル: $TEMP_TEX"
echo ""
echo "次のステップ:"
echo "1. $TEMP_TEX の内容を確認"
echo "2. main_J.tex に手動で組み込む"
echo "   （図や表の挿入位置を調整）"
echo "========================================="
