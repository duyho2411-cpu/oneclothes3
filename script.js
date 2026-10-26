// ONE CLOTHES - HIGH CRO INTERACTIVE SCRIPT & CAROUSEL ENGINE

// Bảng dữ liệu sản phẩm & giá ưu đãi
const productCatalog = {
    one1: {
        name: "One Clothes 1: Set Sơ Mi Trắng & Quần Short Cạp Cao",
        price: "299.000đ",
        rawPrice: 299000,
        shipping: "Hỗ trợ ship chỉ 15.000đ",
        total: "314.000đ (Đã gồm 15k ship)",
        thumb: "one clothes 1/ONE_CLOTHES_19_POSE_1.png"
    },
    one2: {
        name: "One Clothes 2: Set Blouse Ren & Chân Váy Hồng",
        price: "399.000đ",
        rawPrice: 399000,
        shipping: "Hỗ trợ ship chỉ 15.000đ",
        total: "414.000đ (Đã gồm 15k ship)",
        thumb: "one clothes 2/ONE_CLOTHES_20_POSE_1.png"
    },
    one3: {
        name: "One Clothes 3: Set Thun Body & Váy Vạt Đắp (Best Seller)",
        price: "599.000đ",
        rawPrice: 599000,
        shipping: "MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC",
        total: "599.000đ (Freeship)",
        thumb: "one clothes 3/ONE_CLOTHES_07_POSE_1.png"
    },
    one4: {
        name: "One Clothes 4: Đầm Lụa Satin 2 Dây Cổ Đổ Nâu Đồng",
        price: "499.000đ",
        rawPrice: 499000,
        shipping: "MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC",
        total: "499.000đ (Freeship)",
        thumb: "one clothes 4/ONE_CLOTHES_05_POSE_1.png"
    },
    one5: {
        name: "One Clothes 5: Set Dệt Kim Cúc Ngọc & Chân Váy Kem",
        price: "349.000đ",
        rawPrice: 349000,
        shipping: "Hỗ trợ ship chỉ 15.000đ",
        total: "364.000đ (Đã gồm 15k ship)",
        thumb: "one clothes 5/ONE_CLOTHES_06_POSE_1.png"
    },
    combo2: {
        name: "Combo 2 Món Bất Kỳ (Tự chọn mẫu)",
        price: "699.000đ",
        rawPrice: 699000,
        shipping: "MIỄN PHÍ VẬN CHUYỂN + HỘP SIGNATURE",
        total: "699.000đ (Freeship)",
        thumb: "one clothes 3/ONE_CLOTHES_07_POSE_1.png"
    },
    combo3: {
        name: "Combo 3 Món Bất Kỳ + TẶNG ÁO LỤA CAMISOLE 250K",
        price: "999.000đ",
        rawPrice: 999000,
        shipping: "MIỄN PHÍ VẬN CHUYỂN HỎA TỐC",
        total: "999.000đ (Freeship + Quà 250k)",
        thumb: "one clothes 4/ONE_CLOTHES_05_POSE_1.png"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Khởi tạo Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 3. Countdown Timer (Đồng hồ đếm ngược Flash Sale)
    let totalSeconds = 4 * 3600 + 38 * 60 + 45;
    const hoursEl = document.getElementById('timerHours');
    const minutesEl = document.getElementById('timerMinutes');
    const secondsEl = document.getElementById('timerSeconds');

    function updateCountdown() {
        if (totalSeconds <= 0) {
            totalSeconds = 12 * 3600;
        }
        totalSeconds--;

        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(m).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(s).padStart(2, '0');
    }
    setInterval(updateCountdown, 1000);

    // 4. Horizontal Product Carousel Slider (Cuộn từ phải sang trái / trái sang phải)
    const productSlider = document.getElementById('productSlider');
    const prevBtn = document.getElementById('sliderPrevBtn');
    const nextBtn = document.getElementById('sliderNextBtn');
    const dots = document.querySelectorAll('.slider-dot');

    if (productSlider) {
        // Nút mũi tên Next / Prev
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const card = productSlider.querySelector('.product-card');
                const scrollAmount = card ? card.offsetWidth + 24 : 350;
                productSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const card = productSlider.querySelector('.product-card');
                const scrollAmount = card ? card.offsetWidth + 24 : 350;
                productSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }

        // Kéo chuột để cuộn (Mouse Drag to Scroll)
        let isDown = false;
        let startX;
        let scrollLeft;

        productSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            productSlider.classList.add('is-dragging');
            startX = e.pageX - productSlider.offsetLeft;
            scrollLeft = productSlider.scrollLeft;
        });

        productSlider.addEventListener('mouseleave', () => {
            isDown = false;
            productSlider.classList.remove('is-dragging');
        });

        productSlider.addEventListener('mouseup', () => {
            isDown = false;
            productSlider.classList.remove('is-dragging');
        });

        productSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - productSlider.offsetLeft;
            const walk = (x - startX) * 1.5; // Tốc độ trượt
            productSlider.scrollLeft = scrollLeft - walk;
        });

        // Cập nhật chỉ số Dots khi cuộn
        productSlider.addEventListener('scroll', () => {
            const cards = productSlider.querySelectorAll('.product-card');
            if (!cards.length) return;
            const cardWidth = cards[0].offsetWidth + 24;
            const activeIndex = Math.min(
                Math.round(productSlider.scrollLeft / cardWidth),
                cards.length - 1
            );

            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
    }

    // 5. Tab Chuyển Đổi Phong Cách (Outfit Switcher)
    const styleTabBtns = document.querySelectorAll('.style-tab-btn');
    const styleContents = document.querySelectorAll('.style-content');

    styleTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            
            styleTabBtns.forEach(b => {
                b.classList.remove('active');
                b.classList.add('text-gray-600');
            });
            btn.classList.add('active');
            btn.classList.remove('text-gray-600');

            styleContents.forEach(content => {
                content.classList.add('hidden');
            });
            const targetContent = document.getElementById(`tab-${target}`);
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }

            if (window.lucide) {
                lucide.createIcons();
            }
        });
    });

    // 6. Công Cụ Tính Toán Size Chuẩn Xác (AI Size Finder)
    const calcHeight = document.getElementById('calcHeight');
    const calcWeight = document.getElementById('calcWeight');
    const calcResult = document.getElementById('calcResult');

    function calculateSize() {
        const height = parseFloat(calcHeight?.value) || 160;
        const weight = parseFloat(calcWeight?.value) || 50;

        let size = 'Size M';
        let advice = 'Vừa vặn, thoải mái cử động';

        if (weight < 46) {
            size = 'Size S';
            advice = 'Tôn dáng thon thả, ôm nhẹ vừa người';
        } else if (weight <= 53) {
            if (height >= 165) {
                size = 'Size S/M';
                advice = 'Dáng cao ráo, mặc thanh thoát';
            } else {
                size = 'Size M';
                advice = 'Vừa vặn chuẩn tỉ lệ, giấu bụng tối đa';
            }
        } else if (weight <= 60) {
            size = 'Size L';
            advice = 'Thoải mái đứng ngồi, che khuyết điểm hoàn hảo';
        } else {
            size = 'Size XL';
            advice = 'Rộng rãi dễ chịu, hack dáng thon gọn';
        }

        if (calcResult) {
            calcResult.innerHTML = `<strong>${size}</strong> (${advice})`;
        }
    }

    if (calcHeight && calcWeight) {
        calcHeight.addEventListener('input', calculateSize);
        calcWeight.addEventListener('input', calculateSize);
    }

    // 7. Accordion FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            faqItems.forEach(i => i.classList.remove('open'));
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // 8. Cập nhật Order Summary khi đổi trong Dropdown Form
    const comboSelect = document.getElementById('custCombo');
    if (comboSelect) {
        comboSelect.addEventListener('change', updateOrderSummary);
    }

    // 9. Sticky Mobile Bar
    const mobileStickyBar = document.getElementById('mobileStickyBar');
    const heroSection = document.getElementById('hero');
    const orderForm = document.getElementById('orderForm');

    window.addEventListener('scroll', () => {
        if (!mobileStickyBar || !heroSection) return;
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        const formTop = orderForm ? orderForm.getBoundingClientRect().top : 9999;
        
        if (heroBottom < 0 && formTop > window.innerHeight) {
            mobileStickyBar.style.transform = 'translateY(0)';
        } else {
            mobileStickyBar.style.transform = 'translateY(100%)';
        }
    });

    // 10. Fake Social Proof Live Toast
    const toast = document.getElementById('livePurchaseToast');
    const toastCustomer = document.getElementById('toastCustomer');
    const toastProduct = document.getElementById('toastProduct');
    const toastTime = document.getElementById('toastTime');

    const fakeOrders = [
        { name: "Chị Hoàng Yến (Hà Nội)", product: "Vừa đặt thành công One Clothes 3", time: "Cách đây 2 phút" },
        { name: "Chị Thảo My (Q.1, TP.HCM)", product: "Vừa chọn Combo 2 Thiết Kế", time: "Cách đây 5 phút" },
        { name: "Chị Lan Hương (Đà Nẵng)", product: "Vừa nhận ưu đãi One Clothes 1 (299k)", time: "Cách đây 8 phút" },
        { name: "Chị Ngọc Bích (Hải Phòng)", product: "Vừa đặt Đầm Lụa One Clothes 4", time: "Cách đây 11 phút" },
        { name: "Chị Thu Trang (Cần Thơ)", product: "Vừa chọn One Clothes 2 (Hồng Pastel)", time: "Cách đây 14 phút" }
    ];

    let orderIndex = 0;
    function showLiveToast() {
        if (!toast) return;
        const current = fakeOrders[orderIndex];
        if (toastCustomer) toastCustomer.textContent = current.name;
        if (toastProduct) toastProduct.textContent = current.product;
        if (toastTime) toastTime.textContent = current.time;

        toast.classList.remove('translate-y-24', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');

        setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-24', 'opacity-0');
        }, 4500);

        orderIndex = (orderIndex + 1) % fakeOrders.length;
    }

    setTimeout(showLiveToast, 3000);
    setInterval(showLiveToast, 12000);

    // Khởi tạo tóm tắt đơn hàng ban đầu
    updateOrderSummary();
});

// Chuyển nhanh tới slide theo index
function scrollToSlide(index) {
    const productSlider = document.getElementById('productSlider');
    if (!productSlider) return;
    const cards = productSlider.querySelectorAll('.product-card');
    if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
}

// Chuyển đổi ảnh trên từng thẻ sản phẩm
function switchProductImage(imgId, newSrc) {
    const imgEl = document.getElementById(imgId);
    if (!imgEl) return;
    imgEl.style.opacity = '0.3';
    setTimeout(() => {
        imgEl.src = newSrc;
        imgEl.style.opacity = '1';
    }, 150);
}

// Chọn sản phẩm và cuộn tới form
function selectProduct(productKey) {
    const comboSelect = document.getElementById('custCombo');
    if (comboSelect) {
        comboSelect.value = productKey;
        updateOrderSummary();
    }
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.scrollIntoView({ behavior: 'smooth' });
        // Nhấp nháy nhẹ form để người dùng nhận biết
        orderForm.classList.add('ring-2', 'ring-brand-gold');
        setTimeout(() => {
            orderForm.classList.remove('ring-2', 'ring-brand-gold');
        }, 1500);
    }
}

// Cập nhật tóm tắt đơn hàng động
function updateOrderSummary() {
    const comboSelect = document.getElementById('custCombo');
    const summaryPackage = document.getElementById('summaryPackage');
    const summaryTotal = document.getElementById('summaryTotal');
    const summaryShipping = document.getElementById('summaryShipping');
    const summaryThumb = document.getElementById('summaryThumb');

    if (!comboSelect) return;
    const val = comboSelect.value;
    const item = productCatalog[val] || productCatalog['one3'];

    if (summaryPackage) summaryPackage.textContent = item.name;
    if (summaryTotal) summaryTotal.textContent = item.total;
    if (summaryShipping) summaryShipping.textContent = item.shipping;
    if (summaryThumb && item.thumb) summaryThumb.src = item.thumb;
}

// Xử lý nộp đơn hàng
function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('custName')?.value || 'Quý Khách';
    const phone = document.getElementById('custPhone')?.value || '';
    const comboVal = document.getElementById('custCombo')?.value || 'one3';
    const item = productCatalog[comboVal] || productCatalog['one3'];

    // Tạo mã đơn hàng ngẫu nhiên
    const randomOrderId = '#OC-' + Math.floor(10000 + Math.random() * 90000);

    // Đổ dữ liệu vào Modal
    document.getElementById('modalCustName').textContent = name;
    document.getElementById('modalOrderId').textContent = randomOrderId;
    document.getElementById('modalPackage').textContent = item.name;
    document.getElementById('modalCustPhone').textContent = phone;
    document.getElementById('modalTotal').textContent = item.total;

    // Hiển thị modal
    const modal = document.getElementById('orderSuccessModal');
    if (modal) {
        modal.classList.remove('hidden');
    }

    if (window.lucide) {
        lucide.createIcons();
    }
}

// Đóng modal
function closeModal() {
    const modal = document.getElementById('orderSuccessModal');
    if (modal) {
        modal.classList.add('hidden');
    }
    const form = document.getElementById('checkoutForm');
    if (form) form.reset();
    updateOrderSummary();
}
