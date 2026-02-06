import os
from graphviz import Digraph

IGNORE = {"node_modules", ".git", "dist", "__pycache__", ".vscode"}

def add_nodes(dot, path, parent=None):
    name = os.path.basename(path)
    dot.node(path, label=name, shape="folder" if os.path.isdir(path) else "note")
    if parent:
        dot.edge(parent, path)
    if os.path.isdir(path):
        for item in sorted(os.listdir(path)):
            if item in IGNORE or item.startswith("."):
                continue
            add_nodes(dot, os.path.join(path, item), path)

def main():
    dot = Digraph("Quickship Structure", format="png")
    dot.attr(rankdir="TB", fontsize="10")   # 👈 bố cục dọc (Top -> Bottom)
    dot.attr("node", fontname="Arial", fontsize="10")
    dot.attr("edge", arrowsize="0.6")
    add_nodes(dot, ".")
    dot.render("quickship_structure_vertical", cleanup=True)
    print("✅ Sơ đồ cây (dọc) đã được lưu thành quickship_structure_vertical.png")

if __name__ == "__main__":
    main()
