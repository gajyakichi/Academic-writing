#!/bin/bash

# 研究計画書コンパイルスクリプト（日本語版）
# proposal_J.tex をコンパイルしてPDFを生成

set -e

echo "========================================"
echo "📝 研究計画書をコンパイル中..."
echo "========================================"

# latexmkを使用してコンパイル
latexmk -r .latexmkrc_jp proposal_J.tex

echo ""
echo "✅ コンパイル完了！"
echo "出力ファイル: proposal_J.pdf"
echo ""
