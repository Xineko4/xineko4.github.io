import subprocess, json, time, os, sys
from pathlib import Path
root = Path(__file__).resolve().parent
agy = Path(r"C:\Users\Xineko\AppData\Local\agy\bin\agy.exe")
prompt = (root / "MASTER_BUILD_PROMPT.md").read_text(encoding="utf-8")
out = root / "agy-build.json"
err = root / "agy-build.err.log"
cmd = [
    str(agy), "--print", prompt,
    "--output-format", "json",
    "--model", "gemini-3.8-flash-low",
    "--effort", "low",
    "--mode", "auto",
    "--add-dir", str(root),
    "--log-file", str(root / "agy-build.log"),
]
t0 = time.time()
with open(out, "w", encoding="utf-8") as fo, open(err, "w", encoding="utf-8") as fe:
    p = subprocess.run(cmd, cwd=root, stdout=fo, stderr=fe)
print(json.dumps({"exit_code": p.returncode, "duration_seconds": round(time.time()-t0, 1), "output": str(out)}))
