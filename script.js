//---Dropdown Script---
document.addEventListener("DOMContentLoaded", () => {
    const dropdownWrappers = document.querySelectorAll('.nav-item-dropdown');
    const backdrop = document.querySelector('.nav-backdrop');

    dropdownWrappers.forEach(wrapper => {
        const link = wrapper.querySelector('.nav-dropdown');
        const menu = wrapper.querySelector('.dropdown-menu') || wrapper.querySelector('.dropdown-menu1');
        let timeout;

        wrapper.addEventListener('mouseenter', () => {

            dropdownWrappers.forEach(otherWrapper => {
                if (otherWrapper !== wrapper) { // Only target the ones we are NOT currently hovering over
                    const otherLink = otherWrapper.querySelector('.nav-dropdown');
                    const otherMenu = otherWrapper.querySelector('.dropdown-menu') || otherWrapper.querySelector('.dropdown-menu1');
                    
                    // Cancel any pending close animations for the other menus
                    clearTimeout(otherWrapper.leaveTimeout); 
                    
                    // Instantly hide them
                    if (otherMenu) otherMenu.classList.remove('show');
                    if (otherLink) otherLink.classList.remove('active');
                }
            });

            clearTimeout(timeout);
            menu.classList.add('show');
            link.classList.add('active');
            if (backdrop) {
                backdrop.classList.add('show');
            }
        });

        wrapper.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                menu.classList.remove('show');
                link.classList.remove('active');
                
                // Check if any dropdown is still active
                const anyActive = Array.from(dropdownWrappers).some(w => {
                    const m = w.querySelector('.dropdown-menu') || w.querySelector('.dropdown-menu1');
                    return m.classList.contains('show');
                });
                
                if (!anyActive && backdrop) {
                    backdrop.classList.remove('show');
                }
            }, 150);
        });
    });
});