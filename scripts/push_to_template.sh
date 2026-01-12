#!/bin/bash

# テンプレートリポジトリへ機能更新をプッシュするスクリプト

set -e

echo "🎯 テンプレートリポジトリへの更新を開始..."
echo ""

# 現在のブランチを保存
CURRENT_BRANCH=$(git branch --show-current)
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
TEMP_BRANCH="template-update-$TIMESTAMP"

# 未コミットの変更があるか確認
if [[ -n $(git status -s) ]]; then
    echo "⚠️  未コミットの変更があります"
    echo ""
    git status -s
    echo ""
    read -p "現在の変更をスタッシュしますか？ (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git stash push -m "Auto-stash before template update $TIMESTAMP"
        STASHED=true
    else
        echo "❌ 処理を中止します。先に変更をコミットしてください。"
        exit 1
    fi
fi

# テンプレート用ブランチを作成
echo "📝 テンプレート用ブランチを作成: $TEMP_BRANCH"
git checkout -b "$TEMP_BRANCH"

# テンプレート用.gitignoreを一時適用
if [ -f .gitignore.template ]; then
    echo "📋 テンプレート用.gitignoreを適用..."
    cp .gitignore.template .gitignore
else
    echo "⚠️  .gitignore.templateが見つかりません"
fi

# ステージングをクリア
git reset

# テンプレートに含めるファイルを選択的にステージング
echo ""
echo "📁 テンプレート機能をステージング..."
git add -f index.html
git add -f research_notes/html/index.html
git add -f scripts/*.sh 2>/dev/null || true
git add -f README.md 2>/dev/null || true
git add -f BEGINNER_GUIDE.md 2>/dev/null || true
git add -f CSV_TO_TABLE_GUIDE.md 2>/dev/null || true
git add -f TABLES_GUIDE.md 2>/dev/null || true
git add -f TEMPLATE_WORKFLOW.md 2>/dev/null || true
git add -f .gitignore.template 2>/dev/null || true
git add -f .gitignore

# 確認
echo ""
echo "📋 以下のファイルがテンプレートにプッシュされます:"
echo "================================================"
git status --short
echo "================================================"
echo ""

read -p "続行しますか？ (y/n): " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ キャンセルしました"
    git checkout "$CURRENT_BRANCH"
    git branch -D "$TEMP_BRANCH" 2>/dev/null || true
    if [ "$STASHED" = true ]; then
        git stash pop
    fi
    exit 1
fi

# コミットメッセージの入力
echo ""
echo "📝 コミットメッセージを入力してください:"
read -r COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
    echo "❌ コミットメッセージが空です"
    git checkout "$CURRENT_BRANCH"
    git branch -D "$TEMP_BRANCH" 2>/dev/null || true
    if [ "$STASHED" = true ]; then
        git stash pop
    fi
    exit 1
fi

# コミット
git commit -m "$COMMIT_MSG"

echo ""
echo "🚀 テンプレートリポジトリにプッシュ中..."

# テンプレートリポジトリにプッシュ
if git push template HEAD:main; then
    echo ""
    echo "✅ テンプレートリポジトリに更新をプッシュしました！"
    echo "   リポジトリ: https://github.com/gajyakichi/Academic-writing"
else
    echo ""
    echo "❌ プッシュに失敗しました"
    git checkout "$CURRENT_BRANCH"
    git branch -D "$TEMP_BRANCH" 2>/dev/null || true
    if [ "$STASHED" = true ]; then
        git stash pop
    fi
    exit 1
fi

# 元のブランチに戻る
echo ""
echo "🔄 元のブランチに戻ります..."
git checkout "$CURRENT_BRANCH"

# テンプレート用ブランチを削除
git branch -D "$TEMP_BRANCH" 2>/dev/null || true

# スタッシュを復元
if [ "$STASHED" = true ]; then
    echo "📦 スタッシュを復元..."
    git stash pop
fi

echo ""
echo "✅ 完了！元のブランチに戻りました"
echo ""
echo "💡 次のステップ:"
echo "   1. テンプレートリポジトリで変更を確認"
echo "   2. 個別研究の作業を続ける"
