document.addEventListener('DOMContentLoaded', () => {
    // --- элементы интерфейса ---
    const cardTitle = document.getElementById('cardTitle');
    const cardAbout = document.getElementById('cardAbout');

    const saveCardBtn = document.getElementById('saveCard');
    const overlay = document.getElementById('overlay');
    const editWindow = document.getElementById('editWindow');
    const cancelBtn = document.getElementById('cancelBtn');
    const saveBtn = document.getElementById('saveBtn');
    const noTaskArticle = document.getElementById('noTasksArticle');
    const container = document.querySelector('.container');

    // --- элементы окна подтверждения ---
    const confirmOverlay = document.getElementById('confirmOverlay');
    const confirmWindow = document.getElementById('confirmWindow');
    const confirmYes = document.getElementById('confirmYes');
    const confirmNo = document.getElementById('confirmNo');

    let cardToDelete = null;

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

    function openConfirm(card) {
        cardToDelete = card;
        confirmOverlay.classList.add('active');
        confirmWindow.classList.add('active');
    }

    function closeConfirm() {
        confirmOverlay.classList.remove('active');
        confirmWindow.classList.remove('active');
        cardToDelete = null;
    }

    // --- обработчики ---
    // openBtn.addEventListener('click', openEditWindow);
    overlay.addEventListener('click', closeEditWindow);
    cancelBtn.addEventListener('click', closeEditWindow);

    confirmYes.addEventListener('click', () => {
        if (cardToDelete) cardToDelete.remove();
        closeConfirm();
    });
    confirmNo.addEventListener('click', closeConfirm);
    confirmOverlay.addEventListener('click', closeConfirm);

    // --- создание карточки ---
    saveCardBtn.addEventListener('click', () => {

        const inputs = container.querySelectorAll('textarea');
        const miniText = inputs[0].value.trim();
        const maxText = inputs[1].value.trim();

        if (!miniText && !maxText) {
            alert('Введите текст!');
            return;
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
            e.stopPropagation(); // чтобы не срабатывал toggle show-actions
            openEditWindow();

            const titleEl = card.querySelector('h3').textContent;
            const aboutEl = card.querySelector('p').textContent;
            cardTitle.value = titleEl;
            cardAbout.value = aboutEl;

            const saveHandler = () => {
                card.querySelector('h3').textContent = cardTitle.value;
                card.querySelector('p').textContent = cardAbout.value;
                closeEditWindow();
                saveBtn.removeEventListener('click', saveHandler); // чтобы не дублировалось
            };

            saveBtn.addEventListener('click', saveHandler);
        });

        card.addEventListener('click', (e) => {
            // чтобы не срабатывало при нажатии на кнопку удаления
            if (e.target.classList.contains('delete-btn')) return;
            card.classList.toggle('show-actions');
        });

        card.querySelector('.delete-btn').addEventListener('click', () => openConfirm(card));

        container.appendChild(card);
        // container.appendChild(underCard);
    });


});