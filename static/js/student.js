/* ===========================================================================
   Student multi-step flow controller
   =========================================================================== */
const LOW = window.LOW_THRESHOLD || 2;

const state = {
  residency: null,         // 'yes' | 'no'
  ratings: {},             // {1: 4, ...}
  comments: {},            // {1: '...'}
  vip_interested: null,    // 'yes' | 'no'
  vip_willing_to_pay: "",
  vip_features: [],
  vip_barriers_chips: [],
};

// Step sequence depends on residency
function flowSteps() {
  if (state.residency === "no") return ["residency", "vip", "confirm"];
  return ["residency", "verify", "survey", "feedback", "vip", "confirm"];
}

let idx = 0;

const steps = () => document.querySelectorAll(".step");
const btnNext = document.getElementById("btnNext");
const btnBack = document.getElementById("btnBack");
const navActions = document.getElementById("navActions");

function currentStepName() {
  return flowSteps()[idx];
}

function showStep() {
  const name = currentStepName();
  steps().forEach((s) => s.classList.toggle("active", s.dataset.step === name));

  // Progress
  const total = flowSteps().length - 1; // exclude confirm from count base
  const pct = Math.round((idx / total) * 100);
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressStep").textContent = `${t("next") ? "" : ""}${idx + 1} / ${flowSteps().length}`;
  document.getElementById("progressPct").textContent = pct + "%";

  // Nav visibility
  if (name === "confirm") {
    navActions.style.display = "none";
    document.getElementById("progressWrap").style.display = "none";
    return;
  }
  navActions.style.display = "flex";
  btnBack.style.visibility = "visible";

  // Last data step before confirm => Submit
  const isLastData = flowSteps()[idx + 1] === "confirm";
  btnNext.textContent = isLastData ? t("submit") : t("next");
}

// ---- Residency selection --------------------------------------------------
document.querySelectorAll("[data-residency]").forEach((c) => {
  c.addEventListener("click", () => {
    document.querySelectorAll("[data-residency]").forEach((x) => x.classList.remove("selected"));
    c.classList.add("selected");
    state.residency = c.dataset.residency;
  });
});

// ---- Star ratings ---------------------------------------------------------
const EMOJI_MAP = {
  1: "😞", 2: "😕", 3: "😐", 4: "😊", 5: "😄"
};

document.querySelectorAll(".rating-card").forEach((card) => {
  const cat = card.dataset.cat;
  const commentBox = card.querySelector(".comment-box");
  const requiredNotice = card.querySelector(".comment-required-notice");
  const selectedEmojiEl = card.querySelector(".selected-emoji");

  card.querySelectorAll(".star-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = parseInt(btn.dataset.val);
      state.ratings[cat] = val;
      card.querySelectorAll(".star-btn").forEach((b) => {
        b.classList.remove("selected", "low");
      });
      // highlight selected
      card.querySelectorAll(".star-btn").forEach((b) => {
        if (parseInt(b.dataset.val) === val) {
          b.classList.add("selected");
          if (val <= LOW) b.classList.add("low");
        }
      });
      // Update emoji display and highlight in emoji scale
      selectedEmojiEl.textContent = EMOJI_MAP[val];
      triggerEmojiAnimation(selectedEmojiEl);
      // Highlight matching emoji item in scale
      card.querySelectorAll(".emoji-item").forEach((item) => {
        const itemScore = parseInt(item.dataset.score);
        item.style.opacity = itemScore === val ? "1" : "0.4";
      });
      // Low score => required comment
      if (val <= LOW) {
        commentBox.classList.add("show", "required");
        requiredNotice.style.display = "block";
      } else {
        commentBox.classList.remove("required");
        commentBox.classList.add("show");
        requiredNotice.style.display = "none";
      }
      card.classList.remove("invalid");
    });
  });
  const ta = card.querySelector("textarea");
  if (ta) ta.addEventListener("input", () => { state.comments[cat] = ta.value; });
});

function triggerEmojiAnimation(emojiEl) {
  emojiEl.classList.remove("pulse");
  void emojiEl.offsetWidth; // Trigger reflow
  emojiEl.classList.add("pulse");
}

// ---- Feedback want-to-say toggles ----------------------------------------
document.querySelectorAll(".feedback-field").forEach((field) => {
  const ta = field.querySelector("textarea");
  field.querySelectorAll(".say-toggle button").forEach((btn) => {
    btn.addEventListener("click", () => {
      field.querySelectorAll(".say-toggle button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (btn.dataset.say === "yes") {
        ta.style.display = "block";
        ta.focus();
      } else {
        ta.style.display = "none";
        ta.value = "";
      }
    });
  });
});


// ---- AC Questions (after VIP interest) -----------------------------------
document.querySelectorAll("[data-vip]").forEach((c) => {
  c.addEventListener("click", () => {
    if (c.dataset.vip === "yes") {
      document.getElementById("vipAcPrice").style.display = "block";
    } else {
      document.getElementById("vipAcPrice").style.display = "none";
      document.getElementById("vipAcInterest").style.display = "none";
    }
  });
});

// AC Price buttons
document.querySelectorAll(".ac-price").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.vip_ac_price = btn.dataset.price;
    document.getElementById("vipAcInterest").style.display = "block";
    document.querySelectorAll(".ac-price").forEach((b) => b.style.opacity = b === btn ? "1" : "0.5");
  });
});

// AC Interest buttons
document.querySelectorAll(".ac-interest").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.vip_ac_interest = btn.dataset.interest;
    document.querySelectorAll(".ac-interest").forEach((b) => b.style.opacity = b === btn ? "1" : "0.5");
  });
});

// ---- AC Questions ---
document.querySelectorAll("[data-vip]").forEach(c => {
  c.addEventListener("click", () => {
    if (c.dataset.vip === "yes") {
      document.getElementById("vipAcPrice").style.display = "block";
    } else {
      document.getElementById("vipAcPrice").style.display = "none";
      document.getElementById("vipAcInterest").style.display = "none";
    }
  });
});
document.querySelectorAll(".ac-price").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("vipAcInterest").style.display = "block";
  });
});
document.querySelectorAll(".ac-interest").forEach(btn => {
  btn.addEventListener("click", () => {
    state.vip_ac_interest = btn.dataset.interest;
  });
});

// ---- VIP interest ---------------------------------------------------------
document.querySelectorAll("[data-vip]").forEach((c) => {
  c.addEventListener("click", () => {
    document.querySelectorAll("[data-vip]").forEach((x) => x.classList.remove("selected"));
    c.classList.add("selected");
    state.vip_interested = c.dataset.vip;
    document.getElementById("vipYes").style.display = c.dataset.vip === "yes" ? "block" : "none";
    document.getElementById("vipNo").style.display = c.dataset.vip === "no" ? "block" : "none";
  });
});
document.querySelectorAll("#vipPay button").forEach((b) => {
  b.addEventListener("click", () => {
    document.querySelectorAll("#vipPay button").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    state.vip_willing_to_pay = b.dataset.pay;
  });
});
document.querySelectorAll("#vipFeatures .chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    chip.classList.toggle("selected");
    state.vip_features = [...document.querySelectorAll("#vipFeatures .chip.selected")].map((c) => c.dataset.feature);
  });
});
document.querySelectorAll("#vipBarriers .chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    chip.classList.toggle("selected");
    state.vip_barriers_chips = [...document.querySelectorAll("#vipBarriers .chip.selected")].map((c) => c.dataset.barrier);
  });
});

// ---- Validation -----------------------------------------------------------
function val(id) { return (document.getElementById(id).value || "").trim(); }

function showAlert(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.add("show");
}
function hideAlert(id) { document.getElementById(id).classList.remove("show"); }

function validateResidency() {
  if (!state.residency) {
    alert(t("res_lead"));
    return false;
  }
  return true;
}

function validateVerifyFields() {
  let ok = true;
  document.querySelectorAll('[data-step="verify"] .field[data-required]').forEach((f) => {
    const input = f.querySelector("input, select");
    if (!input.value.trim()) { f.classList.add("invalid"); ok = false; }
    else f.classList.remove("invalid");
  });
  return ok;
}

async function validateVerify() {
  hideAlert("verifyAlert");
  if (!validateVerifyFields()) return false;

  btnNext.disabled = true;
  const original = btnNext.textContent;
  btnNext.innerHTML = '<span class="spinner"></span>';
  try {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_id: val("student_id"),
        email: val("email"),
        room_number: val("room_number"),
      }),
    });
    const data = await res.json();
    if (!data.ok && data.reason === "duplicate") {
      showAlert("verifyAlert", t("verify_err_duplicate"));
      return false;
    }
    if (!data.ok && data.reason === "format") {
      showAlert("verifyAlert", t("verify_err_format"));
      return false;
    }
    if (!data.ok && data.reason === "email") {
      showAlert("verifyAlert", t("verify_err_email"));
      return false;
    }
    if (data.ok && data.matched) return true;
    showAlert("verifyAlert", t("verify_err_nomatch"));
    return false;
  } catch (e) {
    showAlert("verifyAlert", t("submit_error"));
    return false;
  } finally {
    btnNext.disabled = false;
    btnNext.textContent = original;
  }
}

function validateSurvey() {
  hideAlert("surveyAlert");
  let ok = true;
  document.querySelectorAll(".rating-card").forEach((card) => {
    const cat = card.dataset.cat;
    card.classList.remove("invalid");
    if (!state.ratings[cat]) { card.classList.add("invalid"); ok = false; }
    else if (state.ratings[cat] <= LOW) {
      const ta = card.querySelector("textarea");
      if (!ta.value.trim()) { card.classList.add("invalid"); ok = false; }
    }
  });
  if (!ok) showAlert("surveyAlert", t("survey_err_missing") + " " + t("survey_err_comment"));
  return ok;
}

function validateVip() {
  if (!state.vip_interested) {
    alert(t("vip_q_interested"));
    return false;
  }
  return true;
}

// ---- Submit ---------------------------------------------------------------
async function submitAll() {
  const payload = {
    is_resident: state.residency === "yes",
    student_id: state.residency === "yes" ? val("student_id") : val("vip_email"),
    full_name: state.residency === "yes" ? val("full_name") : "",
    email: state.residency === "yes" ? val("email") : val("vip_email"),
    room_number: state.residency === "yes" ? val("room_number") : "",
    block: state.residency === "yes" ? val("block") : "",
    academic_level: state.residency === "yes" ? val("academic_level") : "",
    ratings: state.ratings,
    comments: state.comments,
    main_issues: byId("main_issues"),
    suggestions: byId("suggestions"),
    additional_comments: byId("additional_comments"),
    vip_interested: state.vip_interested,
    vip_willing_to_pay: state.vip_willing_to_pay,
    vip_features: state.vip_features,
    vip_reason: byId("vip_reason"),
    vip_expected_improvements: byId("vip_expected_improvements"),
    vip_barriers: state.vip_interested === "no"
      ? state.vip_barriers_chips.join(", ")
      : byId("vip_barriers_yes"),
    vip_phone: byId("vip_phone"),
    vip_email: byId("vip_email"),
  };

  btnNext.disabled = true;
  btnNext.innerHTML = '<span class="spinner"></span>';
  try {
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.ok) return true;
    alert(t(data.reason === "duplicate" ? "verify_err_duplicate" : "submit_error"));
    return false;
  } catch (e) {
    alert(t("submit_error"));
    return false;
  } finally {
    btnNext.disabled = false;
    btnNext.textContent = t("submit");
  }
}

function byId(id) { const el = document.getElementById(id); return el ? (el.value || "").trim() : ""; }

// ---- Navigation -----------------------------------------------------------
btnNext.addEventListener("click", async () => {
  const name = currentStepName();

  if (name === "residency" && !validateResidency()) return;
  if (name === "verify" && !(await validateVerify())) return;
  if (name === "survey" && !validateSurvey()) return;
  if (name === "vip") {
    if (!validateVip()) return;
    if (await submitAll()) { idx++; showStep(); }
    return;
  }

  idx++;
  showStep();
});

btnBack.addEventListener("click", () => {
  if (idx > 0) { idx--; showStep(); }
  else { window.location = "/start"; }   // first step → back to the menu
});

// ---- Localize category titles on lang change ------------------------------
function onLangChange() {
  document.querySelectorAll(".rating-card__title").forEach((el) => {
    el.textContent = currentLang === "ar" ? el.dataset.ar : el.dataset.en;
  });
  showStep();
}

// init
document.addEventListener("DOMContentLoaded", () => { showStep(); onLangChange(); });

// Handle Verify button click
document.getElementById('verifyBtn')?.addEventListener('click', async function() {
  const regNum = document.getElementById('student_id').value.trim();
  const email = document.getElementById('email').value.trim();
  
  if (!regNum || !email) {
    alert('Please enter both Registration Number and Email');
    return;
  }
  
  try {
    const res = await fetch('/api/lookup-resident', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id: regNum })
    });
    const data = await res.json();
    
    if (data.ok && data.resident) {
      // Show auto-fill fields
      document.getElementById('autoFillFields').style.display = 'block';
      // Populate fields
      document.getElementById('full_name').value = data.resident.full_name || '';
      document.getElementById('room_number').value = data.resident.room_number || '';
      document.getElementById('block').value = data.resident.block || '';
      document.getElementById('academic_level').value = data.resident.academic_level || '';
      document.getElementById('verifyAlert').classList.remove('show');
    } else {
      document.getElementById('autoFillFields').style.display = 'none';
      const alertEl = document.getElementById('verifyAlert');
      alertEl.textContent = 'Registration number not found in our system. Only registered students can provide feedback.';
      alertEl.classList.add('show');
    }
  } catch (e) {
    console.error('Verification failed:', e);
    alert('Verification failed. Please try again.');
  }
});


// AC interest auto-show
document.querySelectorAll("[data-vip]").forEach(function (c) {
  c.addEventListener("click", function () {
    var el = document.getElementById("vipAcInterest");
    if (el) el.style.display = c.dataset.vip === "yes" ? "block" : "none";
  });
});
document.querySelectorAll(".ac-interest").forEach(function (b) {
  b.addEventListener("click", function () {
    document.querySelectorAll(".ac-interest").forEach(function (x) { x.classList.remove("active"); });
    b.classList.add("active");
  });
});
