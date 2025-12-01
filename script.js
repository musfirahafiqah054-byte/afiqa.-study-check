document.addEventListener('DOMContentLoaded', () => {
    const subjectSelector = document.getElementById('subject-selector');
    const startSessionBtn = document.getElementById('start-session-btn');
    const selectorArea = document.querySelector('.selector-area');
    const flashcardArea = document.getElementById('flashcard-area');
    const quizArea = document.getElementById('quiz-area');
    const flashcard = document.getElementById('flashcard');
    const cardFront = document.getElementById('card-front');
    const cardBack = document.getElementById('card-back');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const quizBtn = document.getElementById('quiz-btn'); // Tombol Kuis
    const quizQuestionEl = document.getElementById('quiz-question');
    const answerButtonsEl = document.getElementById('answer-buttons');
    const quizFeedbackEl = document.getElementById('quiz-feedback');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const backToMenuBtn = document.getElementById('back-to-menu-btn');


    let currentDeck = [];
    let currentCardIndex = 0;
    let quizQuestions = [];
    let currentQuizIndex = 0;

    // Data Materi (Sama seperti sebelumnya)
    const materials = {
        Sosiologi: [
            { front: "Apa itu Sosialisasi?", back: "Proses penanaman kebiasaan, nilai, dan aturan dari satu generasi ke generasi berikutnya." },
            { front: "Apa fungsi lembaga sosial?", back: "Mengatur serangkaian tindakan manusia dalam rangka memenuhi kebutuhan hidup pokok." },
            { front: "Diferensiasi Sosial?", back: "Pembedaan posisi individu/kelompok secara horizontal (ras, etnis, agama, profesi)." },
            { front: "Stratifikasi Sosial?", back: "Pembedaan posisi individu/kelompok secara vertikal (tingkatan berdasarkan status/ekonomi)." },
            { front: "Contoh Lembaga Pendidikan?", back: "Sekolah (TK, SD, SMP, SMA), Universitas." },
            { front: "Ciri utama lembaga sosial?", back: "Memiliki tujuan khusus, berumur panjang, memiliki norma, dan sanksi yang mengikat." },
            { front: "Interaksi Sosial?", back: "Hubungan timbal balik antara individu dan individu, individu dan kelompok, atau kelompok dan kelompok." },
            { front: "Apa itu Nilai Sosial?", back: "Konsep abstrak dalam diri manusia mengenai apa yang dianggap baik dan buruk." },
            { front: "Apa itu Norma Sosial?", back: "Aturan atau pedoman perilaku yang diharapkan dalam masyarakat." },
            { front: "Mobilitas Sosial?", back: "Perubahan status atau posisi seseorang/kelompok dari satu lapisan ke lapisan lain." },
            { front: "Konflik Sosial?", back: "Proses sosial antara dua pihak atau lebih yang berusaha menyingkirkan pihak lain." }
        ],
        Matematika: [
            { front: "Rumus Luas Lingkaran?", back: "L = π × r²" },
            { front: "Apa itu Bilangan Prima?", back: "Bilangan asli > 1, yang faktor pembaginya adalah 1 dan bilangan itu sendiri." },
            { front: "Nilai dari sin(90°)?", back: "1" },
            { front: "Rumus Pythagoras?", back: "a² + b² = c²" },
            { front: "Rumus Keliling Lingkaran?", back: "K = 2 × π × r" },
            { front: "Nilai dari cos(0°)?", back: "1" },
            { front: "Turunan dari f(x) = x²?", back: "f'(x) = 2x" },
            { front: "Integral dari 2x?", back: "x² + C (Konstanta)" },
            { front: "Berapa jumlah sudut dalam segitiga?", back: "180 derajat" },
            { front: "Apa itu Fungsi Kuadrat?", back: "Fungsi polinomial orde kedua, dengan bentuk f(x) = ax² + bx + c." },
            { front: "Apa itu Logaritma?", back: "Operasi matematika kebalikan dari eksponen atau pemangkatan." }
        ],
        Informatika: [
            { front: "Apa itu HTML?", back: "HyperText Markup Language, bahasa standar untuk menyusun halaman web." },
            { front: "Apa fungsi CSS?", back: "Cascading Style Sheets, mengatur tampilan elemen (warna, font, layout)." },
            { front: "Apa itu Algoritma?", back: "Urutan langkah-langkah logis untuk menyelesaikan suatu masalah." },
            { front: "Apa itu Variabel dalam pemrograman?", back: "Lokasi penyimpanan dalam memori yang digunakan untuk menyimpan data." },
            { front: "Apa itu Tipe Data Integer?", back: "Tipe data untuk bilangan bulat (contoh: 10, 1000)." },
            { front: "Apa itu Tipe Data Boolean?", back: "Tipe data dengan dua nilai: True (benar) atau False (salah)." },
            { front: "Apa itu Loop (Perulangan)?", back: "Struktur kontrol yang mengulangi blok kode tertentu selama kondisi terpenuhi." },
            { front: "Apa itu IP Address?", back: "Alamat unik yang mengidentifikasi perangkat di jaringan (misal: 192.168.1.1)." },
            { front: "Apa itu Topologi Jaringan Star?", back: "Topologi jaringan di mana semua perangkat terhubung ke hub pusat atau switch." },
            { front: "Apa itu Firewall?", back: "Sistem keamanan jaringan yang memonitor dan mengontrol lalu lintas jaringan masuk dan keluar." },
            { front: "Apa itu Pseudocode?", back: "Deskripsi informal tingkat tinggi tentang algoritma." }
        ]
    };

    // --- Fungsi Flashcard ---
    startSessionBtn.addEventListener('click', () => {
        const selectedSubject = subjectSelector.value;
        currentDeck = materials[selectedSubject];
        currentCardIndex = 0;
        if (currentDeck.length > 0) {
            flashcardArea.style.display = 'block';
            selectorArea.style.display = 'none';
            renderCard();
        }
    });

    function renderCard() {
        const currentCard = currentDeck[currentCardIndex];
        cardFront.textContent = currentCard.front;
        cardBack.textContent = currentCard.back;
        flashcard.classList.remove('flipped'); 
    }

    flashcard.addEventListener('click', () => {
        flashcard.classList.toggle('flipped');
    });

    nextBtn.addEventListener('click', () => {
        if (currentCardIndex < currentDeck.length - 1) {
            currentCardIndex++;
            renderCard();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            renderCard();
        }
    });

    // --- Fungsi Kuis ---
    quizBtn.addEventListener('click', startQuiz);
    backToMenuBtn.addEventListener('click', () => {
        quizArea.style.display = 'none';
        selectorArea.style.display = 'block';
    });

    function startQuiz() {
        // Pindah tampilan dari flashcard ke kuis
        flashcardArea.style.display = 'none';
        quizArea.style.display = 'block';
        currentQuizIndex = 0;
        quizQuestions = generateQuizQuestions(currentDeck);
        showQuestion();
    }

    function generateQuizQuestions(deck) {
        // Membuat soal kuis: Pertanyaan adalah 'front', jawaban benar adalah 'back'
        return deck.map(card => {
            const correctAnswer = card.back;
            let options = [correctAnswer];
            
            // Tambahkan 3 jawaban salah acak dari deck yang sama
            while (options.length < 4) {
                const randomCard = deck[Math.floor(Math.random() * deck.length)];
                if (!options.includes(randomCard.back)) {
                    options.push(randomCard.back);
                }
            }
            // Acak urutan opsi jawaban
            options.sort(() => Math.random() - 0.5);

            return {
                question: card.front,
                options: options,
                answer: correctAnswer
            };
        });
    }

    function showQuestion() {
        resetState();
        const currentQuestion = quizQuestions[currentQuizIndex];
        quizQuestionEl.textContent = currentQuestion.question;

        currentQuestion.options.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.classList.add('btn-answer');
            answerButtonsEl.appendChild(button);
            if (answer === currentQuestion.answer) {
                button.dataset.correct = true;
            }
            button.addEventListener('click', selectAnswer);
        });
    }

    function resetState() {
        nextQuestionBtn.style.display = 'none';
        quizFeedbackEl.textContent = '';
        while (answerButtonsEl.firstChild) {
            answerButtonsEl.removeChild(answerButtonsEl.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const isCorrect = selectedButton.dataset.correct;

        // Feedback visual sederhana (CSS untuk warna perlu ditambahkan di style.css jika mau)
        if (isCorrect) {
            quizFeedbackEl.textContent = "Jawaban Benar! 🎉";
            selectedButton.style.backgroundColor = '#c8e6c9'; // Hijau muda
        } else {
            quizFeedbackEl.textContent = "Jawaban Salah. Tetap semangat! 😕";
            selectedButton.style.backgroundColor = '#ffcdd2'; // Merah muda
        }

        // Nonaktifkan semua tombol setelah memilih
        Array.from(answerButtonsEl.children).forEach(button => {
            button.disabled = true;
        });

        nextQuestionBtn.style.display = 'block';
    }

    nextQuestionBtn.addEventListener('click', () => {
        currentQuizIndex++;
        if (currentQuizIndex < quizQuestions.length) {
            showQuestion();
        } else {
            resetState();
            quizQuestionEl.textContent = "Kuis Selesai! Kerja bagus!";
            nextQuestionBtn.style.display = 'none';
        }
    });
});
