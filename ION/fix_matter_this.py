
import os

html_path = 'index.html'

if not os.path.exists(html_path):
    print(f"Error: {html_path} not found.")
    exit(1)

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Minified UMD wrapper pattern
# !function(e,t){"object"==typeof exports&&...}(this,(function(){...}))
# We need to change the 'this' argument to 'window' to ensure it binds to the global scope correctly.

target = '}(this,(function(){'
replacement = '}(window,(function(){'

if target in html:
    new_html = html.replace(target, replacement)
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Successfully replaced 'this' with 'window' in Matter.js inline script.")
else:
    print(f"Error: Target pattern '{target}' not found in {html_path}. Trying a broader pattern.")
    # Fallback to a broader pattern if potential slight variations exist (though unlikely in exact copy)
    target_loose = '}(this,function(){' # Some minifiers remove parens
    if target_loose in html:
        new_html = html.replace(target_loose, '}(window,function(){')
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(new_html)
        print("Successfully replaced 'this' with 'window' using loose pattern.")
    else:
        # Check for context
        print("Could not find the UMD wrapper call.")
        exit(1)
