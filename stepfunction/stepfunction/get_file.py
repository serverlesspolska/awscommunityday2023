from pathlib import Path


def get_file(path: str) -> str:
    _path = Path(path)
    return _path.read_text(encoding='utf-8')
