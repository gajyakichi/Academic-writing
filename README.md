# Metabolism vs SCD Research Paper

このリポジトリは、代謝と SCD（Sudden Cardiac Death）に関する研究論文を管理するためのものです。

**日本語・英語の二言語対応**の論文執筆環境が構築されており、日本語で執筆した内容を自動的に英語に翻訳できます。

## 🏠 プロジェクトダッシュボード

研究プロジェクトを効率的に管理するための **統合ダッシュボード** が利用できます。

### VS Code 内で開く方法

**方法 1: Simple Browser（推奨）**

1. `⌘ + Shift + P` でコマンドパレットを開く
2. `Simple Browser: Show` を入力して選択
3. 以下の URL を入力：
   ```
   file:///Users/satoshiyamaguchi/Documents/Metabolism_vs_SCD/index.html
   ```

**方法 2: Finder から開く**

プロジェクトフォルダの `index.html` をダブルクリック

### ダッシュボード機能

- 📝 **研究ノート** - カレンダー＆リストビュー
- 📄 **論文執筆** - 日本語版・英語版・Markdown
- ⚙️ **コンパイル** - ワンクリック PDF 生成
- 📋 **研究計画書** - 編集＆PDF 出力
- 📊 **データ・表** - CSV/Excel 管理
- 🖼️ **図・画像** - 論文用画像管理
- ✓ **TODO リスト** - タスク管理（ブラウザ保存）
- 📝 **メモ** - 自動保存メモ帳
- 📌 **クイックリンク** - ドキュメント即座アクセス

## 🎯 主な機能

### ✅ 二言語対応（日本語 ⇔ 英語）

- 日本語版（`main_J.tex`）で執筆
- 自動翻訳スクリプトで英語版（`main.tex`）を生成
- 両方のバージョンをコンパイルして PDF 出力

### ✅ 図の管理

- `figures/` ディレクトリで画像を一元管理
- サンプル図（棒グラフ、散布図、生存曲線）付き
- PNG/PDF 両対応

### ✅ 表の作成

- 手動で LaTeX コードを記述
- CSV/Excel から LaTeX 表への自動変換
- サンプル表とテンプレート付き

### ✅ 参考文献管理

- BibTeX 形式（`references.bib`）
- 自動的に引用と参考文献リストを生成

### ✅ GitHub との連携

- バージョン管理
- リモートバックアップ
- 共同作業に対応

## 📁 ファイル構成

```
Metabolism_vs_SCD/
├── main_J.tex              # 日本語版論文（メイン編集ファイル）
├── main.tex                # 英語版論文（自動生成）
├── references.bib          # 参考文献データベース
├── figures/                # 図の格納ディレクトリ
│   ├── figure1_metabolism_comparison.{png,pdf}
│   ├── figure2_correlation.{png,pdf}
│   ├── figure3_survival_curve.{png,pdf}
│   └── README.md
├── tables/                   # CSVデータの格納ディレクトリ
│   ├── sample_baseline.csv
│   ├── sample_multivariate.csv
│   └── README.md
├── compile_J.sh            # 日本語版コンパイルスクリプト
├── compile.sh              # 英語版コンパイルスクリプト
├── translate.sh            # 日本語→英語 翻訳スクリプト
├── scripts/csv_to_latex.py         # CSV→LaTeX表 変換スクリプト
├── .latexmkrc              # 英語版LaTeX設定（LuaLaTeX）
├── .latexmkrc_jp           # 日本語版LaTeX設定（pLaTeX）
├── README.md               # このファイル
├── TABLES_GUIDE.md         # 表作成ガイド
└── CSV_TO_TABLE_GUIDE.md   # CSV変換ガイド
```

## 🚀 クイックスタート

### 1. 日本語で論文を執筆

```bash
# お好きなエディタで main_J.tex を編集
code main_J.tex  # VS Code
vim main_J.tex   # Vim
```

### 2. 日本語版をコンパイル

```bash
./scripts/compile_J.sh
```

→ `main_J.pdf` が生成されます

### 3. 英語版に翻訳

```bash
./scripts/translate.sh
```

→ `main.tex` に翻訳されます

### 4. 英語版をコンパイル

```bash
./scripts/compile.sh
```

→ `main.pdf` が生成されます

### ワンライナー（翻訳＋コンパイル）

```bash
./scripts/translate.sh && ./scripts/compile.sh
```

## 📊 図の追加方法

### 1. 画像ファイルを配置

```bash
# figures/ ディレクトリに配置
figures/my_figure.pdf
```

### 2. LaTeX で参照

```latex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=0.7\textwidth]{figures/my_figure.pdf}
  \caption{図の説明}
  \label{fig:my_figure}
\end{figure}
```

### 3. 本文で参照

```latex
図\ref{fig:my_figure}に示すように...
```

詳細は `figures/README.md` を参照。

## 📋 表の作成方法

### 方法 1: 手動で作成

```latex
\begin{table}[htbp]
  \centering
  \caption{表のタイトル}
  \label{tab:mytable}
  \begin{tabular}{lcc}
    \hline
    項目 & 列A & 列B \\
    \hline
    データ1 & 1.2 & 3.4 \\
    データ2 & 5.6 & 7.8 \\
    \hline
  \end{tabular}
\end{table}
```

詳細は `TABLES_GUIDE.md` を参照。

### 方法 2: CSV/Excel から自動変換

```bash
# CSVファイルを変換
python3 scripts/csv_to_latex.py tables/mydata.csv \
  -c "表のタイトル" \
  -l "tab:mytable"
```

詳細は `CSV_TO_TABLE_GUIDE.md` を参照。

## 📚 参考文献の追加

### 1. references.bib に追加

```bibtex
@article{your_article,
  author = {著者名},
  title = {論文タイトル},
  journal = {ジャーナル名},
  year = {2024},
  volume = {1},
  pages = {1--10}
}
```

### 2. 本文で引用

```latex
先行研究によると\cite{your_article}...
```

## 🔧 必要な環境

### LaTeX 環境

- **BasicTeX** または **TeX Live**
- **日本語パッケージ**

```bash
sudo tlmgr install collection-langjapanese
sudo tlmgr install latexmk
```

### Python（CSV 変換用）

- Python 3.x
- openpyxl（Excel ファイル用）

```bash
pip install openpyxl
```

## 🌐 GitHub 連携

このリポジトリは GitHub と連携しています。

```bash
# 変更をコミット
git add .
git commit -m "論文を更新"

# GitHubにプッシュ
git push
```

リポジトリ URL: https://github.com/gajyakichi/Metabolism_vs_SCD

## 📖 ドキュメント

- **`README.md`** - このファイル（全体概要）
- **`TABLES_GUIDE.md`** - LaTeX 表作成の詳細ガイド
- **`CSV_TO_TABLE_GUIDE.md`** - CSV/Excel 変換の詳細ガイド
- **`figures/README.md`** - 図の使い方
- **`tables/README.md`** - データファイルの使い方

## 🎓 ワークフロー例

### 日常的な執筆

1. `main_J.tex` を編集
2. `./scripts/compile_J.sh` で確認
3. 変更をコミット: `git add . && git commit -m "更新"`
4. GitHub にプッシュ: `git push`

### 投稿前の最終確認

1. `main_J.tex` を最終確認
2. `./scripts/translate.sh` で英語版を生成
3. 必要に応じて `main.tex` を手動調整
4. 両方をコンパイル: `./scripts/compile_J.sh && ./scripts/compile.sh`
5. PDF を確認: `main_J.pdf` と `main.pdf`

### データの追加

1. Excel でデータを作成
2. CSV UTF-8 で `tables/` に保存
3. `scripts/csv_to_latex.py` で変換
4. 論文に挿入

## 🛠️ トラブルシューティング

### コンパイルエラー

```bash
# 中間ファイルをクリーンアップ
latexmk -C
```

### 日本語が表示されない

```bash
# 日本語パッケージの確認
tlmgr list --only-installed | grep japan
```

### 図が表示されない

- ファイルパスが正しいか確認
- PDF 形式を使用（PNG→PDF に変換: `sips -s format pdf input.png --out output.pdf`）

## 📝 Tips

### 1. 定期的なバックアップ

```bash
# GitHubに定期的にプッシュ
git add .
git commit -m "Work in progress"
git push
```

### 2. ブランチを使った執筆

```bash
# 新しいセクション用のブランチを作成
git checkout -b new-section
# 編集...
git commit -am "新しいセクションを追加"
git checkout main
git merge new-section
```

### 3. PDF 生成ファイルは除外

`.gitignore` により、PDF や DVI などの生成ファイルは自動的に除外されます。

## 🎉 完成！

これで論文執筆の完全な環境が整いました！

- ✅ 二言語対応（日本語・英語）
- ✅ 図の管理
- ✅ 表の作成（手動・自動）
- ✅ 参考文献管理
- ✅ GitHub バックアップ
- ✅ 包括的なドキュメント

Happy writing! 📚✨

---

## 📞 サポート

質問や問題がある場合は、各ガイドファイルを参照するか、GitHub の Issues で報告してください。
