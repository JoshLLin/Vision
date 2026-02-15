document.addEventListener('DOMContentLoaded', () => {
    // 搜索栏交互逻辑 
    const searchBtn = document.getElementById('searchBtn');
    const closeSearch = document.getElementById('closeSearch');
    const searchContainer = document.getElementById('searchContainer');
    const navItems = document.getElementById('navItems');
    const navActions = document.getElementById('navActions');
    const navLogo = document.getElementById('navLogo');
    const searchInput = document.getElementById('searchInput');

    searchBtn.addEventListener('click', () => {
        //显示搜索栏
        searchContainer.classList.add('active');
        
        //隐藏其他所有导航元素
        navItems.classList.add('fade-hidden');
        navActions.classList.add('fade-hidden');
        navLogo.classList.add('fade-hidden');

        setTimeout(() => searchInput.focus(), 100);
    });

    closeSearch.addEventListener('click', () => {
        //隐藏搜索栏
        searchContainer.classList.remove('active');
        
        //恢复其他元素
        navItems.classList.remove('fade-hidden');
        navActions.classList.remove('fade-hidden');
        navLogo.classList.remove('fade-hidden');
        
        searchInput.value = ''; 
    });

    //Scrollytelling 
    const scrollySection = document.getElementById('scrollySection');
    const layerDist = document.getElementById('layer-distance');
    const layerInter = document.getElementById('layer-intermediate');
    const layerNear = document.getElementById('layer-near');
    
    const heroTitle = document.getElementById('heroTitle');
    const heroDesc = document.getElementById('heroDesc');
    const heroText = document.getElementById('heroText');

    const scenes = [
        { title: "1...", desc: "。。。。。。" },
        { title: "2...", desc: "。。。。。。" },
        { title: "3...", desc: "。。。。。。" }
    ];

    window.addEventListener('scroll', () => {
        const sectionTop = scrollySection.offsetTop;
        const sectionHeight = scrollySection.offsetHeight;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        if (scrollY >= 0 && scrollY <= sectionHeight) {
            let progress = scrollY / (sectionHeight - windowHeight);
            progress = Math.max(0, Math.min(1, progress)); 

            if (progress < 0.3) {
                //远景
                layerDist.style.opacity = 1;
                layerInter.style.opacity = 0;
                layerNear.style.opacity = 0;
                updateText(0);
                layerDist.style.transform = `scale(${1 + progress * 0.2})`;

            } else if (progress >= 0.3 && progress < 0.6) {
                // 中景过渡
                const localProgress = (progress - 0.3) / 0.3; 
                layerDist.style.opacity = 1 - localProgress; 
                layerInter.style.opacity = localProgress;    
                layerNear.style.opacity = 0;
                updateText(1);
                const blurAmount = (1 - localProgress) * 5; 
                layerInter.style.filter = `blur(${blurAmount}px)`;
                layerInter.style.transform = `scale(1)`;

            } else {
                //近景过渡
                const localProgress = (progress - 0.6) / 0.4;
                layerInter.style.opacity = 1 - localProgress;
                layerNear.style.opacity = localProgress;
                updateText(2);
                layerNear.style.transform = `scale(${1.2 - localProgress * 0.2})`;
            }
        }
    });

    let currentSceneIndex = 0;
    function updateText(index) {
        if (currentSceneIndex !== index) {
            currentSceneIndex = index;
            heroText.style.opacity = 0;
            heroText.style.transform = "translateY(10px)";
            
            setTimeout(() => {
                heroTitle.innerText = scenes[index].title;
                heroDesc.innerText = scenes[index].desc;
                heroText.style.opacity = 1;
                heroText.style.transform = "translateY(0)";
            }, 300);
        }
        if(heroText.style.opacity == '') heroText.classList.add('active');
    }
    
    heroText.classList.add('active');
});