#!/bin/bash
# LaTeX + Bibtex コンパイルスクリプト

# カラー出力用
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}LaTeX + Bibtex コンパイル開始${NC}"
echo -e "${GREEN}========================================${NC}"

# ファイル名（拡張子なし）
FILENAME="main"

# 1回目: LaTeX
echo -e "\n${YELLOW}[1/4] LaTeX コンパイル (1回目)...${NC}"
platex ${FILENAME}.tex
if [ $? -ne 0 ]; then
    echo -e "${RED}エラー: LaTeXコンパイルに失敗しました${NC}"
    exit 1
fi

# 2回目: Bibtex
echo -e "\n${YELLOW}[2/4] Bibtex 処理...${NC}"
pbibtex ${FILENAME}
if [ $? -ne 0 ]; then
    echo -e "${RED}エラー: Bibtex処理に失敗しました${NC}"
    exit 1
fi

# 3回目: LaTeX
echo -e "\n${YELLOW}[3/4] LaTeX コンパイル (2回目)...${NC}"
platex ${FILENAME}.tex
if [ $? -ne 0 ]; then
    echo -e "${RED}エラー: LaTeXコンパイルに失敗しました${NC}"
    exit 1
fi

# 4回目: LaTeX
echo -e "\n${YELLOW}[4/4] LaTeX コンパイル (3回目)...${NC}"
platex ${FILENAME}.tex
if [ $? -ne 0 ]; then
    echo -e "${RED}エラー: LaTeXコンパイルに失敗しました${NC}"
    exit 1
fi

# PDF変換
echo -e "\n${YELLOW}[5/5] PDF変換...${NC}"
dvipdfmx ${FILENAME}.dvi
if [ $? -ne 0 ]; then
    echo -e "${RED}エラー: PDF変換に失敗しました${NC}"
    exit 1
fi

# 中間ファイルのクリーンアップ（オプション）
# コメントを外すと中間ファイルを自動削除します
# rm -f *.aux *.log *.dvi *.bbl *.blg *.out *.toc

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}✅ コンパイル完了！${NC}"
echo -e "${GREEN}出力ファイル: ${FILENAME}.pdf${NC}"
echo -e "${GREEN}========================================${NC}"

# PDFを開く（オプション）
if [ "$1" == "--open" ]; then
    echo -e "\n${YELLOW}PDFを開いています...${NC}"
    open ${FILENAME}.pdf
fi
