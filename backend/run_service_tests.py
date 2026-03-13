from __future__ import annotations

import subprocess
import sys
import os
from pathlib import Path


ROOT = Path(__file__).resolve().parent
SERVICES = [
    "auth-service",
    "patient-service",
    "doctor-service",
    "clinic-admin-service",
    "imaging-service",
    "analysis-service",
    "report-service",
    "notification-service",
    "api-gateway",
]


def main() -> int:
    for service in SERVICES:
        service_dir = ROOT / "services" / service
        command = [
            sys.executable,
            "-m",
            "pytest",
            "tests",
        ]
        env = {**os.environ, "PYTHONPATH": str(ROOT.parent)}
        result = subprocess.run(command, cwd=service_dir, env=env)
        if result.returncode != 0:
            return result.returncode
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
