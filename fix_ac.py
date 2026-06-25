#!/usr/bin/env python3
# Idempotent fix: adds the "Are you interested in an AC room?" question,
# shows it when VIP = Yes, and wires up English + Arabic text.
import io, os

def read(p):  return io.open(p, encoding="utf-8").read()
def write(p, s): io.open(p, "w", encoding="utf-8").write(s)

ROOT = os.getcwd()
hp = os.path.join(ROOT, "templates", "student.html")
jp = os.path.join(ROOT, "static", "js", "student.js")
ip = os.path.join(ROOT, "static", "js", "i18n.js")

for p in (hp, jp, ip):
    if not os.path.exists(p):
        print("ERROR: cannot find", p, "- run this from your project root")
        raise SystemExit(1)

# 1) HTML -------------------------------------------------------------------
h = read(hp)
if "vipAcInterest" not in h:
    block = (
'        <div id="vipAcInterest" style="display:none; margin-top:2rem;">\n'
'          <div class="field">\n'
'            <label data-i18n="vip_ac_interest_q">Are you interested in an AC room? (Additional cost will apply)</label>\n'
'            <div style="display:grid; gap:1rem; margin-top:1rem;">\n'
'              <button type="button" class="ac-interest" data-i18n="vip_ac_yes_full">Yes, with AC</button>\n'
'              <button type="button" class="ac-interest" data-i18n="vip_ac_other">Other facilities only (without AC)</button>\n'
'              <button type="button" class="ac-interest" data-i18n="vip_ac_no_interested">Not interested in premium housing</button>\n'
'            </div>\n'
'          </div>\n'
'        </div>\n\n'
    )
    placed = False
    for anchor in ("<!-- VIP NO branch -->", '<div id="vipNo"'):
        if anchor in h:
            h = h.replace(anchor, block + "      " + anchor, 1)
            placed = True
            break
    if placed:
        write(hp, h); print("OK  html : AC question added")
    else:
        print("SKIP html : could not find where to insert (send me the file)")
else:
    print("OK  html : AC question already present")

# 2) JS ---------------------------------------------------------------------
j = read(jp)
if "AC interest auto-show" not in j:
    j += (
"\n\n// AC interest auto-show\n"
'document.querySelectorAll("[data-vip]").forEach(function (c) {\n'
'  c.addEventListener("click", function () {\n'
'    var el = document.getElementById("vipAcInterest");\n'
'    if (el) el.style.display = c.dataset.vip === "yes" ? "block" : "none";\n'
"  });\n"
"});\n"
'document.querySelectorAll(".ac-interest").forEach(function (b) {\n'
'  b.addEventListener("click", function () {\n'
'    document.querySelectorAll(".ac-interest").forEach(function (x) { x.classList.remove("active"); });\n'
'    b.classList.add("active");\n'
"  });\n"
"});\n"
    )
    write(jp, j); print("OK  js   : show-on-Yes handler added")
else:
    print("OK  js   : handler already present")

# 3) i18n -------------------------------------------------------------------
t = read(ip)
en_add = (
'    vip_ac_interest_q: "Are you interested in an AC room? (Additional cost will apply)",\n'
'    vip_ac_yes_full: "Yes, with AC",\n'
'    vip_ac_other: "Other facilities only (without AC)",\n'
'    vip_ac_no_interested: "Not interested in premium housing",\n'
)
ar_add = (
'    vip_ac_interest_q: "هل أنت مهتم بغرفة مجهزة بتكييف الهواء؟ (تكلفة إضافية ستنطبق)",\n'
'    vip_ac_yes_full: "نعم، مع تكييف الهواء",\n'
'    vip_ac_other: "المرافق الأخرى فقط (بدون تكييف)",\n'
'    vip_ac_no_interested: "غير مهتم بالسكن المميز",\n'
)
if "vip_ac_interest_q" not in t:
    lines = t.split("\n")
    out, n = [], 0
    for ln in lines:
        out.append(ln)
        if "vip_q_interested:" in ln:
            n += 1
            out.append((en_add if n == 1 else ar_add).rstrip("\n"))
    if n >= 1:
        write(ip, "\n".join(out)); print("OK  i18n : English + Arabic text added")
    else:
        print("SKIP i18n : anchor 'vip_q_interested' not found")
else:
    print("OK  i18n : AC translations already present")

# washing-machine Arabic (only if missing) ----------------------------------
t = read(ip)
if "vip_b_washing" not in t:
    lines = t.split("\n")
    out, n = [], 0
    for ln in lines:
        out.append(ln)
        if "vip_b_premium:" in ln:
            n += 1
            val = '    vip_b_washing: "Washing Machine Area",' if n == 1 else '    vip_b_washing: "منطقة الغسالات",'
            out.append(val)
    write(ip, "\n".join(out)); print("OK  i18n : washing-machine text added")
else:
    print("OK  i18n : washing-machine already present")

print("\nDONE. Now run:  git add -A && git commit -m \"Add AC room question\" && git push origin main")
