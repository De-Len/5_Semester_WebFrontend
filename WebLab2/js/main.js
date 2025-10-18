document.addEventListener('DOMContentLoaded', () => {
    // --- элементы интерфейса ---
    const cardTitle = document.getElementById('cardTitle');

    const openBtn = document.getElementById('openSheet');
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
    openBtn.addEventListener('click', openEditWindow);
    overlay.addEventListener('click', closeEditWindow);
    cancelBtn.addEventListener('click', closeEditWindow);

    confirmYes.addEventListener('click', () => {
        if (cardToDelete) cardToDelete.remove();
        closeConfirm();
    });
    confirmNo.addEventListener('click', closeConfirm);
    confirmOverlay.addEventListener('click', closeConfirm);

    // --- создание карточки ---
    saveBtn.addEventListener('click', () => {
        noTaskArticle.classList.add('deactive');

        const inputs = editWindow.querySelectorAll('textarea');
        const miniText = inputs[0].value.trim();
        const maxText = inputs[1].value.trim();

        if (!miniText && !maxText) {
            alert('Введите текст!');
            return;
        }

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
        `;

        card.querySelector('.delete-btn').addEventListener('click', () => openConfirm(card));

        container.appendChild(card);
        closeEditWindow();
    });
});