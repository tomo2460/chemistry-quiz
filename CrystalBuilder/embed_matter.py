
import os

matter_path = 'matter.min.js'
html_path = 'index.html'

if not os.path.exists(matter_path):
    print(f"Error: {matter_path} not found.")
    exit(1)

if not os.path.exists(html_path):
    print(f"Error: {html_path} not found.")
    exit(1)

with open(matter_path, 'r', encoding='utf-8') as f:
    matter_js = f.read()

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

target = '<script src="./matter.min.js"></script>'
if target not in html:
    print(f"Error: Target string '{target}' not found in {html_path}.")
    exit(1)

replacement = f'<script>\n{matter_js}\n</script>'
new_html = html.replace(target, replacement)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(new_html)

print("Successfully embedded matter.min.js into index.html")
