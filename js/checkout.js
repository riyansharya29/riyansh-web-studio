/* ========================================
   RIYANSH WEB STUDIO — CHECKOUT FLOW
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCheckoutFlow();
});

function initCheckoutFlow() {
    const checkoutEl = document.getElementById('checkoutFlow');
    if (!checkoutEl) return;

    let currentStep = 1;
    const totalSteps = 5;
    const orderData = {
        plan: '',
        planName: '',
        planPrice: 0,
        addons: [],
        addonTotal: 0,
        total: 0,
        name: '',
        business: '',
        whatsapp: '',
        email: '',
        businessType: '',
        requirements: ''
    };

    // Load data from URL params (passed from plans/builder)
    const params = new URLSearchParams(window.location.search);
    if (params.get('plan')) orderData.plan = params.get('plan');
    if (params.get('planName')) orderData.planName = params.get('planName');
    if (params.get('total')) orderData.total = parseInt(params.get('total')) || 0;
    if (params.get('planPrice')) orderData.planPrice = parseInt(params.get('planPrice')) || 0;
    if (params.get('addons')) {
        try { orderData.addons = JSON.parse(decodeURIComponent(params.get('addons'))); } catch(e) {}
    }

    const PLAN_PRICES = {
        'gbp': { name: 'Google Business Profile', price: 249 },
        'starter': { name: 'Starter Website', price: 999 },
        'business': { name: 'Business Website', price: 1999 },
        'premium': { name: 'Premium Website', price: 3499 }
    };

    // Fill in plan data if available from params
    if (orderData.plan && PLAN_PRICES[orderData.plan]) {
        orderData.planName = PLAN_PRICES[orderData.plan].name;
        orderData.planPrice = PLAN_PRICES[orderData.plan].price;
    }
    if (!orderData.total && orderData.planPrice) {
        orderData.total = orderData.planPrice + (orderData.addonTotal || 0);
    }

    /* Step 1: Select Plan */
    const step1Panel = checkoutEl.querySelector('#checkoutStep1');
    if (step1Panel) {
        const planOptions = step1Panel.querySelectorAll('.calc-base-option');
        planOptions.forEach(opt => {
            if (opt.dataset.plan === orderData.plan) {
                opt.classList.add('active');
            }
            opt.addEventListener('click', () => {
                planOptions.forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                orderData.plan = opt.dataset.plan;
                const planInfo = PLAN_PRICES[opt.dataset.plan];
                orderData.planName = planInfo.name;
                orderData.planPrice = planInfo.price;
                orderData.total = planInfo.price;
            });
        });
    }

    /* Navigation */
    function goToStep(step) {
        if (step < 1 || step > totalSteps) return;

        // Validate before moving forward
        if (step > currentStep) {
            if (!validateStep(currentStep)) return;
        }

        currentStep = step;

        // Update panels
        checkoutEl.querySelectorAll('.checkout-panel').forEach(p => p.classList.remove('active'));
        const activePanel = checkoutEl.querySelector(`#checkoutStep${step}`);
        if (activePanel) activePanel.classList.add('active');

        // Update step indicators
        checkoutEl.querySelectorAll('.checkout-step').forEach((s, i) => {
            s.classList.remove('active', 'completed');
            if (i + 1 === step) s.classList.add('active');
            else if (i + 1 < step) s.classList.add('completed');
        });

        // Populate summary on step 4
        if (step === 4) populateSummary();
    }

    function validateStep(step) {
        if (step === 1) {
            if (!orderData.plan) {
                alert('Please select a plan.');
                return false;
            }
            return true;
        }
        if (step === 3) {
            const name = checkoutEl.querySelector('#checkoutName');
            const whatsapp = checkoutEl.querySelector('#checkoutWhatsapp');
            if (!name.value.trim()) { alert('Please enter your name.'); name.focus(); return false; }
            if (!whatsapp.value.trim()) { alert('Please enter your WhatsApp number.'); whatsapp.focus(); return false; }
            orderData.name = name.value.trim();
            orderData.business = checkoutEl.querySelector('#checkoutBusiness').value.trim();
            orderData.whatsapp = whatsapp.value.trim();
            orderData.email = checkoutEl.querySelector('#checkoutEmail').value.trim();
            orderData.businessType = checkoutEl.querySelector('#checkoutBusinessType').value;
            orderData.requirements = checkoutEl.querySelector('#checkoutRequirements').value.trim();
            return true;
        }
        return true;
    }

    function populateSummary() {
        const summaryEl = checkoutEl.querySelector('#orderSummaryContent');
        if (!summaryEl) return;

        let html = '';
        html += `<div class="order-summary-row"><span>Plan</span><span>${orderData.planName}</span></div>`;
        html += `<div class="order-summary-row"><span>Plan Price</span><span>₹${orderData.planPrice.toLocaleString('en-IN')}</span></div>`;

        if (orderData.addons && orderData.addons.length) {
            orderData.addons.forEach(addon => {
                html += `<div class="order-summary-row"><span>${addon.name}</span><span>₹${addon.price.toLocaleString('en-IN')}</span></div>`;
            });
        }

        html += `<div class="order-summary-row total"><span>Total</span><span>₹${orderData.total.toLocaleString('en-IN')}</span></div>`;
        html += `<div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.06);">`;
        html += `<div class="order-summary-row"><span>Name</span><span>${orderData.name}</span></div>`;
        if (orderData.business) html += `<div class="order-summary-row"><span>Business</span><span>${orderData.business}</span></div>`;
        html += `<div class="order-summary-row"><span>WhatsApp</span><span>${orderData.whatsapp}</span></div>`;
        if (orderData.email) html += `<div class="order-summary-row"><span>Email</span><span>${orderData.email}</span></div>`;
        html += `</div>`;

        summaryEl.innerHTML = html;
    }

    function generateOrderId() {
        const random = Math.floor(1000 + Math.random() * 9000);
        return `RWS-2026-${random}`;
    }

    /* Confirm Order */
    const confirmBtn = checkoutEl.querySelector('#confirmOrderBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            const orderId = generateOrderId();
            orderData.orderId = orderId;

            // Save to localStorage
            const savedOrders = JSON.parse(localStorage.getItem('rws_orders') || '[]');
            savedOrders.push({ ...orderData, date: new Date().toISOString() });
            localStorage.setItem('rws_orders', JSON.stringify(savedOrders));

            // Redirect to order page
            window.location.href = `order.html?id=${orderId}&plan=${encodeURIComponent(orderData.planName)}&total=${orderData.total}&name=${encodeURIComponent(orderData.name)}&business=${encodeURIComponent(orderData.business)}&whatsapp=${encodeURIComponent(orderData.whatsapp)}`;
        });
    }

    /* Nav buttons */
    checkoutEl.querySelectorAll('.checkout-next').forEach(btn => {
        btn.addEventListener('click', () => goToStep(currentStep + 1));
    });
    checkoutEl.querySelectorAll('.checkout-prev').forEach(btn => {
        btn.addEventListener('click', () => goToStep(currentStep - 1));
    });

    /* WhatsApp redirect */
    const waBtn = checkoutEl.querySelector('#whatsappOrderBtn');
    if (waBtn) {
        waBtn.addEventListener('click', () => {
            if (!orderData.orderId) return;
            let msg = `Hi Riyansh,\nI want to order a website.\n\n`;
            msg += `*Order ID:* ${orderData.orderId}\n`;
            msg += `*Name:* ${orderData.name}\n`;
            if (orderData.business) msg += `*Business:* ${orderData.business}\n`;
            msg += `*WhatsApp:* ${orderData.whatsapp}\n`;
            msg += `*Plan:* ${orderData.planName}\n`;
            if (orderData.addons && orderData.addons.length) {
                msg += `*Add-ons:* ${orderData.addons.map(a => a.name).join(', ')}\n`;
            }
            msg += `*Total:* ₹${orderData.total.toLocaleString('en-IN')}\n`;
            if (orderData.requirements) msg += `*Requirements:* ${orderData.requirements}\n`;

            const encoded = encodeURIComponent(msg);
            window.open(`https://wa.me/917048948600?text=${encoded}`, '_blank');
        });
    }
}
