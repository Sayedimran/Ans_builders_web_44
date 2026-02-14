/**
 * ANS Builders - Floating Contact Buttons
 * Injects WhatsApp, Messenger, and Phone buttons into the page
 */

(function() {
    'use strict';

    const PHONE = '+8801708135425';
    const MESSENGER_USERNAME = 'YourFacebookUsername'; // Update with actual Facebook page username

    const whatsappSvg = '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 0C7.164 0 0 7.164 0 16c0 2.825.737 5.49 2.027 7.788L.052 31.948l8.302-2.137A15.92 15.92 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.333c-2.586 0-5.008-.748-7.045-2.034l-.505-.3-5.223 1.344 1.396-5.093-.33-.524A13.264 13.264 0 012.667 16c0-7.364 5.97-13.333 13.333-13.333S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.315-9.815c-.391-.196-2.312-1.141-2.67-1.27-.358-.13-.619-.196-.879.196-.26.391-1.01 1.27-1.238 1.532-.228.26-.457.293-.848.098-.391-.196-1.65-.608-3.14-1.938-1.161-1.034-1.944-2.312-2.172-2.703-.228-.391-.024-.602.172-.796.177-.176.391-.457.586-.685.196-.228.26-.391.391-.652.13-.26.065-.489-.033-.685-.098-.196-.879-2.119-1.204-2.9-.317-.755-.64-.652-.879-.652l-.587-.02a1.13 1.13 0 00-.815.391c-.277.326-1.06 1.036-1.06 2.525 0 1.49 1.087 2.928 1.238 3.13.152.2 2.137 3.26 5.177 4.57.723.31 1.287.495 1.727.635.727.231 1.391.198 1.913.12.587-.09 2.312-.945 2.637-1.86.326-.914.326-1.696.228-1.86-.098-.163-.358-.26-.748-.456z"/></svg>';

    const messengerSvg = '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 0C7.164 0 0 7.164 0 16c0 4.495 2.384 8.424 5.95 10.569L5.333 32l10.894-5.844A15.93 15.93 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 28.8a12.75 12.75 0 01-6.508-1.787l-.467-.277-4.82 2.587 1.288-4.704-.304-.483A12.73 12.73 0 013.2 16c0-7.062 5.738-12.8 12.8-12.8S28.8 8.938 28.8 16 23.062 28.8 16 28.8zm6.4-14.4h-6.4v6.4h-2.133v-8.533h8.533v2.133z"/></svg>';

    const phoneSvg = '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M6.4 14.4c2.56 5.035 6.165 8.64 11.2 11.2l3.822-3.822a2.133 2.133 0 012.986-.128 28.484 28.484 0 004.885 4.884 2.133 2.133 0 01-.128 2.987l-4.522 4.521a2.133 2.133 0 01-2.347.469 30.293 30.293 0 01-14.72-14.72 2.133 2.133 0 01.47-2.347l4.521-4.522a2.133 2.133 0 012.987-.128 28.484 28.484 0 004.884 4.885 2.133 2.133 0 01-.128 2.986L6.4 14.4z"/></svg>';

    function createWrapper() {
        const wrapper = document.createElement('div');
        wrapper.className = 'floating-contact-wrapper';
        wrapper.setAttribute('aria-label', 'Contact options');

        const whatsapp = document.createElement('a');
        whatsapp.href = 'https://wa.me/' + PHONE.replace(/\D/g, '');
        whatsapp.target = '_blank';
        whatsapp.rel = 'noopener noreferrer';
        whatsapp.className = 'floating-contact-btn whatsapp';
        whatsapp.setAttribute('aria-label', 'Chat on WhatsApp');
        whatsapp.setAttribute('data-tooltip', 'Chat on WhatsApp');
        whatsapp.innerHTML = whatsappSvg;

        const messenger = document.createElement('a');
        messenger.href = 'https://m.me/' + MESSENGER_USERNAME;
        messenger.target = '_blank';
        messenger.rel = 'noopener noreferrer';
        messenger.className = 'floating-contact-btn messenger';
        messenger.setAttribute('aria-label', 'Message on Messenger');
        messenger.setAttribute('data-tooltip', 'Message on Messenger');
        messenger.innerHTML = messengerSvg;

        const phone = document.createElement('a');
        phone.href = 'tel:' + PHONE;
        phone.className = 'floating-contact-btn phone';
        phone.setAttribute('aria-label', 'Call Now');
        phone.setAttribute('data-tooltip', 'Call Now');
        phone.innerHTML = phoneSvg;

        wrapper.appendChild(whatsapp);
        wrapper.appendChild(messenger);
        wrapper.appendChild(phone);

        return wrapper;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            document.body.appendChild(createWrapper());
        });
    } else {
        document.body.appendChild(createWrapper());
    }
})();
