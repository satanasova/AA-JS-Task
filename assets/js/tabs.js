function tab(elementID){
    const tabContainer = document.querySelector(elementID);
    const tabTitles = tabContainer.querySelector('.nav-tabs');
    const tabContents = tabContainer.querySelector('.tab-content');

    const tabs = Array.from(tabTitles.children);
    const contents = Array.from(tabContents.children);

    tabs[2].classList.add('active');
    contents[2].classList.add('active');

    tabTitles.addEventListener('click', e => {
        const clickedTab = e.target;

        if(!tabs.includes(clickedTab)) {
            return;
        }

        const tabIndex = tabs.indexOf(clickedTab);

        tabs.forEach(tab => tab.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));

        tabs[tabIndex].classList.add('active');
        contents[tabIndex].classList.add('active');
    })
}