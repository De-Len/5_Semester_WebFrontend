document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openSheet');
    const overlay = document.getElementById('overlay');
    const editWindow = document.getElementById('editWindow');
    const cancelBtn = document.getElementById('cancelBtn');
    const saveBtn = document.getElementById('saveBtn');

    const container = document.querySelector('.container');

    openBtn.addEventListener('click', () => {
        overlay.classList.add('active');
        editWindow.classList.add('active');
    });

    function closeWindow() {
        overlay.classList.remove('active');
        editWindow.classList.remove('active');
        editWindow.querySelectorAll('textarea').forEach(t => t.value = '');
    }

    overlay.addEventListener('click', closeWindow);
    cancelBtn.addEventListener('click', closeWindow);

    saveBtn.addEventListener('click', () => {
        const inputs = editWindow.querySelectorAll('textarea');
        const miniText = inputs[0].value.trim();
        const maxText = inputs[1].value.trim();

        if (!miniText && !maxText) {
            alert('Введите текст!');
            return;
        }

        // Создаём карточку
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

        card.querySelector('.delete-btn').addEventListener('click', () => {
            card.remove();
        });

        container.appendChild(card);
        closeWindow();
    });
});