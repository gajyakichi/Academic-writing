# CSV/Excel から LaTeX 表への変換ガイド

Excel や CSV ファイルのデータを簡単に LaTeX 表に変換する方法を説明します。

## 方法 1: 変換スクリプトの使用（推奨）

### 必要な環境

- Python 3.x
- openpyxl（Excel ファイル用）

Excel ファイルを使う場合は、以下をインストール：

```bash
pip install openpyxl
```

### 基本的な使い方

```bash
# CSVファイルから変換
python3 scripts/csv_to_latex.py tables/sample_baseline.csv

# キャプションとラベルを指定
python3 scripts/csv_to_latex.py tables/sample_baseline.csv \
  -c "患者の基本特性" \
  -l "tab:baseline"

# ファイルに出力
python3 scripts/csv_to_latex.py tables/sample_baseline.csv \
  -c "患者の基本特性" \
  -l "tab:baseline" \
  -o tables/baseline_table.tex

# Excelファイルから変換
python3 scripts/csv_to_latex.py tables/mydata.xlsx \
  -c "表のタイトル" \
  -l "tab:mydata"
```

### オプション

- `-o, --output`: 出力ファイル名（指定しない場合は標準出力）
- `-c, --caption`: 表のキャプション
- `-l, --label`: 表のラベル（`\ref{}`で参照用）
- `--no-header`: ヘッダー行がない場合

### 実行例

#### 例 1: 基本特性表の変換

```bash
python3 scripts/csv_to_latex.py tables/sample_baseline.csv \
  -c "患者の基本特性" \
  -l "tab:baseline" \
  -o tables/baseline.tex
```

生成される LaTeX コード：

```latex
\begin{table}[htbp]
  \centering
  \caption{患者の基本特性}
  \label{tab:baseline}
  \begin{tabular}{lccc}
    \hline
    変数 & 対照群 & 治療群 & p値 \\
    \hline
    年齢（歳） & 65.2 ± 8.3 & 64.8 ± 7.9 & 0.75 \\
    男性（%） & 60.0 & 58.0 & 0.82 \\
    ...
    \hline
  \end{tabular}
\end{table}
```

#### 例 2: 多変量解析の結果

```bash
python3 scripts/csv_to_latex.py tables/sample_multivariate.csv \
  -c "SCDリスク因子の多変量解析" \
  -l "tab:multivariate" \
  -o tables/multivariate.tex
```

### LaTeX 文書への組み込み

生成されたファイルを論文に含める：

```latex
% main.texまたはmain_J.texに追加
\input{tables/baseline.tex}
```

または、生成されたコードを直接コピー＆ペースト。

## 方法 2: csvsimple パッケージの使用

CSV ファイルを直接 LaTeX 文書から読み込む方法もあります。

### 設定

プリアンブルに追加：

```latex
\usepackage{csvsimple}
```

### 基本的な使い方

```latex
\begin{table}[htbp]
  \centering
  \caption{患者の基本特性}
  \label{tab:baseline}
  \csvautotabular{tables/sample_baseline.csv}
\end{table}
```

### カスタマイズ例

```latex
\begin{table}[htbp]
  \centering
  \caption{患者の基本特性}
  \label{tab:baseline}
  \csvreader[
    tabular=lccc,
    table head=\hline 変数 & 対照群 & 治療群 & p値 \\\hline,
    late after line=\\,
    table foot=\hline
  ]{tables/sample_baseline.csv}{}%
  {\csvcoli & \csvcolii & \csvcoliii & \csvcoliv}
\end{table}
```

## 方法 3: オンラインツールの使用

### Excel2LaTeX（Excel アドイン）

1. https://ctan.org/pkg/excel2latex からダウンロード
2. Excel に表を作成
3. 範囲を選択して Excel2LaTeX マクロを実行
4. 生成された LaTeX コードをコピー

### Tables Generator

1. https://www.tablesgenerator.com/latex_tables にアクセス
2. 「File」→「Paste table data」で CSV をペースト
3. または手動でデータを入力
4. 「Generate」で LaTeX コードを生成

## データファイルの準備

### CSV ファイルの形式

```csv
列1,列2,列3,列4
データ1,データ2,データ3,データ4
データ5,データ6,データ7,データ8
```

**重要なポイント:**

- UTF-8 エンコーディングで保存
- カンマ区切り（CSV = Comma Separated Values）
- 最初の行がヘッダー（列名）

### Excel ファイルからの出力

1. Excel でデータを作成
2. 「ファイル」→「名前を付けて保存」
3. ファイル形式で「CSV UTF-8（カンマ区切り）」を選択
4. 保存

## ワークフロー例

### 1. データの準備

```bash
# tables/ ディレクトリにCSVファイルを配置
tables/
  patient_baseline.csv
  treatment_outcomes.csv
  multivariate_analysis.csv
```

### 2. LaTeX 表への変換

```bash
# すべてのCSVファイルを変換
for file in tables/*.csv; do
  basename=$(basename "$file" .csv)
  python3 scripts/csv_to_latex.py "$file" \
    -c "表のタイトル" \
    -l "tab:$basename" \
    -o "tables/${basename}.tex"
done
```

### 3. 論文への組み込み

```latex
% main_J.tex

\section{結果}

\input{tables/patient_baseline.tex}

患者の基本特性を表\ref{tab:patient_baseline}に示す。

\input{tables/treatment_outcomes.tex}

治療効果を表\ref{tab:treatment_outcomes}に示す。
```

## トラブルシューティング

### エラー: 特殊文字が正しく表示されない

CSV ファイルが UTF-8 で保存されているか確認：

```bash
# ファイルのエンコーディングを確認
file -I tables/your_file.csv

# UTF-8に変換（必要な場合）
iconv -f SHIFT-JIS -t UTF-8 tables/your_file.csv > tables/your_file_utf8.csv
```

### エラー: openpyxl がない

Excel files 用のライブラリをインストール：

```bash
pip install openpyxl
```

### 列が揃わない

- CSV ファイルの各行の列数が同じか確認
- 余分なカンマがないか確認

## 便利な Tips

### 1. 一括変換スクリプト

```bash
#!/bin/bash
# convert_all_csv.sh

for csv in tables/*.csv; do
  name=$(basename "$csv" .csv)
  python3 scripts/csv_to_latex.py "$csv" \
    -c "$(echo $name | tr '_' ' ')" \
    -l "tab:$name" \
    -o "tables/${name}.tex"
  echo "変換完了: $csv → tables/${name}.tex"
done
```

### 2. 数値の書式設定

CSV で数値を整形してから変換：

```csv
変数,値
年齢（歳）,65.2 $\pm$ 8.3
BMI (kg/m²),24.5 $\pm$ 3.2
```

### 3. 太字や強調

CSV の中で LaTeX コマンドを使用：

```csv
リスク因子,p値
年齢,\textbf{<0.001}
性別,0.07
```

## サンプルファイル

プロジェクトに含まれるサンプルファイル：

- `tables/sample_baseline.csv` - 患者の基本特性
- `tables/sample_multivariate.csv` - 多変量解析の結果

これらを参考に独自の CSV ファイルを作成してください。

## まとめ

1. **推奨方法**: `scripts/csv_to_latex.py` スクリプトを使用
2. **簡単な方法**: オンラインツール（Tables Generator）
3. **直接読み込み**: csvsimple パッケージ

データの性質や作業フローに応じて、最適な方法を選んでください！
