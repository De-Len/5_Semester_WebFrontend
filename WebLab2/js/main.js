document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openSheet');
    const overlay = document.getElementById('overlay');
    const bottomSheet = document.getElementById('editWindow');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');


    overlay.classList.add('active');
    bottomSheet.classList.add('active');

    openBtn.addEventListener('click', () => {
        overlay.classList.add('active');
        bottomSheet.classList.add('active');
    });

    overlay.addEventListener('click', closeSheet);
    saveBtn.addEventListener('click', () => {
        alert('Сохранено!');
        closeSheet();
    });

    cancelBtn.addEventListener('click', () => {
        closeSheet();
    });

    function closeSheet() {
        overlay.classList.remove('active');
        bottomSheet.classList.remove('active');
    }
});