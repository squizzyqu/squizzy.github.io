//Background music
  const bgAudio = new Audio('/sounds/lofi.mp3');
  bgAudio.volume = 0; // start silent for fade-in effect
  bgAudio.loop = true;

  const fadeIn = () => {
    let volume = 0;
    const targetVolume = 0.3; // final volume
    const fadeDuration = 3000; // 3 seconds
    const fadeSteps = 30; // number of steps in fade
    const stepTime = fadeDuration / fadeSteps;
    const volumeStep = targetVolume / fadeSteps;

    const interval = setInterval(() => {
      if (volume < targetVolume) {
        volume += volumeStep;
        bgAudio.volume = Math.min(volume, targetVolume);
      } else {
        clearInterval(interval);
      }
    }, stepTime);
  };

//Unmute + fade in after user interaction
  const enableSound = () => {
    bgAudio.muted = false;
    bgAudio.play().then(fadeIn);
    document.removeEventListener("click", enableSound);
  };

  document.addEventListener("click", enableSound);

//Click sound
function playClick() {
    const clickAudio = document.getElementById("click-sound");
    if (clickAudio) {
      clickAudio.currentTime = 0;
      clickAudio.play().catch(() => {});
    }
  }

//Twinkle sound
function playTwinkle() {
    const clickAudio = document.getElementById("twinkle-sound");
    if (clickAudio) {
      clickAudio.currentTime = 0;
      clickAudio.play().catch(() => {});
    }
  }

document.addEventListener('DOMContentLoaded', () => {
  // List all modals and their buttons
  const modalMappings = [
    { buttonSelector: '.button-about', sectionId: 'aboutWindow' },
    { buttonSelector: '.button-links', sectionId: 'linksWindow' },
    { buttonSelector: '.button-work', sectionId: 'workWindow' },
    { buttonSelector: '.button-contact', sectionId: 'contactWindow' },
    { buttonSelector: '.button-faq', sectionId: 'faqWindow' },
  ];

  modalMappings.forEach(mapping => {
    const button = document.querySelector(mapping.buttonSelector);
    const section = document.getElementById(mapping.sectionId);
    const exitBtn = section.querySelector('.button-exit');

    if (!button || !section || !exitBtn) return;

    let isAnimating = false;

    function openSection() {
      if (isAnimating || section.classList.contains('active')) return;
      playClick(); // play click sound when opening
      section.classList.remove('closing');
      section.style.display = 'flex';
      void section.offsetWidth; // reflow for animation
      section.classList.add('active');
    }

    function closeSection() {
      if (isAnimating || !section.classList.contains('active')) return;
      isAnimating = true;
      playClick(); // play click sound when closing
      section.classList.remove('active');
      section.classList.add('closing');
      setTimeout(() => {
        section.style.display = 'none';
        section.classList.remove('closing');
        isAnimating = false;
      }, 140);
    }

    button.addEventListener('click', openSection);
    exitBtn.addEventListener('click', closeSection);
  });
});

//Time display
  document.addEventListener('DOMContentLoaded', function () {
  const dateEl = document.querySelector('.header-text-squizzyqu');

  function updateTime() {
    const now = new Date();
    const options = {
      timeZone: 'America/New_York', // eastern time (est/edt)
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };

    const timeString = now.toLocaleTimeString('en-US', options);
    const dateString = now.toLocaleDateString('en-US', {
  timeZone: 'America/New_York',
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});
dateEl.textContent = `${dateString} — ${timeString}`;

  }

  updateTime(); // run once immediately
  setInterval(updateTime, 1000); // update every second
});