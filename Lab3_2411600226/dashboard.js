document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard loaded!');

    // ========================================
    // SESSION CHECK
    // ========================================
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'index.html';
        return;
    }

    // ========================================
    // USER DISPLAY
    // ========================================
    const userName = localStorage.getItem('userName') || loggedInUser;
    document.getElementById('displayName').textContent = userName;

    // ========================================
    // GREETING BASED ON TIME
    // ========================================
    function getGreeting() {
        const hour = new Date().getHours();
        let greeting = 'Good Evening';
        if (hour < 12) greeting = 'Good Morning';
        else if (hour < 17) greeting = 'Good Afternoon';
        document.getElementById('greetingMessage').textContent = `${greeting}, ${userName}! 👋`;
    }
    getGreeting();

    // ========================================
    // CURRENT DATE
    // ========================================
    const now = new Date();
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    // ========================================
    // STATISTICS
    // ========================================
    function updateStatistics() {
        const stats = [
            { id: 'stat1-value', value: '8,452' },
            { id: 'stat2-value', value: '2,340' },
            { id: 'stat3-value', value: '8' },
            { id: 'stat4-value', value: '72' }
        ];

        stats.forEach(stat => {
            const element = document.getElementById(stat.id);
            if (element) {
                element.textContent = stat.value;
            }
        });
    }
    updateStatistics();

    // ========================================
    // ACTIVITY TABLE
    // ========================================
    function populateActivityTable() {
        const workouts = [
            { date: '2026-08-25', workout: 'Morning Run', duration: '30 min', calories: '320', status: 'Completed' },
            { date: '2026-08-24', workout: 'Upper Body Strength', duration: '45 min', calories: '280', status: 'Completed' },
            { date: '2026-08-23', workout: 'Yoga Session', duration: '20 min', calories: '150', status: 'In Progress' },
            { date: '2026-08-22', workout: 'HIIT Cardio', duration: '25 min', calories: '350', status: 'Completed' },
            { date: '2026-08-21', workout: 'Recovery Walk', duration: '40 min', calories: '180', status: 'Pending' }
        ];

        const tbody = document.getElementById('activityBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        workouts.forEach(workout => {
            const row = document.createElement('tr');

            let badgeClass = 'badge-success';
            let badgeText = 'Completed';
            if (workout.status === 'In Progress') {
                badgeClass = 'badge-warning';
                badgeText = 'In Progress';
            } else if (workout.status === 'Pending') {
                badgeClass = 'badge-danger';
                badgeText = 'Pending';
            }

            row.innerHTML = `
                <td>${workout.date}</td>
                <td><i class="fas fa-running me-2 text-primary"></i>${workout.workout}</td>
                <td>${workout.duration}</td>
                <td>${workout.calories} kcal</td>
                <td><span class="badge ${badgeClass}">${badgeText}</span></td>
            `;

            tbody.appendChild(row);
        });
    }
    populateActivityTable();

    // ========================================
    // LOGOUT
    // ========================================
    document.getElementById('logoutBtn').addEventListener('click', function() {
        console.log('Logging out...');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('userName');
        window.location.href = 'index.html';
    });
});