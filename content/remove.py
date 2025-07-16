# remove_asterisks.py

import os

def remove_asterisks_from_md_files(root_folder: str) -> None:
    for dirpath, _, filenames in os.walk(root_folder):
        for filename in filenames:
            if filename.lower().endswith('.md'):
                file_path = os.path.join(dirpath, filename)
                try:
                    with open(file_path, 'r', encoding='utf-8') as file:
                        content = file.read()

                    cleaned_content = content.replace('[ ASSOCIATED FILES: ]', '► ln --context')

                    with open(file_path, 'w', encoding='utf-8') as file:
                        file.write(cleaned_content)

                    print(f"✅ Cleaned: {file_path}")
                except Exception as e:
                    print(f"❌ Failed to clean {file_path}: {e}")

if __name__ == "__main__":
    current_folder = os.path.dirname(os.path.abspath(__file__))
    print(f"🔍 Scanning folder: {current_folder}")
    remove_asterisks_from_md_files(current_folder)