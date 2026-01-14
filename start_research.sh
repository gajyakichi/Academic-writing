#!/bin/bash

# ============================================================
# 研究スタートスクリプト
# ダッシュボード、カレンダー、エディタを一括起動
# ============================================================

set -e

echo "🚀 研究環境を起動中..."
echo ""

# プロジェクトディレクトリに移動
cd "$(dirname "$0")"

# 1. ローカルサーバーを起動（バックグラウンド）
echo "📡 ローカルサーバーを起動..."
cd research_notes/html
python3 -m http.server 8013 > /dev/null 2>&1 &
SERVER_PID=$!
cd ../..

# サーバーの起動を待つ
sleep 2

# 2. ダッシュボードをブラウザで開く
echo "📋 プロジェクトダッシュボードを開く..."
open index.html

# 3. 研究ノートカレンダーを開く
echo "📅 研究ノートカレンダーを開く..."
sleep 1
open -a "Google Chrome" http://localhost:8013/index.html

# 4. VS Codeでプロジェクトを開く（コマンドが存在する場合のみ）
if command -v code &> /dev/null; then
    echo "💻 VS Code でプロジェクトを開く..."
    sleep 1
    code .
else
    echo "⚠️  VS Code (code コマンド) が見つかりません（スキップ）"
fi

# 5. 今日のノートが存在するか確認
TODAY=$(date +%Y-%m-%d)
NOTE_FILE="research_notes/${TODAY}.md"

if [ -f "$NOTE_FILE" ]; then
    echo "✅ 今日のノート (${TODAY}.md) が既に存在します"
else
    echo "📝 今日のノート (${TODAY}.md) を作成中..."
    cat > "$NOTE_FILE" << EOF
# 研究ノート: ${TODAY}

## タグ

#研究 #論文

---

## 🎯 今日の目標

<!-- ここに今日の目標を記入 -->

## ✅ 実施した作業

<!-- 作業内容を記入 -->

## 📊 データ・解析

<!-- データ収集、解析結果などを記入 -->

## 💡 アイデア・気づき

<!-- 研究中に得た気づきやアイデアを記入 -->

## 📚 参考文献・リソース

<!-- 今日読んだ論文やリソースを記入 -->

## ⚠️ 問題点・課題

<!-- 直面した問題や今後の課題を記入 -->

## 📝 次回やること

- [ ] 

<!-- 次回の作業予定を記入 -->

---

_作成日時: $(date '+%Y-%m-%d %H:%M:%S')_
EOF
    echo "✅ 今日のノートを作成しました: ${NOTE_FILE}"
    
    # カレンダービューを更新
    echo "🔄 カレンダービューを更新中..."
    npm run notes:export > /dev/null 2>&1
fi

# 6. 今日のノートを開く
if command -v code &> /dev/null; then
    echo "📖 今日のノートを開く..."
    code "$NOTE_FILE"
else
    echo "📖 今日のノートを開く... (Finderで)"
    open "$NOTE_FILE"
fi

echo ""
echo "✨ 研究環境の起動が完了しました！"
echo ""
echo "📌 起動したもの:"
echo "   ✅ プロジェクトダッシュボード (Finder)"
echo "   ✅ 研究ノートカレンダー (Chrome: http://localhost:8013/)"
echo "   ✅ VS Code プロジェクト"
echo "   ✅ 今日のノート (${TODAY}.md)"
echo ""
echo "🛑 ローカルサーバーを停止するには:"
echo "   kill ${SERVER_PID}"
echo ""
echo "💡 研究を楽しんでください！"
