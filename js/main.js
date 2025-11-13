// ========================================
// DA REAL GREEN HOUSE - MAIN JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function() {

  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');

      // Animate hamburger icon
      const spans = mobileMenuToggle.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!mobileMenuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
        mobileMenu.classList.remove('active');
      }
    });

    // Close mobile menu when clicking a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
      });
    });
  }

  // ========================================
  // FILTER CHIPS (Shop Page)
  // ========================================
  const filterChips = document.querySelectorAll('.filter-chip');
  const productCards = document.querySelectorAll('.product-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');

      // Update active state
      filterChips.forEach(c => c.classList.remove('active'));
      this.classList.add('active');

      // Filter products
      productCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          // Add fade in animation
          card.style.animation = 'fadeIn 0.4s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ========================================
  // PRODUCT DETAIL - SIZE SELECTOR
  // ========================================
  const sizeOptions = document.querySelectorAll('.size-option');

  sizeOptions.forEach(option => {
    option.addEventListener('click', function() {
      sizeOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');

      // Update price display (visual only)
      const price = this.querySelector('.size-price').textContent;
      const priceDisplay = document.querySelector('.product-price');
      if (priceDisplay) {
        priceDisplay.textContent = price;
      }
    });
  });

  // ========================================
  // PRODUCT DETAIL - QUANTITY SELECTOR
  // ========================================
  const decreaseQtyBtn = document.getElementById('decreaseQty');
  const increaseQtyBtn = document.getElementById('increaseQty');
  const qtyInput = document.querySelector('.quantity-input');

  if (decreaseQtyBtn && increaseQtyBtn && qtyInput) {
    decreaseQtyBtn.addEventListener('click', function() {
      let currentValue = parseInt(qtyInput.value);
      if (currentValue > 1) {
        qtyInput.value = currentValue - 1;
      }
    });

    increaseQtyBtn.addEventListener('click', function() {
      let currentValue = parseInt(qtyInput.value);
      if (currentValue < 10) {
        qtyInput.value = currentValue + 1;
      }
    });

    qtyInput.addEventListener('input', function() {
      let value = parseInt(this.value);
      if (isNaN(value) || value < 1) {
        this.value = 1;
      } else if (value > 10) {
        this.value = 10;
      }
    });
  }

  // ========================================
  // PRODUCT DETAIL - GALLERY THUMBNAILS
  // ========================================
  const thumbnails = document.querySelectorAll('.thumbnail');
  const galleryMain = document.querySelector('.gallery-main');

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function() {
      thumbnails.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      // In a real implementation, this would swap the main image
      // For now, just visual feedback
    });
  });

  // ========================================
  // MEMBERSHIP - MODAL
  // ========================================
  const signUpBtn = document.getElementById('signUpBtn');
  const signupModal = document.getElementById('signupModal');
  const modalClose = document.getElementById('modalClose');
  const modalOk = document.getElementById('modalOk');
  const modalOverlay = signupModal?.querySelector('.modal-overlay');

  if (signUpBtn && signupModal) {
    signUpBtn.addEventListener('click', function() {
      signupModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    function closeModal() {
      signupModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    if (modalOk) {
      modalOk.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', closeModal);
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && signupModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // ========================================
  // FAQ ACCORDION
  // ========================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(i => i.classList.remove('active'));

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ========================================
  // CONTACT FORM
  // ========================================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Visual feedback only (no actual submission)
      const submitBtn = this.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');

      // Show loading state
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';
      submitBtn.disabled = true;

      // Simulate sending
      setTimeout(() => {
        btnText.textContent = 'Message Sent!';
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.style.backgroundColor = 'var(--color-success)';

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
          btnText.textContent = 'Send Message';
          submitBtn.style.backgroundColor = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      const targetId = this.getAttribute('href');

      if (targetId !== '#' && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          event.preventDefault();

          const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ========================================
  // ADD TO CART BUTTON (Visual Only)
  // ========================================
  const addToCartButtons = document.querySelectorAll('.btn-primary');

  addToCartButtons.forEach(button => {
    if (button.textContent.includes('Add to Cart')) {
      button.addEventListener('click', function(event) {
        event.preventDefault();

        const originalText = this.textContent;
        this.textContent = 'Added!';
        this.style.backgroundColor = 'var(--color-success)';

        setTimeout(() => {
          this.textContent = originalText;
          this.style.backgroundColor = '';
        }, 2000);
      });
    }
  });

  // ========================================
  // NAVBAR SCROLL EFFECT
  // ========================================
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 10) {
      navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = '';
    }

    lastScroll = currentScroll;
  });

  // ========================================
  // FADE IN ANIMATION ON SCROLL
  // ========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements that should fade in
  const fadeElements = document.querySelectorAll('.card, .section-header, .hero-content');
  fadeElements.forEach(element => {
    observer.observe(element);
  });

  // ========================================
  // CONSOLE MESSAGE
  // ========================================
  console.log('%cDa Real Green House', 'font-size: 24px; font-weight: bold; color: #7c3aed;');
  console.log('%cPremium THCA Flower | 100% Legal | 100% Transparent', 'font-size: 14px; color: #c9cbd3;');
  console.log('%cBuilt with ❤️ for the REAL ONES', 'font-size: 12px; color: #9aa0ab; font-style: italic;');

});
