#!/usr/bin/env python3
"""
CSV/ExcelファイルをLaTeX表に変換するスクリプト

使い方:
  python csv_to_latex.py input.csv [options]
  python csv_to_latex.py input.xlsx [options]

オプション:
  -o, --output    出力ファイル名（デフォルト: 標準出力）
  -c, --caption   表のキャプション
  -l, --label     表のラベル（\ref{}で参照用）
  --no-header     ヘッダー行がない場合
"""

import sys
import argparse
import csv
from pathlib import Path

def read_csv(filepath, has_header=True):
    """CSVファイルを読み込む"""
    with open(filepath, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        data = list(reader)
    
    if has_header and data:
        header = data[0]
        rows = data[1:]
    else:
        header = None
        rows = data
    
    return header, rows

def read_excel(filepath, has_header=True):
    """Excelファイルを読み込む（openpyxl使用）"""
    try:
        import openpyxl
    except ImportError:
        print("Error: openpyxl が必要です。", file=sys.stderr)
        print("インストール: pip install openpyxl", file=sys.stderr)
        sys.exit(1)
    
    wb = openpyxl.load_workbook(filepath)
    ws = wb.active
    
    data = []
    for row in ws.iter_rows(values_only=True):
        # 空の行をスキップ
        if any(cell is not None for cell in row):
            data.append([str(cell) if cell is not None else '' for cell in row])
    
    if has_header and data:
        header = data[0]
        rows = data[1:]
    else:
        header = None
        rows = data
    
    return header, rows

def escape_latex(text):
    """LaTeX特殊文字をエスケープ"""
    replacements = {
        '&': r'\&',
        '%': r'\%',
        '$': r'\$',
        '#': r'\#',
        '_': r'\_',
        '{': r'\{',
        '}': r'\}',
        '~': r'\textasciitilde{}',
        '^': r'\^{}',
        '\\': r'\textbackslash{}',
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    return text

def generate_latex_table(header, rows, caption, label):
    """LaTeX表のコードを生成"""
    # 列数の決定
    if header:
        ncols = len(header)
    elif rows:
        ncols = len(rows[0])
    else:
        return ""
    
    # 列の配置（左揃え）
    col_align = 'l' + 'c' * (ncols - 1)
    
    lines = []
    lines.append(r"\begin{table}[htbp]")
    lines.append(r"  \centering")
    
    if caption:
        lines.append(f"  \\caption{{{escape_latex(caption)}}}")
    
    if label:
        lines.append(f"  \\label{{{label}}}")
    
    lines.append(f"  \\begin{{tabular}}{{{col_align}}}")
    lines.append(r"    \hline")
    
    # ヘッダー行
    if header:
        header_line = " & ".join(escape_latex(str(cell)) for cell in header)
        lines.append(f"    {header_line} \\\\")
        lines.append(r"    \hline")
    
    # データ行
    for row in rows:
        # 列数を揃える
        row_data = row[:ncols] + [''] * (ncols - len(row))
        row_line = " & ".join(escape_latex(str(cell)) for cell in row_data)
        lines.append(f"    {row_line} \\\\")
    
    lines.append(r"    \hline")
    lines.append(r"  \end{tabular}")
    lines.append(r"\end{table}")
    
    return '\n'.join(lines)

def main():
    parser = argparse.ArgumentParser(
        description='CSV/ExcelファイルをLaTeX表に変換',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    parser.add_argument('input', help='入力ファイル (.csv または .xlsx)')
    parser.add_argument('-o', '--output', help='出力ファイル')
    parser.add_argument('-c', '--caption', default='表のタイトル', help='表のキャプション')
    parser.add_argument('-l', '--label', default='tab:table', help='表のラベル')
    parser.add_argument('--no-header', action='store_true', help='ヘッダー行なし')
    
    args = parser.parse_args()
    
    # ファイルの読み込み
    input_path = Path(args.input)
    
    if not input_path.exists():
        print(f"Error: ファイルが見つかりません: {args.input}", file=sys.stderr)
        sys.exit(1)
    
    has_header = not args.no_header
    
    if input_path.suffix.lower() == '.csv':
        header, rows = read_csv(input_path, has_header)
    elif input_path.suffix.lower() in ['.xlsx', '.xls']:
        header, rows = read_excel(input_path, has_header)
    else:
        print(f"Error: サポートされていないファイル形式: {input_path.suffix}", file=sys.stderr)
        print("サポート形式: .csv, .xlsx, .xls", file=sys.stderr)
        sys.exit(1)
    
    # LaTeX表の生成
    latex_code = generate_latex_table(header, rows, args.caption, args.label)
    
    # 出力
    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(latex_code)
        print(f"LaTeX表を生成しました: {args.output}")
    else:
        print(latex_code)

if __name__ == '__main__':
    main()
