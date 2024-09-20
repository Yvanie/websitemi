
$(document).ready(function() {
    $('.burger').click(function() {
        $('.nav-links').toggleClass('nav-active');
        $(this).toggleClass('toggle');
    });
});

//active navlink
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('nav').offsetHeight; // Height of the fixed navbar

    // Add click event listeners to nav links for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior

            const targetId = link.getAttribute('href').substring(1); // Get the target section id
            const targetSection = document.getElementById(targetId); // Get the target section element

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - navHeight, // Adjust for navbar height
                    behavior: 'smooth' // Smooth scrolling
                });
            }
        });
    });

    // Update active link based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight; // Adjust for navbar height
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});
// For the typing and wiping effect, we need to add some JavaScript to handle the timing and looping
const texts = ["Welcome to My Website", "We offer great services", "Contact us for more info"];
let textIndex = 0;
let charIndex = 0;
const typingSpeed = 100; // Speed of typing in milliseconds
const pauseBeforeSelect = 1000; // Pause before selecting text
const pauseBeforeWiping = 1000; // Pause before wiping text
const wipeSpeed = 50; // Speed of wiping in milliseconds

const typingTextElement = document.getElementById('typing-text');

function typeText() {
    if (charIndex < texts[textIndex].length) {
        typingTextElement.textContent += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
    } else {
        setTimeout(selectText, pauseBeforeSelect);
    }
}

function selectText() {
    typingTextElement.innerHTML = texts[textIndex]
        .split('')
        .map(char => `<span class="selected-text">${char}</span>`)
        .join('');
    setTimeout(wipeText, pauseBeforeWiping);
}

function wipeText() {
    const spans = typingTextElement.querySelectorAll('span');
    let index = 0; // Start from the beginning of the spans

    function wipe() {
        if (index < spans.length) {
            spans[index].style.color = '#333'; // Change text color to simulate wiping
            index++;
            setTimeout(wipe, wipeSpeed);
        } else {
            textIndex = (textIndex + 1) % texts.length; // Loop through texts
            charIndex = 0; // Reset charIndex for new text
            typingTextElement.textContent = ''; // Clear the text content
            setTimeout(typeText, typingSpeed); // Start typing new text
        }
    }

    wipe();
}

// Start typing effect when the page loads
window.onload = () => {
    typeText();
};

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter-item');

    // Function to animate the counter
    const updateCounter = (element, target) => {
        const increment = target / 200; // Increment per interval
        let count = 0;

        const interval = setInterval(() => {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(interval);
            }
            element.textContent = Math.floor(count).toLocaleString(); // Update counter
        }, 10); // Adjust the interval time for speed
    };

    // Function to check if an element is in the viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth
        );
    };

    // Function to handle scroll and start counter animation
    const handleScroll = () => {
        counters.forEach(counter => {
            if (isInViewport(counter) && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                const numberElement = counter.querySelector('.counter-number');
                const target = +counter.querySelector('.counter-number').getAttribute('data-target');
                updateCounter(numberElement, target);
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
});

document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % totalSlides;
        showSlide(slideIndex);
    }

    function prevSlide() {
        slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
        showSlide(slideIndex);
    }

    document.querySelector('.next-slide').addEventListener('click', nextSlide);
    document.querySelector('.prev-slide').addEventListener('click', prevSlide);

    showSlide(slideIndex); // Show the first slide

    setInterval(nextSlide, 5000); // Automatically switch slides every 5 seconds
});