/**
 * A.S.N Builders - WhatsApp Multi-Contact Popup
 * Floating button opens popup with 2 contact options
 */
(function() {
    'use strict';

    const CONTACTS = [
        { number: '8801708135425', label: 'WhatsApp Support 1' },
        { number: '8801925263859', label: 'WhatsApp Support 2' }
    ];

    const whatsappSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

    function createPopup() {
        const overlay = document.createElement('div');
        overlay.className = 'wa-popup-overlay';
        overlay.setAttribute('aria-hidden', 'true');

        const popup = document.createElement('div');
        popup.className = 'wa-popup';
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-label', 'Select WhatsApp contact');

        popup.innerHTML = 
            '<div class="wa-popup-header">' +
                '<span class="wa-popup-title">Chat on WhatsApp</span>' +
                '<button type="button" class="wa-popup-close" aria-label="Close">&times;</button>' +
            '</div>' +
            '<div class="wa-popup-list"></div>';

        const list = popup.querySelector('.wa-popup-list');
        CONTACTS.forEach(function(c) {
            const opt = document.createElement('a');
            opt.href = 'https://wa.me/' + c.number;
            opt.target = '_blank';
            opt.rel = 'noopener noreferrer';
            opt.className = 'wa-contact-option';
            opt.innerHTML = 
                '<span class="wa-contact-icon">' + whatsappSvg + '</span>' +
                '<span class="wa-contact-info">' +
                    '<span class="wa-contact-label">' + c.label + '</span>' +
                    '<span class="wa-contact-number">+' + c.number + '</span>' +
                '</span>';
            list.appendChild(opt);
        });

        overlay.appendChild(popup);
        document.body.appendChild(overlay);
        return overlay;
    }

    function init() {
        var overlay = document.querySelector('.wa-popup-overlay');
        if (!overlay) {
            overlay = createPopup();
        }

        var openPopup = function() {
            overlay.classList.add('active');
            overlay.setAttribute('aria-hidden', 'false');
        };

        var closePopup = function() {
            overlay.classList.remove('active');
            overlay.setAttribute('aria-hidden', 'true');
        };

        overlay.querySelector('.wa-popup-close').onclick = closePopup;
        overlay.onclick = function(e) {
            if (e.target === overlay) closePopup();
        };

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closePopup();
            }
        });

        var triggers = document.querySelectorAll('.floating-btn.whatsapp, .floating-contact-btn.whatsapp');
        triggers.forEach(function(btn) {
            if (btn.dataset.waPopupInit) return;
            btn.dataset.waPopupInit = '1';
            if (btn.tagName === 'A') {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    openPopup();
                });
                btn.removeAttribute('href');
                btn.style.cursor = 'pointer';
            } else {
                btn.onclick = openPopup;
            }
        });

        if (triggers.length === 0) {
            var wrapper = document.querySelector('.floating-buttons') || document.querySelector('.floating-contact-wrapper');
            if (wrapper) {
                var newBtn = document.createElement('button');
                newBtn.type = 'button';
                newBtn.className = 'floating-btn wa-trigger-btn';
                newBtn.setAttribute('aria-label', 'WhatsApp');
                newBtn.innerHTML = whatsappSvg;
                newBtn.onclick = openPopup;
                wrapper.insertBefore(newBtn, wrapper.firstChild);
            } else {
                var standalone = document.createElement('div');
                standalone.className = 'floating-buttons';
                standalone.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;';
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'floating-btn wa-trigger-btn';
                btn.setAttribute('aria-label', 'WhatsApp');
                btn.innerHTML = whatsappSvg;
                btn.onclick = openPopup;
                standalone.appendChild(btn);
                document.body.appendChild(standalone);
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(init, 100);
        });
    } else {
        setTimeout(init, 100);
    }
})();
