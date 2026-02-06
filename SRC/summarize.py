import os

# 📂 Thư mục chứa code
ROOT_DIR = r"C:\VScode\quickship\src"
OUTPUT_FILE = "summary.txt"
EXTENSIONS = (".ts", ".tsx", ".js", ".jsx", ".py")

def summarize_file(file_path):
    """Đọc và tóm tắt một file code"""
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
        lines = content.count("\n")
        functions = content.count("function") + content.count("def ")
        return f"{file_path}: {lines} dòng, {functions} hàm\n"
    except Exception as e:
        return f"{file_path}: lỗi đọc file ({e})\n"

def main():
    print(f"Đang quét thư mục: {ROOT_DIR}")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as out:
        for root, _, files in os.walk(ROOT_DIR):
            if any(skip in root for skip in ["node_modules", "dist", "build", ".next"]):
                continue

            for file in files:
                if file.endswith(EXTENSIONS):
                    file_path = os.path.join(root, file)  # ✅ Định nghĩa trước khi in
                    print("Đang đọc:", file_path)
                    out.write(summarize_file(file_path))

    print(f"\n✅ Đã tạo file tóm tắt: {os.path.abspath(OUTPUT_FILE)}")

if __name__ == "__main__":
    main()
