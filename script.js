const YOUR_NAME = "HUYNH";

const CREW = [
  {
    name: "Mrs. Lan",
    role: "THE BOSS LADY // QUẢN LÝ",
    icon: "👑",
    gender: "female",
    type: "boss",
    accent: "#f6d365",
    bio: "Chị đại tối cao của văn phòng. Một ánh nhìn đủ khiến các máy cày KPI tự kiểm điểm",
    // một câu hỏi nhẹ nhàng đủ làm cả team mở lại 12 file Excel. Quyền lực được đo bằng số lần câu 'chị nhờ em chút nhé' vang lên.",
    quote: "Mọi người ơi, chị nói cái này một chút nhé…"
  },
  {
    name: "Máy cày KPI 1",
    role: "SPREADSHEET WIZARD",
    icon: "👩🏻‍💻",
    gender: "female",
    accent: "#ff5c8a",
    bio: "tiểu sử đang cập nhật vì không dám viết bậy",
    // bio: "Có thể nhìn một bảng tính 40 cột và biết ngay cột nào đang sai. Không ai biết họ dùng công thức gì. Có lẽ là phép thuật.",
    // quote: "Đừng sửa file đó. Chị vừa sửa xong… hình như vậy."
  },
  {
    name: "Máy cày KPI 2",
    role: "DEADLINE SPRINTER",
    icon: "👩🏼‍💼",
    gender: "female",
    accent: "#ffc857",
    bio: "tiểu sử đang cập nhật vì không dám viết bậy",

    // bio: "Bình thường rất chill. Còn 5 phút đến deadline thì tốc độ gõ phím vượt giới hạn vật lý.",
    // quote: "Còn nhiều thời gian mà. Deadline là 5 giờ… đúng không?"
  },
  {
    name: "Máy cày KPI 3",
    role: "OFFICE SUPPORT",
    icon: "👩🏽‍🦰",
    gender: "female",
    accent: "#7bdff2",
    bio: "tiểu sử đang cập nhật vì không dám viết bậy",

    // bio: "Luôn có mặt đúng lúc ai đó cần giúp đỡ, một chiếc ghế, một lời khuyên hoặc một lý do để đi mua trà sữa.",
    // quote: "Đi lấy nước không? Tiện thể nghỉ ngơi 45 phút."
  },
  
  {
    name: "Máy cày KPI 4",
    role: "OFFICE INTELLIGENCE",
    icon: "👩🏻",
    gender: "female",
    accent: "#ff9f7f",
    bio: "tiểu sử đang cập nhật vì không dám viết bậy",

    // bio: "Không cần camera an ninh. Chỉ cần người này ngồi trong phòng là mọi thông tin đều được cập nhật theo thời gian thực.",
    // quote: "Ủa, mọi người chưa biết chuyện đó hả?"
  },
  {
    name: "Máy cày KPI 5",
    role: "me",
    icon: "👨🏻‍💻",
    gender: "male",
    isMe: true,
    accent: "#57d6c2",
    bio: "thanh niên nghiêm túc"
    // bio: "Nhân vật chính của bộ phim. Một tháng nhập liệu đã mở khóa kỹ năng Ctrl+C/Ctrl+V cấp S, phản xạ né deadline và tuyệt kỹ đăng xuất đúng thời điểm.",
    // quote: "Tôi không bỏ cuộc. Tôi chỉ chọn đóng workbook và mở chương mới."
  },
  {
    name: "Máy cày KPI 6",
    role: "CHAOS CONTROLLER",
    icon: "👩🏾‍💻",
    gender: "female",
    accent: "#8ce99a",
    bio: "tiểu sử đang cập nhật vì không dám viết bậy",

    // bio: "Giữa lúc file lỗi, mạng lag, dữ liệu bay màu, người này vẫn bình tĩnh đến mức khiến cả nhóm nghi ngờ họ đã biết trước kết cục.",
    // quote: "Bình tĩnh. Có backup mà… có đúng không nhỉ?"
  }
];

const $ = selector => document.querySelector(selector);

const crewGrid = $("#crewGrid");
const dialog = $("#crewDialog");

let audioCtx = null;
let soundOn = false;

/* =========================
   CREW / HỒ SƠ THÀNH VIÊN
   ========================= */

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function renderCrew() {
  if (!crewGrid) return;

  crewGrid.innerHTML = CREW.map((person, index) => {
    const classes = [
      "crew-card",
      "reveal",
      person.type === "boss" ? "crew-boss" : "",
      person.isMe ? "crew-me" : "",
      person.gender === "female" ? "crew-female" : "crew-male"
    ].filter(Boolean).join(" ");

    const label = person.type === "boss"
      ? "★ THE BOSS LADY ★"
      : person.isMe
        ? "TEAM MEMBER (ME)"
        : "TEAM MEMBER";

    return `
      <button
        class="${classes}"
        type="button"
        data-person="${index}"
        style="--card-accent:${person.accent}"
      >
        <div class="crew-top">
          <span>FILE NO. 0${index + 1}</span>
          <span>${person.type === "boss" ? "★ ★ ★ ★ ★" : "●●●○○"}</span>
        </div>

        <div
          class="avatar"
          role="img"
          aria-label="${person.gender === "female" ? "Avatar nữ" : "Avatar nam"}"
        >
          <span class="avatar-emoji">${person.icon}</span>
        </div>

        <span class="crew-label">${label}</span>
        <h3>${escapeHtml(person.name)}</h3>
        <span class="open-file">OPEN FILE ↗</span>
      </button>
    `;
  }).join("");
//        <p>${escapeHtml(person.role)}</p>

  crewGrid.querySelectorAll(".crew-card").forEach(card => {
    card.addEventListener("click", () => {
      openCrew(Number(card.dataset.person));
    });
  });

  observeReveals();
}

function openCrew(index) {
  const person = CREW[index];

  if (!person || !dialog) return;

  $("#dialogRole").textContent =
    `EMPLOYEE FILE // 0${index + 1} // CLASSIFIED`;

  $("#dialogAvatar").textContent = person.icon;
  $("#dialogAvatar").style.background = person.accent;
  $("#dialogName").textContent = person.name;
  $("#dialogTitle").textContent = person.role;
  $("#dialogBio").textContent = person.bio;
  $("#dialogQuote").textContent = `“${person.quote}”`;

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }

  playTone(440, 0.07);
}

$("#closeDialog")?.addEventListener("click", () => dialog?.close());

dialog?.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

renderCrew();

/* =========================
   SCROLL REVEAL
   ========================= */

function observeReveals() {
  const elements = document.querySelectorAll(
    ".reveal:not([data-observed])"
  );

  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(element => {
    element.dataset.observed = "1";
    observer.observe(element);
  });
}

observeReveals();

/* =========================
   THANH TIẾN TRÌNH CUỘN
   ========================= */

const progress = $("#scrollProgress");

function updateProgress() {
  if (!progress) return;

  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const percentage = maxScroll > 0
    ? window.scrollY / maxScroll * 100
    : 0;

  progress.style.width = `${percentage}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

/* =========================
   ANIMATED COUNTERS
   ========================= */

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = "1";

      animateCount(
        entry.target,
        Number(entry.target.dataset.count)
      );
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll("[data-count]").forEach(element => {
  countObserver.observe(element);
});

function animateCount(element, target) {
  const duration = 1500;
  const start = performance.now();

  function tick(now) {
    const progressValue = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progressValue, 4);

    element.textContent =
      Math.floor(target * eased).toLocaleString("en-US");

    if (progressValue < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

/* =========================
   TOAST MESSAGE
   ========================= */

const toast = $("#toast");
let toastTimer;

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

/* =========================
   RETRO SOUND EFFECTS
   ========================= */

function playTone(frequency = 440, duration = 0.09) {
  if (!soundOn) return;

  try {
    audioCtx = audioCtx ||
      new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    oscillator.type = "square";
    oscillator.frequency.value = frequency;
    gain.gain.value = 0.035;

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    oscillator.start();

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioCtx.currentTime + duration
    );

    oscillator.stop(audioCtx.currentTime + duration);
  } catch (error) {
    // Một số trình duyệt có thể chặn Web Audio.
  }
}

$("#soundToggle")?.addEventListener("click", () => {
  soundOn = !soundOn;

  $("#soundToggle").setAttribute(
    "aria-pressed",
    String(soundOn)
  );

  $("#soundToggle").innerHTML = soundOn
    ? '♫ <span>DRAMA ENABLED</span>'
    : '♫ <span>ENABLE DRAMA</span>';

  showToast(
    soundOn
      ? "Âm thanh retro đã bật. Đừng bật trong cuộc họp nhé."
      : "Âm thanh đã tắt."
  );

  if (soundOn) {
    playTone(660, 0.08);
    setTimeout(() => playTone(880, 0.08), 100);
  }
});

/* =========================
   FINAL BOSS
   ========================= */

let bossHP = 999999;
let attacks = 0;

const bossLines = [
  "Boss bị choáng bởi thao tác lưu file quá chuyên nghiệp.",
  "Một sheet đã đóng. Còn 13 sheet và một nỗi đau.",
  "BẠN ĐÃ GÂY 0.0001% SÁT THƯƠNG. TIẾP TỤC CỐ GẮNG!",
  "Boss đang gọi quản lý để xin thêm deadline.",
  "Critical hit! File đã được lưu vào đúng thư mục (hiếm gặp).",
  "Boss sử dụng chiêu thức: 'Em sửa giúp chị một chút nhé'.",
  "Bạn đã mở khóa kỹ năng tối thượng: TẮT MÁY ĐI VỀ."
];

$("#attackBtn")?.addEventListener("click", () => {
  attacks++;

  bossHP = Math.max(
    0,
    bossHP - Math.floor(120000 + Math.random() * 80000)
  );

  $("#bossHp").style.width = `${bossHP / 999999 * 100}%`;

  $("#bossHpText").textContent =
    `${bossHP.toLocaleString("en-US")} / 999,999`;

  $("#bossMessage").textContent = bossHP === 0
    ? "BOSS DEFEATED. Bạn chính thức được tự do. (Có thể vẫn còn bàn giao.)"
    : bossLines[(attacks - 1) % bossLines.length];

  playTone(bossHP === 0 ? 880 : 220 + attacks * 35, 0.12);

  if (bossHP === 0) {
    $("#attackBtn").textContent = "✓ BOSS DEFEATED";
    $("#attackBtn").disabled = true;

    showToast("ACHIEVEMENT UNLOCKED: ĐÃ LƯU FILE LẦN CUỐI");
  }
});

/* =========================
   END CREDITS
   ========================= */

$("#creditsBtn")?.addEventListener("click", () => {
  $("#credits").classList.remove("hidden");

  $("#credits").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  const finalCredit = $("#credits .credit-list b:last-child");

  if (finalCredit) {
    finalCredit.textContent =
      `${YOUR_NAME} AS THE ESCAPE ARTIST`;
  }

  showToast("Cảm ơn vì đã xem đến after-credit scene.");
});

$("#replayBtn")?.addEventListener("click", () => {
  $("#credits").classList.add("hidden");

  bossHP = 999999;
  attacks = 0;

  $("#bossHp").style.width = "100%";
  $("#bossHpText").textContent = "999,999 / 999,999";
  $("#bossMessage").textContent =
    "Boss đang chờ bạn lưu file lần cuối.";

  $("#attackBtn").disabled = false;
  $("#attackBtn").textContent = "⚔ TẤN CÔNG BẰNG CTRL + S";

  window.scrollTo({ top: 0, behavior: "smooth" });

  showToast("Đang tải lại ký ức…");
});

/* =========================
   FAREWELL MP3 PLAYER
   ========================= */

const farewellAudio = $("#farewellAudio");
const musicPlayBtn = $("#musicPlayBtn");
const musicMuteBtn = $("#musicMuteBtn");
const musicSeek = $("#musicSeek");
const musicCurrentTime = $("#musicCurrentTime");
const musicDuration = $("#musicDuration");
const musicStatus = $("#musicStatus");
const vinylDisc = $("#vinylDisc");

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

function updateMusicProgress() {
  if (!farewellAudio) return;

  const duration = farewellAudio.duration || 0;

  if (musicCurrentTime) {
    musicCurrentTime.textContent =
      formatTime(farewellAudio.currentTime);
  }

  if (musicDuration) {
    musicDuration.textContent = formatTime(duration);
  }

  if (
    musicSeek &&
    duration > 0 &&
    document.activeElement !== musicSeek
  ) {
    musicSeek.value = String(
      farewellAudio.currentTime / duration * 100
    );
  }
}

musicPlayBtn?.addEventListener("click", async () => {
  if (!farewellAudio) return;

  if (farewellAudio.paused) {
    try {
      await farewellAudio.play();
    } catch (error) {
      if (musicStatus) {
        musicStatus.textContent =
          "KHÔNG PHÁT ĐƯỢC NHẠC — hãy kiểm tra file farewell.mp3.";
      }

      showToast(
        "Không phát được nhạc. Hãy kiểm tra file farewell.mp3."
      );
    }
  } else {
    farewellAudio.pause();
  }
});

farewellAudio?.addEventListener("play", () => {
  if (musicPlayBtn) musicPlayBtn.textContent = "Ⅱ PAUSE";
  if (musicStatus) {
    musicStatus.textContent =
      "NOW PLAYING — STAY FOR ONE LAST SONG.";
  }

  vinylDisc?.classList.add("is-playing");
});

farewellAudio?.addEventListener("pause", () => {
  if (musicPlayBtn) musicPlayBtn.textContent = "▶ PLAY";
  vinylDisc?.classList.remove("is-playing");
});

farewellAudio?.addEventListener("ended", () => {
  if (musicStatus) {
    musicStatus.textContent =
      "END OF TRACK — THANK YOU FOR THE MEMORIES.";
  }
});

farewellAudio?.addEventListener("loadedmetadata", updateMusicProgress);
farewellAudio?.addEventListener("timeupdate", updateMusicProgress);

farewellAudio?.addEventListener("error", () => {
  if (musicStatus) {
    musicStatus.textContent =
      "CHƯA TÌM THẤY farewell.mp3 — hãy đặt file cạnh index.html.";
  }
});

musicMuteBtn?.addEventListener("click", () => {
  if (!farewellAudio) return;

  farewellAudio.muted = !farewellAudio.muted;

  musicMuteBtn.textContent = farewellAudio.muted
    ? "♫ UNMUTE"
    : "♫ MUTE";
});

musicSeek?.addEventListener("input", () => {
  if (
    !farewellAudio ||
    !Number.isFinite(farewellAudio.duration)
  ) {
    return;
  }

  farewellAudio.currentTime =
    Number(musicSeek.value) / 100 * farewellAudio.duration;

  updateMusicProgress();
});

/* =========================
   KEYBOARD SHORTCUTS
   ========================= */

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && dialog?.open) {
    dialog.close();
  }

  if (
    event.key === "Enter" &&
    document.activeElement === document.body &&
    window.scrollY < 100
  ) {
    $("#trailer")?.scrollIntoView({ behavior: "smooth" });
    playTone(660, 0.08);
  }
  //sửa lại ctrl + s thành ctrl + v hoặc ctrl + c đều được cho phù hợp với nội dung
  if (event.key.toLowerCase() === "v" || event.key.toLowerCase() === "c" && event.ctrlKey) {
    event.preventDefault();
    $("#attackBtn")?.click();
  } 
  
  
  // if (event.key.toLowerCase() === "v" && event.ctrlKey) {
  //   event.preventDefault();
  //   $("#attackBtn")?.click();
  // }
});
