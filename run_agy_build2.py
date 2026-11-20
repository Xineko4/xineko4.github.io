import subprocess, json, time
from pathlib import Path
root = Path(__file__).resolve().parent
agy = Path(r"C:\Users\Xineko\AppData\Local\agy\bin\agy.exe")
prompt = (root / "MASTER_BUILD_PROMPT.md").read_text(encoding="utf-8")
allow = [
    "command(npm)", "command(npx)", "command(node)", "command(python)", "command(python3)",
    "command(ls)", "command(pwd)", "command(cat)", "command(mkdir)", "command(cp)",
    "command(echo)", "command(Get-ChildItem)", "command(Get-Content)", "command(Test-Path)",
    "command(New-Item)", "command(Copy-Item)"
]
settings = json.dumps({"permissions": {"allow": allow}})
out = root / "agy-build-2.json"
err = root / "agy-build-2.err.log"
cmd = [
    str(agy),
    "--settings", settings,
    "--output-format", "json",
    "--model", "gemini-3.8-flash-low",
    "--effort", "low",
    "--add-dir", str(root),
    "--log-file", str(root / "agy-build-2.log"),
    "--print", prompt,
]
t0 = time.time()
with open(out, "w", encoding="utf-8") as fo, open(err, "w", encoding="utf-8") as fe:
    p = subprocess.run(cmd, cwd=root, stdout=fo, stderr=fe)
print(json.dumps({"exit_code": p.returncode, "duration_seconds": round(time.time()-t0, 1), "output": str(out)}))
