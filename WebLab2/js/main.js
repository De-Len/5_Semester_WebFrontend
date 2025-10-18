document.addEventListener('DOMContentLoaded', () => {
    // --- элементы интерфейса ---
    const cardTitle = document.getElementById('cardTitle');
    const cardAbout = document.getElementById('cardAbout');

    const saveCardBtn = document.getElementById('saveCard');
    const overlay = document.getElementById('overlay');
    const editWindow = document.getElementById('editWindow');
    const shareWindow = document.getElementById('shareWindow');
    const miniInput = document.getElementById('miniInput');
    const maxInput = document.getElementById('maxInput');
    const cancelBtn = document.getElementById('cancelBtn');
    const saveBtn = document.getElementById('saveBtn');
    const noTaskArticle = document.getElementById('noTasksArticle');
    const container = document.querySelector('.container');

    // --- элементы окна подтверждения ---
    const confirmWindow = document.getElementById('confirmWindow');
    const confirmYes = document.getElementById('confirmYes');
    const confirmNo = document.getElementById('confirmNo');

    let cardToDelete = null;

    const cards = getCardsFromStorage();
    cards.forEach(cardData => createCard(cardData.title, cardData.about));

    // --- функции ---
    function openEditWindow() {
        overlay.classList.add('active');
        editWindow.classList.add('active');
    }

    function closeEditWindow() {
        overlay.classList.remove('active');
        editWindow.classList.remove('active');
        editWindow.querySelectorAll('textarea').forEach(t => t.value = '');
    }

    function openShareWindow() {
        overlay.classList.add('active');
        shareWindow.classList.add('active');
    }

    function closeShareWindow() {
        overlay.classList.remove('active');
        shareWindow.classList.remove('active');
    }

    function openConfirm(card) {
        cardToDelete = card;
        overlay.classList.add('active');
        confirmWindow.classList.add('active');
    }

    function closeConfirm() {
        overlay.classList.remove('active');
        confirmWindow.classList.remove('active');
        cardToDelete = null;
    }

    // --- обработчики ---
    // openBtn.addEventListener('click', openEditWindow);
    overlay.addEventListener('click', closeEditWindow);
    overlay.addEventListener('click', closeShareWindow);

    cancelBtn.addEventListener('click', closeEditWindow);

    confirmYes.addEventListener('click', () => {
        if (cardToDelete) cardToDelete.remove();
        closeConfirm();
    });
    confirmNo.addEventListener('click', closeConfirm);
    overlay.addEventListener('click', closeConfirm);

    function getCardsFromStorage() {
        const cards = localStorage.getItem('tasks');
        console.log(cards);
        return cards ? JSON.parse(cards) : [];
    }

    function saveCardsToStorage(cards) {
        localStorage.setItem('tasks', JSON.stringify(cards));
    }

    function createCard(miniText, maxText, isAlreadyCreated=false) {
        const cardData = { title: miniText, about: maxText };

        // Сохраняем в localStorage
        if (isAlreadyCreated) {
            const cards = getCardsFromStorage();
            cards.push(cardData);
            saveCardsToStorage(cards);
        }


        noTaskArticle.classList.add('deactive');

        const card = document.createElement('div');
        card.className = 'task-card';
        card.innerHTML = `
          <div class="card-content">
            <div>
              <h3>${miniText}</h3>
              <p>${maxText}</p>
            </div>
            <button class="delete-btn">&times;</button>
          </div>
          <div class="card-under">
            <button class="share-btn">
             <img src="img/Share.svg" alt="Share"/>
            </button>
            <button class="info-btn">
             <img src="img/Info.svg" alt="Info"/>
            </button>
            <button class="edit-btn">
             <img src="img/Edit.svg" alt="Edit"/>
            </button>
          </div>
        `;

        const editBtn = card.querySelector('.edit-btn');
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openEditWindow();

            const titleEl = card.querySelector('h3').textContent;
            const aboutEl = card.querySelector('p').textContent;

            miniInput.value = titleEl;
            maxInput.value = aboutEl;

            const saveHandler = () => {
                card.querySelector('h3').textContent = miniInput.value;
                card.querySelector('p').textContent = maxInput.value;

                console.log(card.querySelector('h3').textContent);
                console.log(card.querySelector('p').textContent);

                closeEditWindow();
                saveBtn.removeEventListener('click', saveHandler);
            };

            saveBtn.addEventListener('click', saveHandler);
        });

        const shareBtn = card.querySelector('.share-btn');
        shareBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            openShareWindow();
        });

        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) return;
            card.classList.toggle('show-actions');
        });

        card.querySelector('.delete-btn').addEventListener('click', () => openConfirm(card));

        container.appendChild(card);
    }

    // --- создание карточки ---
    saveCardBtn.addEventListener('click', () => {

        const miniText = cardTitle.value;
        const maxText = cardAbout.value;

        if (!miniText && !maxText) {
            alert('Введите текст!');
            return;
        }

        createCard(miniText, maxText, true);
    });
});