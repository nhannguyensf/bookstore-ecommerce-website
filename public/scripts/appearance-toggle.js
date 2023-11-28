    const body = document.body;

    function toggleDarkMode() {
      body.classList.toggle('dark-mode');
      const isDarkMode = body.classList.contains('dark-mode');
      localStorage.setItem('dark-mode', isDarkMode);
    }

    // Check for user preference in localStorage
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';

    if (isDarkMode) {
      body.classList.add('dark-mode');
    }
