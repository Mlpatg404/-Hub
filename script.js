// Відновлення теми на всіх сторінках
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
}

// Перемикач теми
const themeBtn = document.getElementById('theme-toggle');
function updateThemeBtnText() {
    if (themeBtn) {
        themeBtn.textContent = document.body.classList.contains('dark') ? 'Світла тема' : 'Темна тема';
    }
}
if (themeBtn) {
    updateThemeBtnText();
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        updateThemeBtnText();
    });
}

// Замітки
const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const notesList = document.getElementById('notes-list');

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notesList.innerHTML = '';
    if (notes.length === 0) {
        const empty = document.createElement('li');
        empty.textContent = 'Немає жодної замітки';
        empty.style.opacity = '0.6';
        notesList.appendChild(empty);
        return;
    }
    notes.forEach((note, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${note}</span>
            <button class="delete-btn" title="Видалити">✖</button>`;
        li.querySelector('.delete-btn').onclick = () => {
            notes.splice(idx, 1);
            localStorage.setItem('notes', JSON.stringify(notes));
            loadNotes();
        };
        li.classList.add('note-animate');
        notesList.appendChild(li);
    });
}
if (noteForm && noteInput && notesList) {
    loadNotes();
    noteInput.focus();
    noteForm.addEventListener('submit', e => {
        e.preventDefault();
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        if (noteInput.value.trim()) {
            notes.push(noteInput.value.trim());
            localStorage.setItem('notes', JSON.stringify(notes));
            noteInput.value = '';
            loadNotes();
            noteInput.focus();
        }
    });
}

// Музика
const musicBtn = document.getElementById('music-toggle');
const music = document.getElementById('relax-music');
if (musicBtn && music) {
    // Відновлення стану музики
    if (localStorage.getItem('musicPlaying') === 'true') {
        music.play();
        musicBtn.textContent = 'Зупинити музику';
    }
    musicBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            musicBtn.textContent = 'Зупинити музику';
            localStorage.setItem('musicPlaying', 'true');
        } else {
            music.pause();
            musicBtn.textContent = 'Розслабляюча музика';
            localStorage.setItem('musicPlaying', 'false');
        }
    });
    music.addEventListener('ended', () => {
        musicBtn.textContent = 'Розслабляюча музика';
        localStorage.setItem('musicPlaying', 'false');
    });
}