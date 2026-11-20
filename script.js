// Tabs for the player page. Each tab is a real section with its own #hash,
// so links can be shared and the back button works. Without JavaScript,
// every section shows, one after another.
(function () {
  const panels = Array.from(document.querySelectorAll('[data-tab]'));
  const links = Array.from(document.querySelectorAll('[data-tab-link]'));
  const names = panels.map((p) => p.dataset.tab);
  document.documentElement.classList.add('js');

  function show(name, scroll) {
    if (!names.includes(name)) name = 'work';
    panels.forEach((p) => { p.hidden = p.dataset.tab !== name; });
    links.forEach((a) => {
      if (a.dataset.tabLink === name) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    document.title = name === 'work'
      ? 'Eric Hartman, Senior Product Manager'
      : `${name[0].toUpperCase()}${name.slice(1)}: Eric Hartman`;
    if (scroll) {
      const bar = document.querySelector('.tabbar');
      const top = bar.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY > top) window.scrollTo({ top });
    }
  }

  const fromHash = () => location.hash.replace('#', '');
  window.addEventListener('hashchange', () => show(fromHash(), true));
  // Keep the page from jumping to the section anchor on load.
  if (location.hash) window.scrollTo(0, 0);
  show(fromHash(), false);

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
