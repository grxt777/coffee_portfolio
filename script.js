// Мобильное меню
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// Анимация бургер-меню
burger.addEventListener('click', () => {
    // Переключение навигации
    nav.classList.toggle('nav-active');
    
    // Анимация ссылок
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Анимация бургера
    burger.classList.toggle('toggle');
});

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Закрываем мобильное меню при клике
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        }
    });
});

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Отключаем наблюдение после появления
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Наблюдаем за элементами, которые должны анимироваться
document.querySelectorAll('.menu-item, .gallery-item, .about-content, .contact-info').forEach((el) => {
    observer.observe(el);
});

// Фиксированная навигация при прокрутке
let lastScroll = 0;
const header = document.querySelector('.header');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Добавляем/убираем тень у шапки
    if (currentScroll > 0) {
        header.style.boxShadow = '0 2px 20px rgba(44, 24, 16, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    // Показываем/скрываем шапку при прокрутке
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Прокрутка вниз
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Прокрутка вверх
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Плавное появление элементов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        heroContent.style.transition = 'all 1s ease-out';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 100);
});

// Добавляем анимацию для бургер-меню
const burgerAnimation = () => {
    const lines = document.querySelectorAll('.burger div');
    lines.forEach(line => {
        line.style.transition = 'all 0.3s ease';
    });
};

burgerAnimation();

// Фильтрация меню по категориям
const categoryButtons = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');

// Показываем все элементы категории "coffee" при загрузке
document.addEventListener('DOMContentLoaded', () => {
    menuItems.forEach(item => {
        if (item.dataset.category === 'coffee') {
            item.classList.add('show');
        }
    });
});

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Убираем активный класс у всех кнопок
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс нажатой кнопке
        button.classList.add('active');

        const category = button.dataset.category;

        // Анимируем скрытие всех элементов
        menuItems.forEach(item => {
            item.classList.remove('show');
        });

        // Показываем элементы выбранной категории с задержкой
        setTimeout(() => {
            menuItems.forEach(item => {
                if (item.dataset.category === category) {
                    item.classList.add('show');
                }
            });
        }, 300);
    });
}); 