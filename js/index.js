<script>
  document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.icon');

    icons.forEach((icon, index) => {
      setTimeout(() => {
        icon.classList.add('show');
      }, index * 200); // 0.2秒ずつ遅らせて表示
    });
  });
</script>
