import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent
SERVICE_DIRS = [path for path in (ROOT / "services").iterdir() if path.is_dir()]

for service_dir in SERVICE_DIRS:
    sys.path.insert(0, str(service_dir))

sys.path.insert(0, str(ROOT.parent))
