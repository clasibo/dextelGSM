document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("testimonialsContainer");
  let currentIndex = 0;
  let testimonials = [];

  // Function to render a single testimonial card
  function renderTestimonial(index) {
    const card = document.createElement("div");
    card.className = "testimonials_card";
    card.innerHTML = `
            <h3>${testimonials[index].name}</h3>
            <p>${testimonials[index].text}</p>
        `;
    return card;
  }

  // Fetch testimonials from JSON file
  fetch("./assets/js/testimonials.json")
    .then((response) => response.json())
    .then((data) => {
      testimonials = data;
      // Render initial testimonial cards
      testimonials.forEach((_, index) => {
        const card = renderTestimonial(index);
        container.appendChild(card);
      });
      updateTestimonials();
    })
    .catch((error) => console.error("Error fetching testimonials:", error));

  const updateTestimonials = () => {
    const width = window.innerWidth;
    const cardWidth = container.querySelector(".testimonials_card").clientWidth;
    const cardsToShow = width > 768 ? 3 : 1;
    container.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    const cards = document.querySelectorAll(".testimonials_card");
    cards.forEach((card) => (card.style.display = "none"));

    for (let i = 0; i < cardsToShow; i++) {
      const idx = (currentIndex + i) % testimonials.length;
      cards[idx].style.display = "flex";
    }
  };

  document.getElementById("leftArrow").addEventListener("click", () => {
    currentIndex =
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    updateTestimonials();
  });

  document.getElementById("rightArrow").addEventListener("click", () => {
    currentIndex =
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    updateTestimonials();
  });

  window.addEventListener("resize", updateTestimonials);

  // Initial rendering
  updateTestimonials();
});
