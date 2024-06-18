function toggleMenu() {
    var navList = document.getElementById('nav-list');
    if (navList.classList.contains('open')) {
        navList.classList.remove('open');
    } else {
        navList.classList.add('open');
    }
}


document.addEventListener('DOMContentLoaded', function() {

    const skills = [
        { name: 'HTML', level: '90%' },
        { name: 'CSS', level: '85%' },
        { name: 'JavaScript', level: '75%' }
    ];

    // Create skill bars and set initial styles
    skills.forEach(skill => {
        const skillElement = document.querySelector(`.skill[data-skill="${skill.name}"]`);
        if (skillElement) {
            const skillBar = document.createElement('div');
            skillBar.className = 'skill-bar';
            skillBar.style.setProperty('--skill-level', skill.level);
            skillElement.appendChild(skillBar);
        }
    });

    // Skill bar animation function
    const animateSkillBars = () => {
        document.querySelectorAll('.skill-bar').forEach(bar => {
            bar.classList.remove('animate');
            // Trigger reflow to restart animation
            void bar.offsetWidth;
            bar.classList.add('animate');
        });
    };

    // Animate skill bars on page load
    animateSkillBars();

    // Dark Mode Toggle
    const darkModeButton = document.getElementById('dark-mode-toggle-button');
    if (darkModeButton) {
        darkModeButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            document.querySelectorAll('nav ul li a').forEach(anchor => {
                anchor.classList.toggle('dark-mode');
            });
            document.querySelector('.about').classList.toggle('dark-mode');
            // Animate skill bars on dark mode toggle
            animateSkillBars();
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    });

    // Observe elements with the class 'skill' for animation
    document.querySelectorAll('.skill').forEach(skill => {
        observer.observe(skill);
    });
});
