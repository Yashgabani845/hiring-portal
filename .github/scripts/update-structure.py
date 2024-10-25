import os
import github
from github import Github

def get_repo_structure(path='.', prefix=''):
    """
    Recursively retrieves the directory structure.
    Returns a list of formatted directory paths.
    """
    structure = []
    try:
        items = sorted(os.listdir(path))
    except FileNotFoundError:
        print(f"Path {path} not found.")
        return structure

    for i, item in enumerate(items):
        if item.startswith('.'):  # Skipping hidden files/folders
            continue
        item_path = os.path.join(path, item)
        if os.path.isdir(item_path):
            is_last = i == len(items) - 1
            current_prefix = '└── ' if is_last else '├── '
            structure.append(f"{prefix}{current_prefix}{item}")
            next_prefix = prefix + ('    ' if is_last else '│   ')
            structure.extend(get_repo_structure(item_path, next_prefix))
    return structure

def update_structure_file(structure):
    """
    Updates or creates the repo_structure.txt file with the given structure.
    """
    with open('repo_structure.txt', 'w') as f:
        f.write('\n'.join(structure))
    print("repo_structure.txt updated.")

def update_readme(structure):
    """
    Updates the README.md file by inserting the current repo structure between markers.
    """
    try:
        with open('README.md', 'r') as f:
            content = f.read()
    except FileNotFoundError:
        print("README.md file not found.")
        return

    start_marker = '<!-- START_STRUCTURE -->'
    end_marker = '<!-- END_STRUCTURE -->'

    start_index = content.find(start_marker)
    end_index = content.find(end_marker)

    if start_index != -1 and end_index != -1:
        new_content = (
            content[:start_index + len(start_marker)] +
            '\n```\n' + '\n'.join(structure) + '\n```\n' +
            content[end_index:]
        )

        with open('README.md', 'w') as f:
            f.write(new_content)
        print("README.md updated with new structure.")
    else:
        print("Markers not found in README.md. Structure not updated.")

def main():
    """
    Main function to handle GitHub repo interaction and structure updating.
    """
    gh_token = os.environ.get('GH_TOKEN')
    repo_name = os.environ.get('GITHUB_REPOSITORY')

    if not gh_token or not repo_name:
        print("Error: Environment variables GH_TOKEN or GITHUB_REPOSITORY not set.")
        return

    g = Github(gh_token)

    try:
        repo = g.get_repo(repo_name)
    except github.GithubException as e:
        print(f"GitHub API error: {e}")
        return

    current_structure = get_repo_structure()

    try:
        contents = repo.get_contents("repo_structure.txt")
        existing_structure = contents.decoded_content.decode().split('\n')
    except github.GithubException:
        existing_structure = None

    if current_structure != existing_structure:
        update_structure_file(current_structure)
        update_readme(current_structure)
        print("Repository structure updated.")
    else:
        print("No changes in repository structure.")

if __name__ == "__main__":
    main()
