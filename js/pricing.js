/* ========================================
   RIYANSH WEB STUDIO — PRICING & CALCULATOR
   ======================================== */

/* Price data */
const PLANS = {
    gbp: { name: 'Google Business Profile', price: 249 },
    starter: { name: 'Starter Website', price: 999 },
    business: { name: 'Business Website', price: 1999 },
    premium: { name: 'Premium Website', price: 3499 }
};

const ADDONS = [
    { id: 'extra-page', name: 'Extra Page', price: 199 },
    { id: 'adv-gallery', name: 'Advanced Gallery', price: 299 },
    { id: 'whatsapp', name: 'WhatsApp Integration', price: 149 },
    { id: 'gbp-addon', name: 'Google Business Profile', price: 249 },
    { id: 'adv-seo', name: 'Advanced SEO', price: 399 },
    { id: 'booking', name: 'Booking System', price: 399 }
];

/* ========================================
   SMART PRICE CALCULATOR
   ======================================== */
function initCalculator() {
    const calcEl = document.getElementById('priceCalculator');
    if (!calcEl) return;

    let selectedPlan = 'starter';
    let selectedAddons = new Set();

    // Render base plan options
    const baseContainer = calcEl.querySelector('.calc-base-options');
    if (baseContainer) {
        baseContainer.innerHTML = '';
        Object.entries(PLANS).forEach(([key, plan]) => {
            const div = document.createElement('div');
            div.className = 'calc-base-option' + (key === selectedPlan ? ' active' : '');
            div.dataset.plan = key;
            div.innerHTML = `
                <span class="calc-base-name">${plan.name}</span>
                <span class="calc-base-price">₹${plan.price.toLocaleString('en-IN')}</span>
            `;
            div.addEventListener('click', () => {
                selectedPlan = key;
                baseContainer.querySelectorAll('.calc-base-option').forEach(o => o.classList.remove('active'));
                div.classList.add('active');
                updateCalcTotal();
            });
            baseContainer.appendChild(div);
        });
    }

    // Render addon options
    const addonContainer = calcEl.querySelector('.calc-addons-list');
    if (addonContainer) {
        addonContainer.innerHTML = '';
        ADDONS.forEach(addon => {
            const div = document.createElement('div');
            div.className = 'calc-addon-item';
            div.dataset.addonId = addon.id;
            div.innerHTML = `
                <div class="calc-addon-left">
                    <div class="calc-addon-check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span class="calc-addon-name">${addon.name}</span>
                </div>
                <span class="calc-addon-price">+₹${addon.price.toLocaleString('en-IN')}</span>
            `;
            div.addEventListener('click', () => {
                if (selectedAddons.has(addon.id)) {
                    selectedAddons.delete(addon.id);
                    div.classList.remove('selected');
                } else {
                    selectedAddons.add(addon.id);
                    div.classList.add('selected');
                }
                updateCalcTotal();
            });
            addonContainer.appendChild(div);
        });
    }

    function updateCalcTotal() {
        const plan = PLANS[selectedPlan];
        let addonTotal = 0;
        let addonBreakdown = [];

        selectedAddons.forEach(id => {
            const addon = ADDONS.find(a => a.id === id);
            if (addon) {
                addonTotal += addon.price;
                addonBreakdown.push(addon);
            }
        });

        const total = plan.price + addonTotal;

        // Update summary
        const summaryEl = calcEl.querySelector('.calc-summary');
        if (summaryEl) {
            let html = `<div class="calc-summary-row"><span>Base Plan (${plan.name})</span><span>₹${plan.price.toLocaleString('en-IN')}</span></div>`;
            addonBreakdown.forEach(addon => {
                html += `<div class="calc-summary-row"><span>${addon.name}</span><span>₹${addon.price.toLocaleString('en-IN')}</span></div>`;
            });
            html += `<div class="calc-summary-row total"><span>Total</span><span class="calc-summary-value">₹${total.toLocaleString('en-IN')}</span></div>`;
            summaryEl.innerHTML = html;
        }

        // Store in data for checkout
        calcEl.dataset.plan = selectedPlan;
        calcEl.dataset.planName = plan.name;
        calcEl.dataset.planPrice = plan.price;
        calcEl.dataset.addonTotal = addonTotal;
        calcEl.dataset.total = total;
        calcEl.dataset.addons = JSON.stringify(addonBreakdown);

        // Update checkout button
        const checkoutBtn = calcEl.querySelector('.calc-checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.dataset.plan = selectedPlan;
            checkoutBtn.dataset.planName = plan.name;
            checkoutBtn.dataset.total = total;
        }
    }

    updateCalcTotal();
}

/* ========================================
   WEBSITE BUILDER (Customize)
   ======================================== */
function initBuilder() {
    const builderEl = document.getElementById('websiteBuilder');
    if (!builderEl) return;

    const planSelect = builderEl.querySelector('#builderPlan');
    const totalDisplay = builderEl.querySelector('.builder-total-price');

    const PRICES = {
        'gbp': { base: 249, name: 'Google Business Profile' },
        'starter': { base: 999, name: 'Starter Website' },
        'business': { base: 1999, name: 'Business Website' },
        'premium': { base: 3499, name: 'Premium Website' }
    };

    const PAGE_PRICES = { 'page-home': 0, 'page-about': 199, 'page-services': 199, 'page-products': 299, 'page-gallery': 199, 'page-contact': 149, 'page-faq': 99 };
    const FEATURE_PRICES = { 'feat-whatsapp': 149, 'feat-maps': 99, 'feat-form': 149, 'feat-gallery': 299, 'feat-booking': 399, 'feat-catalogue': 399, 'feat-reviews': 199, 'feat-seo': 399, 'feat-animations': 199 };

    function updateBuilderTotal() {
        const planKey = planSelect ? planSelect.value : 'starter';
        const plan = PRICES[planKey] || PRICES['starter'];
        let total = plan.base;

        // Count selected pages (excluding free Home page for non-GBP)
        const selectedPages = builderEl.querySelectorAll('input[data-builder-group="pages"]:checked');
        selectedPages.forEach(cb => {
            const id = cb.id || cb.dataset.priceKey;
            if (PAGE_PRICES[id] !== undefined) total += PAGE_PRICES[id];
        });

        // Count selected features
        const selectedFeatures = builderEl.querySelectorAll('input[data-builder-group="features"]:checked');
        selectedFeatures.forEach(cb => {
            const id = cb.id || cb.dataset.priceKey;
            if (FEATURE_PRICES[id] !== undefined) total += FEATURE_PRICES[id];
        });

        if (totalDisplay) {
            totalDisplay.textContent = '₹' + total.toLocaleString('en-IN');
        }

        builderEl.dataset.total = total;
        builderEl.dataset.planName = plan.name;

        // Update the checkout button
        const checkoutBtn = builderEl.querySelector('.builder-checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.dataset.plan = planKey;
            checkoutBtn.dataset.planName = plan.name;
            checkoutBtn.dataset.total = total;
        }
    }

    // Listen for changes
    builderEl.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', updateBuilderTotal);
    });

    if (planSelect) {
        planSelect.addEventListener('change', updateBuilderTotal);
    }

    updateBuilderTotal();
}

/* ========================================
   CHECKOUT BUTTON HANDLERS
   ======================================== */
function initCheckoutRedirects() {
    // Calculator checkout button
    const calcBtn = document.getElementById('calcCheckoutBtn');
    if (calcBtn) {
        calcBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const calc = document.getElementById('priceCalculator');
            if (!calc) return;
            const plan = calc.dataset.plan || 'starter';
            const planName = calc.dataset.planName || 'Starter Website';
            const total = calc.dataset.total || '999';
            const planPrice = calc.dataset.planPrice || '999';
            const addons = calc.dataset.addons || '[]';
            window.location.href = `checkout.html?plan=${plan}&planName=${encodeURIComponent(planName)}&total=${total}&planPrice=${planPrice}&addons=${encodeURIComponent(addons)}`;
        });
    }

    // Builder checkout button
    const builderBtn = document.querySelector('.builder-checkout-btn');
    if (builderBtn) {
        builderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const builder = document.getElementById('websiteBuilder');
            if (!builder) return;
            const plan = builderBtn.dataset.plan || 'starter';
            const planName = builderBtn.dataset.planName || 'Starter Website';
            const total = builderBtn.dataset.total || builder.dataset.total || '999';
            window.location.href = `checkout.html?plan=${plan}&planName=${encodeURIComponent(planName)}&total=${total}`;
        });
    }
}

/* Initialize on DOMContentLoaded */
document.addEventListener('DOMContentLoaded', () => {
    initCalculator();
    initBuilder();
    initCheckoutRedirects();
});
