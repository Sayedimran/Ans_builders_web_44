/**
 * ANS Builders - Theme Toggle (Light/Dark)
 * Only updates data-theme on <html> - does NOT re-init any components.
 * Slider and other animations continue uninterrupted.
 */
(function() {
    var STORAGE_KEY = 'ans-theme';

    function getTheme() {
        return localStorage.getItem(STORAGE_KEY) || 'light';
    }

    function setTheme(theme) {
        var value = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', value);
        localStorage.setItem(STORAGE_KEY, value);
    }

    setTheme(getTheme());

    document.addEventListener('DOMContentLoaded', function() {
        var btn = document.getElementById('themeToggle');
        if (btn) {
            btn.addEventListener('click', function() {
                setTheme(getTheme() === 'dark' ? 'light' : 'dark');
            });
        }
    });
})();
