// СКРИПТ ИНИЦИАЛИЗИРУЕТ ВСЕ ФЕНСИБОКСЫ НА ЛЮБЫХ СТРАНИЦАХ
document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('[data-fancybox]');
    const uniqueValues = new Set();
    
    elements.forEach(element => {
        const value = element.getAttribute('data-fancybox');
        if (value) uniqueValues.add(value);
    });
    
    const uniqueFancyboxValues = Array.from(uniqueValues);
    uniqueFancyboxValues.forEach(elem => {
        Fancybox.bind(`[data-fancybox="${elem}"]`, {});
    })
});