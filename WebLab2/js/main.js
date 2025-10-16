document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openSheet');
    const overlay = document.getElementById('overlay');
    const bottomSheet = document.getElementById('bottomSheet');
    const saveBtn = document.getElementById('saveBtn');

    openBtn.addEventListener('click', () => {
        overlay.classList.add('active');
        bottomSheet.classList.add('active');
    });

    overlay.addEventListener('click', closeSheet);
    saveBtn.addEventListener('click', () => {
        alert('Сохранено!');
        closeSheet();
    });

    function closeSheet() {
        overlay.classList.remove('active');
        bottomSheet.classList.remove('active');
    }
});