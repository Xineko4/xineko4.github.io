from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(r"C:\Users\Xineko\AI Related (Hermes)\Portfolio\galih-giri")
BRIEF = ROOT / "interactive-brief.md"
AGY = Path(r"C:\Users\Xineko\AppData\Local\agy\bin\agy.exe")
MODEL = "gemini-4-neon-medium"
LOG = ROOT / "agy-interactive.log"
OUT = ROOT / "agy-interactive.json"
ERR = ROOT / "agy-interactive.err.log"

settings = {
    "permissions": {
        "allow": [
            "command(npm)",
            "command(npx)",
            "command(node)",
            "command(python)",
            "command(git)",
            "command(Get-ChildItem)",
            "command(New-Item)",
            "command(Copy-Item)",
            "command(Get-Content)",
            "command(Set-Content)",
            "command(Test-Path)",
        ]
    }
}

cmd = [
    str(AGY),
    "--print", BRIEF.read_text(encoding="utf-8"),
    "--output-format", "json",
    "--model", MODEL,
    "--effort", "medium",
    "--mode", "auto",
    "--add-dir", str(ROOT),
    "--settings", json.dumps(settings),
    "--log-file", str(LOG),
]

print("RUNNING", MODEL, flush=True)
result = subprocess.run(
    cmd,
    cwd=str(ROOT),
    capture_output=True,
    text=True,
    timeout=1800,
)
OUT.write_text(result.stdout, encoding="utf-8")
ERR.write_text(result.stderr, encoding="utf-8")
print("EXIT", result.returncode)
print("STDOUT", result.stdout[:1200])
print("STDERR", result.stderr[:1200])
sys.exit(result.returncode)
