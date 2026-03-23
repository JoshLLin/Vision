document.addEventListener('DOMContentLoaded', () => {
    
    const header = document.querySelector('.nav-header');
    const backToTopBtn = document.getElementById('back-to-top'); // 获取回到顶部按钮
    
    const handleScroll = () => {
        // 导航栏滚动逻辑
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // 回到顶部按钮显示/隐藏逻辑 
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    };
    
    window.addEventListener('scroll', handleScroll);

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' 
            });
        });
    }

    //模态框状态管理，保留引擎以备特定深层内容使用
    const modalOverlay = document.getElementById('globalModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.modal-close');
    
    const modalData = {
    };

    const openModal = (targetKey) => {
        const data = modalData[targetKey];
        if (data) {
            modalBody.innerHTML = `<h3>${data.title}</h3>${data.content}`;
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        }
    };

    const closeModal = () => {
        if(modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-modal-target]');
        if (trigger) {
            e.preventDefault();
            const target = trigger.getAttribute('data-modal-target');
            openModal(target);
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
});