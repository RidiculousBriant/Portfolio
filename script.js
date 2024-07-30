document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('scroll', function() {
    const scroll = window.scrollY;
    const progressBar = document.querySelector('.blog-red-time-bar-indicator');
    const maxHeight = document.body.scrollHeight - window.innerHeight;
    progressBar.value = (scroll / maxHeight) * 100;
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.classList.contains("home-link")) {
      location.reload();
      return;
    }
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    const navbarHeight = document.getElementById("navbar").offsetHeight;
    const targetPosition =
      targetElement.offsetTop -
      (window.innerHeight / 10 - targetElement.offsetHeight / 2);
    window.scrollTo({
      top: targetPosition - navbarHeight,
      behavior: "smooth",
    });
  });
});
