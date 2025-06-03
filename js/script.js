document.addEventListener('DOMContentLoaded', function() {

    // === MENU HAMBURGUER RESPONSIVO ===
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            // Alterna o ícone do menu
            const icon = menuToggle.querySelector('i');
            if (isExpanded) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Fecha o menu ao clicar em um link (para navegação na mesma página)
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // === EFEITO DE SCROLL NO HEADER ===
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // === ATUALIZAR ANO NO RODAPÉ ===
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // === ANIMAÇÃO DE "FADE-IN-UP" AO ROLAR PARA ELEMENTOS ===
    const animatedElements = document.querySelectorAll('.profile-pic, .sobre-texto, .projeto-item, .habilidade-categoria, .contato-info, .contato-form, .extra-item');

    const observerOptions = {
        root: null, // Observa em relação ao viewport
        rootMargin: '0px',
        threshold: 0.1 // % do elemento visível para disparar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: parar de observar depois que a animação ocorreu
                // observer.unobserve(entry.target);
            } else {
                // Opcional: remover a classe se o elemento sair da tela para re-animar
                // entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.classList.add('fade-in-up'); // Adiciona classe base para estado inicial
        observer.observe(el);
    });


    // === DESTAQUE DO LINK ATIVO NO MENU DE NAVEGAÇÃO AO ROLAR ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function updateActiveLink() {
        let currentSectionId = '';
        const headerHeight = header ? header.offsetHeight : 70; // Altura do header para offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - headerHeight - 20) { // -20 para um pequeno buffer
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            // Verifica se o href do link corresponde à seção atual
            // Remove o '#' do href para comparar com o id da seção
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active-link');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Chama na carga inicial para definir o link ativo


    // === VALIDAÇÃO SIMPLES DO FORMULÁRIO DE CONTATO (CLIENT-SIDE) ===
    // Para um funcionamento real, você precisará de um backend ou serviço de formulário.
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            let isValid = true;
            let
            errorMessage = '';

            if (nome === '') {
                isValid = false;
                errorMessage += 'O campo Nome é obrigatório.\n';
            }
            if (email === '') {
                isValid = false;
                errorMessage += 'O campo E-mail é obrigatório.\n';
            } else {
                // Validação simples de e-mail
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email)) {
                    isValid = false;
                    errorMessage += 'Por favor, insira um e-mail válido.\n';
                }
            }
            if (mensagem === '') {
                isValid = false;
                errorMessage += 'O campo Mensagem é obrigatório.\n';
            }

            if (!isValid) {
                event.preventDefault(); // Impede o envio do formulário
                alert('Por favor, corrija os seguintes erros:\n\n' + errorMessage);
            } else {
                // Aqui você pode adicionar uma mensagem de "Enviando..." ou desabilitar o botão
                // Exemplo: alert('Formulário enviado com sucesso! (Simulação)');
                // event.preventDefault(); // Descomente se estiver testando e não quiser que a página recarregue
            }
        });
    }

});